export interface AnimationStep {
  id: string;
  description: string;
  code: string;
  complexity: string;
  state: any;
  highlightIndices?: number[];
}

export interface VisualizerConfig {
  speed: number;
  showCode: boolean;
  showComplexity: boolean;
}

export type DataStructureType =
  | 'array'
  | 'linked-list'
  | 'stack'
  | 'queue'
  | 'binary-tree'
  | 'bst'
  | 'graph';

export interface NodeData {
  id: string;
  value: number | string;
  next?: string | null;
  prev?: string | null;
  left?: string | null;
  right?: string | null;
  visited?: boolean;
  current?: boolean;
}

export interface GraphNode {
  id: string;
  value: string | number;
  x: number;
  y: number;
  visited?: boolean;
}

export interface GraphEdge {
  from: string;
  to: string;
  weight?: number;
}
