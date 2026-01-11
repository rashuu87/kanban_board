import { Column, Card } from '../types';

export const findCardById = (columns: Column[], cardId: string): Card | null => {
  for (const column of columns) {
    const card = column.cards.find(card => card.id === cardId);
    if (card) return card;
  }
  return null;
};

export const addCard = (columns: Column[], columnId: string, newCard: Card): Column[] => {
  return columns.map(column => 
    column.id === columnId 
      ? { ...column, cards: [...column.cards, newCard] }
      : column
  );
};

export const removeCard = (columns: Column[], cardId: string): Column[] => {
  return columns.map(column => ({
    ...column,
    cards: column.cards.filter(card => card.id !== cardId)
  }));
};

export const updateCard = (columns: Column[], cardId: string, updates: Partial<Card>): Column[] => {
  return columns.map(column => ({
    ...column,
    cards: column.cards.map(card => 
      card.id === cardId ? { ...card, ...updates } : card
    )
  }));
};

export const moveCard = (
  columns: Column[], 
  cardId: string, 
  toColumnId: string, 
  newIndex: number
): Column[] => {
  const card = findCardById(columns, cardId);
  if (!card) return columns;

  const columnsWithoutCard = removeCard(columns, cardId);
  
  return columnsWithoutCard.map(column => {
    if (column.id === toColumnId) {
      const newCards = [...column.cards];
      const updatedCard = { ...card, columnId: toColumnId };
      newCards.splice(newIndex, 0, updatedCard);
      return { ...column, cards: newCards };
    }
    return column;
  });
};