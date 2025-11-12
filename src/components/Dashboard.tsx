import { Database, List, Layers, FileStack, Binary, Network } from 'lucide-react';
import { DataStructureType } from '../types';

interface DashboardProps {
  onSelectDataStructure: (type: DataStructureType) => void;
}

const dataStructures = [
  {
    type: 'array' as DataStructureType,
    name: 'Array',
    description: 'Contiguous memory storage with O(1) access',
    icon: Database,
    color: 'bg-blue-500',
  },
  {
    type: 'linked-list' as DataStructureType,
    name: 'Linked List',
    description: 'Sequential nodes connected by pointers',
    icon: List,
    color: 'bg-green-500',
  },
  {
    type: 'stack' as DataStructureType,
    name: 'Stack',
    description: 'LIFO - Last In First Out structure',
    icon: Layers,
    color: 'bg-orange-500',
  },
  {
    type: 'queue' as DataStructureType,
    name: 'Queue',
    description: 'FIFO - First In First Out structure',
    icon: FileStack,
    color: 'bg-red-500',
  },
  {
    type: 'binary-tree' as DataStructureType,
    name: 'Binary Tree',
    description: 'Hierarchical structure with left and right children',
    icon: Binary,
    color: 'bg-teal-500',
  },
  {
    type: 'bst' as DataStructureType,
    name: 'Binary Search Tree',
    description: 'Ordered binary tree for efficient searching',
    icon: Binary,
    color: 'bg-cyan-500',
  },
  {
    type: 'graph' as DataStructureType,
    name: 'Graph',
    description: 'Network of nodes connected by edges',
    icon: Network,
    color: 'bg-slate-500',
  },
];

export default function Dashboard({ onSelectDataStructure }: DashboardProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-800 mb-4">
            Data Structure Visualizer
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Interactive learning tool to understand data structures through
            step-by-step animations and real-time complexity analysis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {dataStructures.map((ds) => {
            const Icon = ds.icon;
            return (
              <button
                key={ds.type}
                onClick={() => onSelectDataStructure(ds.type)}
                className="group relative bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 p-8 text-left overflow-hidden transform hover:-translate-y-1"
              >
                <div
                  className={`absolute top-0 right-0 w-32 h-32 ${ds.color} opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500`}
                />

                <div className="relative">
                  <div
                    className={`${ds.color} w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-800 mb-2">
                    {ds.name}
                  </h3>

                  <p className="text-slate-600 leading-relaxed">
                    {ds.description}
                  </p>

                  <div className="mt-6 flex items-center text-sm font-medium text-slate-700 group-hover:text-slate-900">
                    <span>Start Learning</span>
                    <svg
                      className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">
              Learning Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-slate-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">
                  Step-by-Step
                </h3>
                <p className="text-sm text-slate-600">
                  Control animation speed and navigate through each operation
                </p>
              </div>
              <div className="text-center">
                <div className="bg-slate-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">
                  Complexity Analysis
                </h3>
                <p className="text-sm text-slate-600">
                  Real-time Big O notation for every operation
                </p>
              </div>
              <div className="text-center">
                <div className="bg-slate-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">💡</span>
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">
                  Interactive Quiz
                </h3>
                <p className="text-sm text-slate-600">
                  Test your knowledge with interactive questions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
