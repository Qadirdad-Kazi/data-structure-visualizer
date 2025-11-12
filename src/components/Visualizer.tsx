import { useState, useEffect, useRef } from 'react';
import { Home, Plus, Trash2, Search, GitBranch } from 'lucide-react';
import { DataStructureType, AnimationStep } from '../types';
import { DataStructure } from '../engine/DataStructure';
import { ArrayDS } from '../engine/ArrayDS';
import { LinkedListDS } from '../engine/LinkedListDS';
import { StackDS } from '../engine/StackDS';
import { QueueDS } from '../engine/QueueDS';
import { BinaryTreeDS } from '../engine/BinaryTreeDS';
import { BSTDS } from '../engine/BSTDS';
import { GraphDS } from '../engine/GraphDS';
import ControlPanel from './ControlPanel';
import CodeView from './CodeView';
import ArrayVisualizer from './visualizers/ArrayVisualizer';
import LinkedListVisualizer from './visualizers/LinkedListVisualizer';
import StackVisualizer from './visualizers/StackVisualizer';
import QueueVisualizer from './visualizers/QueueVisualizer';
import TreeVisualizer from './visualizers/TreeVisualizer';
import GraphVisualizer from './visualizers/GraphVisualizer';

interface VisualizerProps {
  type: DataStructureType;
  onBack: () => void;
}

export default function Visualizer({ type, onBack }: VisualizerProps) {
  const [ds, setDs] = useState<DataStructure | null>(null);
  const [currentStep, setCurrentStep] = useState<AnimationStep | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [inputValue, setInputValue] = useState('');
  // graphFrom is not currently used but keeping for future functionality
  const [graphFrom, setGraphFrom] = useState('');
  const [graphTo, setGraphTo] = useState('');
  const playIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    initializeDataStructure();
  }, [type]);

  useEffect(() => {
    if (ds) {
      if (!ds) return;
      const steps = ds.getSteps();
      if (steps.length > 0) {
        setCurrentStep(steps[stepIndex]);
      } else {
        setCurrentStep(null);
      }
    }
  }, [ds, stepIndex]);

  useEffect(() => {
    if (isPlaying && ds) {
      const steps = ds.getSteps();
      if (stepIndex < steps.length - 1) {
        playIntervalRef.current = setTimeout(() => {
          setStepIndex((prev) => prev + 1);
        }, 1000 / speed);
      } else {
        setIsPlaying(false);
      }
    }

    return () => {
      if (playIntervalRef.current) {
        clearTimeout(playIntervalRef.current);
      }
    };
  }, [isPlaying, stepIndex, speed, ds]);

  function initializeDataStructure() {
    let newDs: DataStructure;

    switch (type) {
      case 'array':
        newDs = new ArrayDS([5, 12, 8, 3, 19]);
        break;
      case 'linked-list':
        newDs = new LinkedListDS();
        [10, 20, 30].forEach((v) => newDs.insert(v));
        newDs.clearSteps();
        break;
      case 'stack':
        newDs = new StackDS();
        break;
      case 'queue':
        newDs = new QueueDS();
        break;
      case 'binary-tree':
        newDs = new BinaryTreeDS();
        [50, 30, 70, 20, 40].forEach((v) => newDs.insert(v));
        newDs.clearSteps();
        break;
      case 'bst':
        newDs = new BSTDS();
        [50, 30, 70, 20, 40, 60, 80].forEach((v) => newDs.insert(v));
        newDs.clearSteps();
        break;
      case 'graph':
        newDs = new GraphDS();
        (newDs as GraphDS).addNode('A');
        (newDs as GraphDS).addNode('B');
        (newDs as GraphDS).addNode('C');
        (newDs as GraphDS).addNode('D');
        (newDs as GraphDS).addEdge('A', 'B');
        (newDs as GraphDS).addEdge('A', 'C');
        (newDs as GraphDS).addEdge('B', 'D');
        (newDs as GraphDS).addEdge('C', 'D');
        newDs.clearSteps();
        break;
      default:
        newDs = new ArrayDS();
    }

    setDs(newDs);
    setStepIndex(0);
    setCurrentStep(null);
  }

  function handleInsert() {
    if (!ds || !inputValue.trim()) return;

    if (type === 'graph' && graphTo.trim()) {
      (ds as GraphDS).addEdge(inputValue, graphTo);
      ds.clearSteps();
    } else {
      ds.insert(inputValue);
      setStepIndex(0);
    }

    setInputValue('');
    setGraphFrom('');
    setGraphTo('');
    // Create a new reference to trigger re-render
    setDs(ds);
  }

  function handleDelete() {
    if (!ds || !inputValue.trim()) return;

    ds.delete(inputValue);
    setStepIndex(0);
    setInputValue('');
    // Create a new reference to trigger re-render
    setDs(ds);
  }

  function handleSearch() {
    if (!ds || !inputValue.trim()) return;

    ds.search(inputValue);
    setStepIndex(0);
    setInputValue('');
    // Create a new reference to trigger re-render
    setDs(ds);
  }

  function handleTraversal(traversalType: string) {
    if (!ds) return;

    if (type === 'binary-tree') {
      (ds as BinaryTreeDS).inorderTraversal();
    } else if (type === 'graph') {
      const graphDS = ds as GraphDS;
      if (traversalType === 'bfs') {
        graphDS.bfs(inputValue || 'A');
      } else if (traversalType === 'dfs') {
        graphDS.dfs(inputValue || 'A');
      }
    }

    setStepIndex(0);
    setInputValue('');
    // Create a new reference to trigger re-render
    setDs(ds);
  }

  function handleClear() {
    if (!ds) return;
    ds.clear();
    setStepIndex(0);
    setCurrentStep(null);
    // Create a new reference to trigger re-render
    setDs(ds);
  }

  const steps = ds ? ds.getSteps() : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 rounded-lg bg-white hover:bg-slate-100 shadow-md transition-colors"
            >
              <Home className="w-5 h-5 text-slate-700" />
            </button>
            <h1 className="text-3xl font-bold text-slate-800">
              {type.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} Visualizer
            </h1>
          </div>

          <button
            onClick={handleClear}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">
              Visualization
            </h2>
            {renderVisualizer()}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                Operations
              </h3>

              {type === 'graph' ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="From node"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    value={graphTo}
                    onChange={(e) => setGraphTo(e.target.value)}
                    placeholder="To node (for edge)"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleInsert}
                    className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add {graphTo ? 'Edge' : 'Node'}
                  </button>
                  <button
                    onClick={() => handleTraversal('bfs')}
                    className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
                  >
                    BFS Traversal
                  </button>
                  <button
                    onClick={() => handleTraversal('dfs')}
                    className="w-full px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-medium transition-colors"
                  >
                    DFS Traversal
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleInsert()}
                    placeholder="Enter value"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <button
                    onClick={handleInsert}
                    className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Insert
                  </button>

                  <button
                    onClick={handleDelete}
                    className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>

                  <button
                    onClick={handleSearch}
                    className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <Search className="w-4 h-4" />
                    Search
                  </button>

                  {type === 'binary-tree' && (
                    <button
                      onClick={() => handleTraversal('inorder')}
                      className="w-full px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <GitBranch className="w-4 h-4" />
                      Inorder Traversal
                    </button>
                  )}
                </div>
              )}
            </div>

            <CodeView currentStep={currentStep} />
          </div>
        </div>

        {steps.length > 0 && (
          <ControlPanel
            isPlaying={isPlaying}
            speed={speed}
            currentStep={stepIndex}
            totalSteps={steps.length}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onNext={() => setStepIndex((prev) => Math.min(prev + 1, steps.length - 1))}
            onPrevious={() => setStepIndex((prev) => Math.max(prev - 1, 0))}
            onReset={() => setStepIndex(0)}
            onSpeedChange={setSpeed}
          />
        )}
      </div>
    </div>
  );

  function renderVisualizer() {
    if (!ds) return null;

    const state = ds.getState();

    switch (type) {
      case 'array':
        return (
          <ArrayVisualizer
            data={state.data}
            highlightIndices={currentStep?.highlightIndices}
          />
        );
      case 'linked-list':
        return <LinkedListVisualizer nodes={state.nodes} />;
      case 'stack':
        return (
          <StackVisualizer
            data={state.data}
            highlightIndices={currentStep?.highlightIndices}
          />
        );
      case 'queue':
        return (
          <QueueVisualizer
            data={state.data}
            highlightIndices={currentStep?.highlightIndices}
          />
        );
      case 'binary-tree':
      case 'bst':
        return <TreeVisualizer nodes={state.nodes} />;
      case 'graph':
        return <GraphVisualizer nodes={state.nodes} edges={state.edges} />;
      default:
        return null;
    }
  }
}
