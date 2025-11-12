interface ArrayVisualizerProps {
  data: (number | string)[];
  highlightIndices?: number[];
}

export default function ArrayVisualizer({
  data,
  highlightIndices = [],
}: ArrayVisualizerProps) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-500">
        Array is empty
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-64 p-8">
      <div className="flex gap-2">
        {data.map((value, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <div className="text-xs font-medium text-slate-500">{index}</div>
            <div
              className={`w-16 h-16 flex items-center justify-center rounded-lg text-lg font-bold border-2 transition-all duration-300 ${
                highlightIndices.includes(index)
                  ? 'bg-blue-500 text-white border-blue-600 scale-110 shadow-lg'
                  : 'bg-white text-slate-800 border-slate-300'
              }`}
            >
              {value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
