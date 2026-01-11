import React, { useState } from 'react';
import { Column as ColumnType, KanbanBoardProps } from '../types';
import Column from './Column.tsx';
import { addCard, removeCard, updateCard, moveCard } from '../utils/kanbanUtils.ts';
import '../styles/KanbanBoard.css';

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  initialData = [],
  onCardAdd,
  onCardDelete,
  onCardEdit,
  onCardMove
}) => {
  const [columns, setColumns] = useState<ColumnType[]>(initialData);
  const [draggedCardId, setDraggedCardId] = useState<string | null>(null);

  const handleCardAdd = (columnId: string, cardTitle: string) => {
    const newCard = {
      id: `card-${Date.now()}-${Math.random()}`,
      title: cardTitle,
      columnId
    };
    setColumns(prev => addCard(prev, columnId, newCard));
    onCardAdd?.(columnId, cardTitle);
  };

  const handleCardEdit = (cardId: string, newTitle: string) => {
    setColumns(prev => updateCard(prev, cardId, { title: newTitle }));
    onCardEdit?.(cardId, newTitle);
  };

  const handleCardDelete = (cardId: string) => {
    setColumns(prev => removeCard(prev, cardId));
    onCardDelete?.(cardId);
  };

  const handleCardDragStart = (e: React.DragEvent, cardId: string) => {
    setDraggedCardId(cardId);
    e.dataTransfer.setData('text/plain', cardId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleCardDrop = (e: React.DragEvent, toColumnId: string) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('text/plain');
    
    if (!cardId || !draggedCardId) return;

    const fromColumn = columns.find(col => 
      col.cards.some(card => card.id === cardId)
    );
    
    if (!fromColumn || fromColumn.id === toColumnId) {
      setDraggedCardId(null);
      return;
    }

    const newIndex = columns.find(col => col.id === toColumnId)?.cards.length || 0;
    
    setColumns(prev => moveCard(prev, cardId, toColumnId, newIndex));
    onCardMove?.(cardId, fromColumn.id, toColumnId, newIndex);
    setDraggedCardId(null);
  };

  return (
    <div className="kanban-board">
      <div className="board-header">
        <h1>Kanban Board</h1>
      </div>
      
      <div className="board-columns">
        {columns.map(column => (
          <Column
            key={column.id}
            column={column}
            onCardAdd={handleCardAdd}
            onCardEdit={handleCardEdit}
            onCardDelete={handleCardDelete}
            onCardDrop={handleCardDrop}
            onCardDragStart={handleCardDragStart}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;