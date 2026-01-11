import React, { useState } from 'react';
import { Card as CardType } from '../types';

interface CardProps {
  card: CardType;
  onEdit: (cardId: string, newTitle: string) => void;
  onDelete: (cardId: string) => void;
  onDragStart: (e: React.DragEvent, cardId: string) => void;
}

const Card: React.FC<CardProps> = ({ card, onEdit, onDelete, onDragStart }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(card.title);

  const handleEdit = () => {
    if (editValue.trim()) {
      onEdit(card.id, editValue.trim());
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm(`Delete card "${card.title}"?`)) {
      onDelete(card.id);
    }
  };

  return (
    <div 
      className="kanban-card"
      draggable
      onDragStart={(e) => onDragStart(e, card.id)}
    >
      {isEditing ? (
        <input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleEdit();
            if (e.key === 'Escape') setIsEditing(false);
          }}
          autoFocus
          className="card-edit-input"
        />
      ) : (
        <div className="card-content">
          <span 
            className="card-title"
            onDoubleClick={() => setIsEditing(true)}
          >
            {card.title}
          </span>
          <button 
            className="card-delete-btn"
            onClick={handleDelete}
            title="Delete card"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;