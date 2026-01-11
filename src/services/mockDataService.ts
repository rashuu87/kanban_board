import { Column } from '../types';

export const initialKanbanData: Column[] = [
  {
    id: 'todo',
    title: 'Todo',
    cards: [
      { id: '1', title: 'Design new homepage', columnId: 'todo' },
      { id: '2', title: 'Setup project structure', columnId: 'todo' },
      { id: '3', title: 'Write documentation', columnId: 'todo' }
    ]
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    cards: [
      { id: '4', title: 'Implement user authentication', columnId: 'in-progress' },
      { id: '5', title: 'Create API endpoints', columnId: 'in-progress' }
    ]
  },
  {
    id: 'done',
    title: 'Done',
    cards: [
      { id: '6', title: 'Setup development environment', columnId: 'done' },
      { id: '7', title: 'Initial project planning', columnId: 'done' }
    ]
  }
];