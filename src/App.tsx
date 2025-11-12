import { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { DataStructureType } from './types';
import Dashboard from './components/Dashboard';
import Visualizer from './components/Visualizer';
import Quiz from './components/Quiz';

function App() {
  const [selectedDS, setSelectedDS] = useState<DataStructureType | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  if (showQuiz && selectedDS) {
    return (
      <Quiz
        dataStructure={selectedDS}
        onClose={() => setShowQuiz(false)}
      />
    );
  }

  if (selectedDS) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowQuiz(true)}
          className="fixed top-4 right-4 z-40 px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-lg font-medium transition-colors flex items-center gap-2 shadow-lg"
        >
          <BookOpen className="w-4 h-4" />
          Take Quiz
        </button>
        <Visualizer
          type={selectedDS}
          onBack={() => setSelectedDS(null)}
        />
      </div>
    );
  }

  return <Dashboard onSelectDataStructure={setSelectedDS} />;
}

export default App;
