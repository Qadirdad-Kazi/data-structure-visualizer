import { NodeData } from '../../types';
import { ArrowRight } from 'lucide-react';

interface LinkedListVisualizerProps {
  nodes: NodeData[];
}

export default function LinkedListVisualizer({
  nodes,
}: LinkedListVisualizerProps) {
  if (nodes.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-500">
        Linked list is empty
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-64 p-8 overflow-x-auto">
      <div className="flex items-center gap-4">
        {nodes.map((node, index) => (
          <div key={node.id} className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              {index === 0 && (
                <div className="text-xs font-medium text-slate-500 mb-2">
                  HEAD
                </div>
              )}
              <div className="bg-white border-2 border-slate-300 rounded-lg p-4 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 flex items-center justify-center bg-blue-500 text-white rounded-lg text-xl font-bold">
                    {node.value}
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-xs text-slate-500">next</div>
                    <div className="w-8 h-8 flex items-center justify-center border border-slate-300 rounded bg-slate-50">
                      {node.next ? (
                        <ArrowRight className="w-4 h-4 text-slate-600" />
                      ) : (
                        <span className="text-xs text-slate-400">∅</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {node.next && (
              <ArrowRight className="w-6 h-6 text-blue-500 flex-shrink-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
