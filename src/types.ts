export interface Card {
  id: string;
  title: string;
  columnId: string;
}

export interface Column {
  id: string;
  title: string;
  cards: Card[];
}

export interface KanbanBoardProps {
  initialData?: Column[];
  onCardAdd?: (columnId: string, cardTitle: string) => void;
  onCardDelete?: (cardId: string) => void;
  onCardEdit?: (cardId: string, newTitle: string) => void;
  onCardMove?: (cardId: string, fromColumnId: string, toColumnId: string, newIndex: number) => void;
}