import { GraphNode, GraphEdge } from '../../types';

interface GraphVisualizerProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export default function GraphVisualizer({ nodes, edges }: GraphVisualizerProps) {
  if (nodes.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-500">
        Graph is empty
      </div>
    );
  }

  return (
    <div className="relative min-h-96 bg-slate-50 rounded-lg p-8">
      <svg className="absolute top-0 left-0 w-full h-full">
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="#64748b" />
          </marker>
        </defs>

        {edges.map((edge, index) => {
          const fromNode = nodes.find((n) => n.id === edge.from);
          const toNode = nodes.find((n) => n.id === edge.to);

          if (!fromNode || !toNode) return null;
          
          // Skip rendering if coordinates are not valid numbers
          if (typeof fromNode.x !== 'number' || typeof fromNode.y !== 'number' || 
              typeof toNode.x !== 'number' || typeof toNode.y !== 'number' ||
              isNaN(fromNode.x) || isNaN(fromNode.y) || 
              isNaN(toNode.x) || isNaN(toNode.y)) {
            console.warn('Invalid node coordinates:', { fromNode, toNode });
            return null;
          }

          const dx = toNode.x - fromNode.x;
          const dy = toNode.y - fromNode.y;
          const lengthSquared = dx * dx + dy * dy;
          
          // Skip if nodes are too close to each other to avoid division by zero
          if (lengthSquared < 1) {
            console.warn('Nodes are too close together:', { fromNode, toNode });
            return null;
          }
          
          const length = Math.sqrt(lengthSquared);
          const offset = 30;

          // Ensure we don't have NaN values after calculations
          const endX = fromNode.x + (dx * Math.max(0, length - offset)) / length;
          const endY = fromNode.y + (dy * Math.max(0, length - offset)) / length;
          
          if (isNaN(endX) || isNaN(endY)) {
            console.warn('Invalid end coordinates calculated:', { fromNode, toNode, endX, endY });
            return null;
          }

          return (
            <g key={`edge-${index}`}>
              <line
                x1={fromNode.x}
                y1={fromNode.y}
                x2={endX}
                y2={endY}
                stroke="#64748b"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
              {edge.weight !== undefined && (
                <text
                  x={(fromNode.x + toNode.x) / 2}
                  y={(fromNode.y + toNode.y) / 2}
                  fill="#475569"
                  fontSize="12"
                  fontWeight="bold"
                  textAnchor="middle"
                  className="bg-white"
                >
                  {edge.weight}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      <div className="relative">
        {nodes.map((node) => {
          // Skip rendering nodes with invalid or NaN coordinates
          if (typeof node.x !== 'number' || typeof node.y !== 'number' || 
              isNaN(node.x) || isNaN(node.y)) {
            console.warn('Skipping node with invalid coordinates:', node);
            return null;
          }
          return (
            <div
              key={node.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${node.x}px`, top: `${node.y}px` }}
            >
            <div
              className={`w-14 h-14 flex items-center justify-center rounded-full text-lg font-bold shadow-lg border-4 border-white transition-all duration-300 ${
                node.visited
                  ? 'bg-green-500 text-white'
                  : 'bg-slate-700 text-white'
              }`}
            >
              {node.value}
            </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
