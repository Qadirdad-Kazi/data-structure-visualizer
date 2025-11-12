import { ArrowDown } from 'lucide-react';

interface StackVisualizerProps {
  data: (number | string)[];
  highlightIndices?: number[];
}

export default function StackVisualizer({
  data,
  highlightIndices = [],
}: StackVisualizerProps) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-500">
        Stack is empty
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-64 p-8">
      <div className="flex flex-col-reverse gap-2">
        {data.map((value, index) => (
          <div key={index}>
            <div className="flex items-center gap-4">
              {index === data.length - 1 && (
                <div className="flex items-center gap-2 text-sm font-medium text-orange-600">
                  <ArrowDown className="w-4 h-4" />
                  <span>TOP</span>
                </div>
              )}
              <div
                className={`w-48 h-16 flex items-center justify-center rounded-lg text-lg font-bold border-2 transition-all duration-300 ${
                  highlightIndices.includes(index)
                    ? 'bg-orange-500 text-white border-orange-600 scale-105 shadow-lg'
                    : 'bg-white text-slate-800 border-slate-300'
                }`}
              >
                {value}
              </div>
            </div>
          </div>
        ))}
        <div className="w-48 h-2 bg-slate-400 rounded-b-lg" />
      </div>
    </div>
  );
}
