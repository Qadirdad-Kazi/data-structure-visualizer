import { ArrowRight } from 'lucide-react';

interface QueueVisualizerProps {
  data: (number | string)[];
  highlightIndices?: number[];
}

export default function QueueVisualizer({
  data,
  highlightIndices = [],
}: QueueVisualizerProps) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-500">
        Queue is empty
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-64 p-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          {data.map((value, index) => (
            <div key={index} className="flex items-center gap-3">
              <div
                className={`w-16 h-16 flex items-center justify-center rounded-lg text-lg font-bold border-2 transition-all duration-300 ${
                  highlightIndices.includes(index)
                    ? 'bg-red-500 text-white border-red-600 scale-110 shadow-lg'
                    : 'bg-white text-slate-800 border-slate-300'
                }`}
              >
                {value}
              </div>
              {index < data.length - 1 && (
                <ArrowRight className="w-5 h-5 text-slate-400" />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-between px-2">
          <div className="text-sm font-medium text-green-600">
            ← FRONT (Dequeue)
          </div>
          <div className="text-sm font-medium text-blue-600">
            REAR (Enqueue) →
          </div>
        </div>
      </div>
    </div>
  );
}
