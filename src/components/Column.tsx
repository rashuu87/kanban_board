import React, { useState } from 'react';
import { Column as ColumnType } from '../types';
import Card from './Card.tsx';

interface ColumnProps {
  column: ColumnType;
  onCardAdd: (columnId: string, cardTitle: string) => void;
  onCardEdit: (cardId: string, newTitle: string) => void;
  onCardDelete: (cardId: string) => void;
  onCardDrop: (e: React.DragEvent, columnId: string) => void;
  onCardDragStart: (e: React.DragEvent, cardId: string) => void;
}

const Column: React.FC<ColumnProps> = ({
  column,
  onCardAdd,
  onCardEdit,
  onCardDelete,
  onCardDrop,
  onCardDragStart
}) => {
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const handleAddCard = () => {
    if (newCardTitle.trim()) {
      onCardAdd(column.id, newCardTitle.trim());
      setNewCardTitle('');
      setShowAddCard(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    onCardDrop(e, column.id);
  };

  return (
    <div className="kanban-column">
      <div className="column-header">
        <h3 className="column-title">{column.title}</h3>
        <span className="card-count">{column.cards.length}</span>
      </div>

      <div 
        className={`column-content ${dragOver ? 'drag-over' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {column.cards.map(card => (
          <Card
            key={card.id}
            card={card}
            onEdit={onCardEdit}
            onDelete={onCardDelete}
            onDragStart={onCardDragStart}
          />
        ))}

        {showAddCard ? (
          <div className="add-card-form">
            <textarea
              value={newCardTitle}
              onChange={(e) => setNewCardTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleAddCard();
                }
                if (e.key === 'Escape') setShowAddCard(false);
              }}
              placeholder="Enter card title..."
              autoFocus
              rows={2}
            />
            <div className="add-card-actions">
              <button onClick={handleAddCard}>Add Card</button>
              <button onClick={() => setShowAddCard(false)}>Cancel</button>
            </div>
          </div>
        ) : (
          <button 
            className="add-card-btn"
            onClick={() => setShowAddCard(true)}
          >
            + Add a card
          </button>
        )}
      </div>
    </div>
  );
};

export default Column;