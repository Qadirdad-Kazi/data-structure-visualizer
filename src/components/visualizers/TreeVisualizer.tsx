import { NodeData } from '../../types';

interface TreeVisualizerProps {
  nodes: NodeData[];
}

interface TreeNodePosition {
  node: NodeData;
  x: number;
  y: number;
  level: number;
}

export default function TreeVisualizer({ nodes }: TreeVisualizerProps) {
  if (nodes.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-500">
        Tree is empty
      </div>
    );
  }

  const positions = calculatePositions(nodes);
  const maxY = Math.max(...positions.map((p) => p.y));

  return (
    <div className="relative min-h-96 p-8 overflow-auto">
      <svg
        className="absolute top-0 left-0 w-full h-full"
        style={{ minHeight: `${maxY + 100}px` }}
      >
        {positions.map((pos) => {
          const leftChild = nodes.find((n) => n.id === pos.node.left);
          const rightChild = nodes.find((n) => n.id === pos.node.right);
          const leftPos = positions.find((p) => p.node.id === leftChild?.id);
          const rightPos = positions.find((p) => p.node.id === rightChild?.id);

          return (
            <g key={`edges-${pos.node.id}`}>
              {leftPos && (
                <line
                  x1={pos.x}
                  y1={pos.y}
                  x2={leftPos.x}
                  y2={leftPos.y}
                  stroke="#94a3b8"
                  strokeWidth="2"
                />
              )}
              {rightPos && (
                <line
                  x1={pos.x}
                  y1={pos.y}
                  x2={rightPos.x}
                  y2={rightPos.y}
                  stroke="#94a3b8"
                  strokeWidth="2"
                />
              )}
            </g>
          );
        })}
      </svg>

      <div className="relative">
        {positions.map((pos) => (
          <div
            key={pos.node.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
          >
            <div className="w-12 h-12 flex items-center justify-center bg-teal-500 text-white rounded-full text-lg font-bold shadow-lg border-4 border-white">
              {pos.node.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function calculatePositions(nodes: NodeData[]): TreeNodePosition[] {
  if (nodes.length === 0) return [];

  const positions: TreeNodePosition[] = [];
  const root = nodes[0];
  const levelWidth = 800;
  const levelHeight = 100;

  function traverse(
    node: NodeData | undefined,
    level: number,
    left: number,
    right: number
  ): void {
    if (!node) return;

    const x = (left + right) / 2;
    const y = 50 + level * levelHeight;

    positions.push({ node, x, y, level });

    const leftChild = nodes.find((n) => n.id === node.left);
    const rightChild = nodes.find((n) => n.id === node.right);

    const mid = (left + right) / 2;
    traverse(leftChild, level + 1, left, mid);
    traverse(rightChild, level + 1, mid, right);
  }

  traverse(root, 0, 0, levelWidth);

  return positions;
}
