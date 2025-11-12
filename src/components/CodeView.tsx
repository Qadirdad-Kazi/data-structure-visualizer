import { Code2, Clock } from 'lucide-react';
import { AnimationStep } from '../types';

interface CodeViewProps {
  currentStep: AnimationStep | null;
}

export default function CodeView({ currentStep }: CodeViewProps) {
  if (!currentStep) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <Code2 className="w-5 h-5 text-slate-600" />
          <h3 className="text-lg font-semibold text-slate-800">Code</h3>
        </div>
        <p className="text-slate-500 text-center py-8">
          Perform an operation to see the code
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Code2 className="w-5 h-5 text-slate-600" />
          <h3 className="text-lg font-semibold text-slate-800">Code</h3>
        </div>
        <div className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-md">
          <Clock className="w-4 h-4 text-slate-600" />
          <span className="text-sm font-mono font-medium text-slate-700">
            {currentStep.complexity}
          </span>
        </div>
      </div>

      <div className="bg-slate-900 rounded-lg p-4 mb-4">
        <code className="text-green-400 font-mono text-sm whitespace-pre-wrap">
          {currentStep.code}
        </code>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <p className="text-slate-700 leading-relaxed">
          {currentStep.description}
        </p>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-200">
        <h4 className="text-sm font-semibold text-slate-700 mb-2">
          Time Complexity
        </h4>
        <p className="text-sm text-slate-600">
          {getComplexityExplanation(currentStep.complexity)}
        </p>
      </div>
    </div>
  );
}

function getComplexityExplanation(complexity: string): string {
  const explanations: Record<string, string> = {
    'O(1)': 'Constant time - Operation takes the same time regardless of input size',
    'O(log n)': 'Logarithmic time - Operation time grows slowly as input size increases',
    'O(n)': 'Linear time - Operation time grows proportionally with input size',
    'O(n log n)': 'Linearithmic time - Common in efficient sorting algorithms',
    'O(n²)': 'Quadratic time - Operation time grows with square of input size',
    'O(log n) avg, O(n) worst': 'Logarithmic average case, linear worst case - depends on tree balance',
    'O(log n) avg': 'Logarithmic on average - efficient for balanced structures',
    'O(V + E)': 'Linear in vertices and edges - visits each vertex and edge once',
  };

  return explanations[complexity] || 'Time complexity of this operation';
}
