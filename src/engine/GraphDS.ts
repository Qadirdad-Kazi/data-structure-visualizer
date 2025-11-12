import { DataStructure } from './DataStructure';
import { GraphNode, GraphEdge } from '../types';

export class GraphDS extends DataStructure {
  private nodes: Map<string, GraphNode> = new Map();
  private adjacencyList: Map<string, Set<string>> = new Map();
  private edges: GraphEdge[] = [];

  addNode(value: string | number): void {
    const id = `node-${value}`;
    if (this.nodes.has(id)) return;

    this.nodes.set(id, {
      id,
      value,
      x: Math.random() * 600 + 50,
      y: Math.random() * 400 + 50,
    });

    this.adjacencyList.set(id, new Set());
  }

  addEdge(from: string | number, to: string | number, weight?: number): void {
    const fromId = `node-${from}`;
    const toId = `node-${to}`;

    if (!this.nodes.has(fromId)) this.addNode(from);
    if (!this.nodes.has(toId)) this.addNode(to);

    this.adjacencyList.get(fromId)?.add(toId);
    this.edges.push({ from: fromId, to: toId, weight });
  }

  insert(value: number | string): void {
    this.clearSteps();

    this.addStep(
      `Adding node ${value} to graph`,
      `graph.addNode(${value})`,
      'O(1)',
      this.getGraphState()
    );

    this.addNode(value);

    this.addStep(
      `Node ${value} added successfully`,
      `nodes.set('${value}', node)`,
      'O(1)',
      this.getGraphState()
    );
  }

  delete(value: number | string): void {
    this.clearSteps();
    const nodeId = `node-${value}`;

    if (!this.nodes.has(nodeId)) {
      this.addStep(
        `Node ${value} not found in graph`,
        `if (!nodes.has('${value}'))`,
        'O(1)',
        this.getGraphState()
      );
      return;
    }

    this.addStep(
      `Removing all edges connected to node ${value}`,
      `removeEdges(${value})`,
      'O(V + E)',
      this.getGraphState()
    );

    this.edges = this.edges.filter(
      (edge) => edge.from !== nodeId && edge.to !== nodeId
    );

    this.adjacencyList.forEach((neighbors) => {
      neighbors.delete(nodeId);
    });

    this.adjacencyList.delete(nodeId);
    this.nodes.delete(nodeId);

    this.addStep(
      `Node ${value} removed from graph`,
      `nodes.delete('${value}')`,
      'O(V + E)',
      this.getGraphState()
    );
  }

  search(value: number | string): void {
    this.clearSteps();
    const targetId = `node-${value}`;

    this.addStep(
      `Searching for node ${value} in graph`,
      `nodes.has('${value}')`,
      'O(1)',
      this.getGraphState()
    );

    if (this.nodes.has(targetId)) {
      this.addStep(
        `Node ${value} found in graph`,
        `return true`,
        'O(1)',
        this.getGraphState()
      );
    } else {
      this.addStep(
        `Node ${value} not found in graph`,
        `return false`,
        'O(1)',
        this.getGraphState()
      );
    }
  }

  bfs(startValue: number | string): void {
    this.clearSteps();
    const startId = `node-${startValue}`;

    if (!this.nodes.has(startId)) {
      this.addStep(
        `Start node ${startValue} not found`,
        `if (!nodes.has(start))`,
        'O(1)',
        this.getGraphState()
      );
      return;
    }

    this.addStep(
      `Starting BFS from node ${startValue}`,
      `queue = [${startValue}]; visited = new Set()`,
      'O(V + E)',
      this.getGraphState()
    );

    const visited = new Set<string>();
    const queue: string[] = [startId];
    visited.add(startId);

    while (queue.length > 0) {
      const currentId = queue.shift()!;
      const currentNode = this.nodes.get(currentId)!;

      this.addStep(
        `Visiting node ${currentNode.value}`,
        `current = queue.dequeue()`,
        'O(V + E)',
        this.getGraphState(visited)
      );

      const neighbors = this.adjacencyList.get(currentId) || new Set();

      for (const neighborId of neighbors) {
        if (!visited.has(neighborId)) {
          visited.add(neighborId);
          queue.push(neighborId);

          const neighborNode = this.nodes.get(neighborId)!;

          this.addStep(
            `Discovered neighbor ${neighborNode.value}, adding to queue`,
            `queue.enqueue(${neighborNode.value})`,
            'O(V + E)',
            this.getGraphState(visited)
          );
        }
      }
    }

    this.addStep(
      `BFS traversal complete`,
      `// Visited all reachable nodes`,
      'O(V + E)',
      this.getGraphState(visited)
    );
  }

  dfs(startValue: number | string): void {
    this.clearSteps();
    const startId = `node-${startValue}`;

    if (!this.nodes.has(startId)) {
      this.addStep(
        `Start node ${startValue} not found`,
        `if (!nodes.has(start))`,
        'O(1)',
        this.getGraphState()
      );
      return;
    }

    this.addStep(
      `Starting DFS from node ${startValue}`,
      `stack = [${startValue}]; visited = new Set()`,
      'O(V + E)',
      this.getGraphState()
    );

    const visited = new Set<string>();
    this.dfsHelper(startId, visited);

    this.addStep(
      `DFS traversal complete`,
      `// Visited all reachable nodes`,
      'O(V + E)',
      this.getGraphState(visited)
    );
  }

  private dfsHelper(nodeId: string, visited: Set<string>): void {
    visited.add(nodeId);
    const node = this.nodes.get(nodeId)!;

    this.addStep(
      `Visiting node ${node.value}`,
      `visit(${node.value})`,
      'O(V + E)',
      this.getGraphState(visited)
    );

    const neighbors = this.adjacencyList.get(nodeId) || new Set();

    for (const neighborId of neighbors) {
      if (!visited.has(neighborId)) {
        const neighborNode = this.nodes.get(neighborId)!;

        this.addStep(
          `Exploring neighbor ${neighborNode.value}`,
          `dfs(${neighborNode.value})`,
          'O(V + E)',
          this.getGraphState(visited)
        );

        this.dfsHelper(neighborId, visited);
      }
    }
  }

  clear(): void {
    this.nodes.clear();
    this.adjacencyList.clear();
    this.edges = [];
    this.clearSteps();
  }

  getState(): any {
    return this.getGraphState();
  }

  private getGraphState(visited?: Set<string>): {
    nodes: GraphNode[];
    edges: GraphEdge[];
  } {
    const nodes = Array.from(this.nodes.values()).map((node) => ({
      ...node,
      visited: visited?.has(node.id) || false,
    }));

    return {
      nodes,
      edges: [...this.edges],
    };
  }
}
