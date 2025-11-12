import { useState } from 'react';
import { BookOpen, LayoutDashboard, BarChart2 } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { DataStructureType } from './types';
import Dashboard from './components/Dashboard';
import Visualizer from './components/Visualizer';
import Quiz from './components/Quiz';
import SortingVisualizer from './algorithms/sorting/SortingVisualizer';

const AppContent = () => {
  const [selectedDS, setSelectedDS] = useState<DataStructureType | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const location = useLocation();

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

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bg-white shadow-sm z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-blue-600">AlgoViz</span>
              </div>
              <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    location.pathname === '/'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Data Structures
                </Link>
                <Link
                  to="/sorting"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    location.pathname.startsWith('/sorting')
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <BarChart2 className="mr-2 h-4 w-4" />
                  Sorting Algorithms
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-16">
        <Routes>
          <Route
            path="/"
            element={<Dashboard onSelectDataStructure={setSelectedDS} />}
          />
          <Route path="/sorting" element={<SortingVisualizer />} />
        </Routes>
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
