import React from 'react';
import KanbanBoard from './components/KanbanBoard.tsx';
import { initialKanbanData } from './services/mockDataService.ts';

const App: React.FC = () => {
  return (
    <div>
      <KanbanBoard
        initialData={initialKanbanData}
        onCardAdd={(columnId, title) => console.log('Added card:', title, 'to', columnId)}
        onCardDelete={(cardId) => console.log('Deleted card:', cardId)}
        onCardEdit={(cardId, title) => console.log('Edited card:', cardId, 'to', title)}
        onCardMove={(cardId, from, to, index) => 
          console.log('Moved card:', cardId, 'from', from, 'to', to, 'at index', index)
        }
      />
    </div>
  );
};

export default App;