import { DataStructure } from './DataStructure';
import { NodeData } from '../types';

class TreeNode {
  value: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  id: string;

  constructor(value: number, id: string) {
    this.value = value;
    this.id = id;
  }
}

export class BinaryTreeDS extends DataStructure {
  protected root: TreeNode | null = null;
  protected nodeIdCounter = 0;

  insert(value: number | string): void {
    this.clearSteps();
    const numValue = typeof value === 'string' ? parseInt(value) : value;
    const newNode = new TreeNode(numValue, `node-${this.nodeIdCounter++}`);

    if (!this.root) {
      this.addStep(
        `Tree is empty, inserting ${numValue} as root`,
        `root = new Node(${numValue})`,
        'O(1)',
        this.getStateForStep()
      );

      this.root = newNode;

      this.addStep(
        `Successfully inserted ${numValue} as root`,
        `root.value = ${numValue}`,
        'O(1)',
        this.getStateForStep()
      );
    } else {
      this.addStep(
        `Inserting ${numValue} using level-order traversal`,
        `queue = [root]`,
        'O(n)',
        this.getStateForStep()
      );

      const queue: TreeNode[] = [this.root];

      while (queue.length > 0) {
        const current = queue.shift()!;

        if (!current.left) {
          this.addStep(
            `Found empty left child of ${current.value}`,
            `current.left = new Node(${numValue})`,
            'O(n)',
            this.getStateForStep()
          );

          current.left = newNode;

          this.addStep(
            `Successfully inserted ${numValue} as left child of ${current.value}`,
            `current.left.value = ${numValue}`,
            'O(n)',
            this.getStateForStep()
          );
          break;
        } else if (!current.right) {
          this.addStep(
            `Found empty right child of ${current.value}`,
            `current.right = new Node(${numValue})`,
            'O(n)',
            this.getStateForStep()
          );

          current.right = newNode;

          this.addStep(
            `Successfully inserted ${numValue} as right child of ${current.value}`,
            `current.right.value = ${numValue}`,
            'O(n)',
            this.getStateForStep()
          );
          break;
        } else {
          queue.push(current.left);
          queue.push(current.right);
        }
      }
    }
  }

  delete(value: number | string): void {
    this.clearSteps();
    const numValue = typeof value === 'string' ? parseInt(value) : value;

    if (!this.root) {
      this.addStep(
        `Tree is empty, cannot delete`,
        `if (!root) return`,
        'O(1)',
        this.getStateForStep()
      );
      return;
    }

    this.addStep(
      `Searching for node with value ${numValue}`,
      `// Level-order traversal`,
      'O(n)',
      this.getStateForStep()
    );

    const queue: TreeNode[] = [this.root];
    let nodeToDelete: TreeNode | null = null;
    let deepestNode: TreeNode | null = null;
    let parentOfDeepest: TreeNode | null = null;

    while (queue.length > 0) {
      const current = queue.shift()!;
      deepestNode = current;

      if (current.value === numValue) {
        nodeToDelete = current;
      }

      if (current.left) {
        parentOfDeepest = current;
        queue.push(current.left);
      }
      if (current.right) {
        parentOfDeepest = current;
        queue.push(current.right);
      }
    }

    if (!nodeToDelete) {
      this.addStep(
        `Node with value ${numValue} not found`,
        `return false`,
        'O(n)',
        this.getStateForStep()
      );
      return;
    }

    if (deepestNode && nodeToDelete) {
      this.addStep(
        `Replacing ${nodeToDelete.value} with deepest node ${deepestNode.value}`,
        `nodeToDelete.value = deepestNode.value`,
        'O(n)',
        this.getStateForStep()
      );

      nodeToDelete.value = deepestNode.value;

      if (parentOfDeepest) {
        if (parentOfDeepest.left === deepestNode) {
          parentOfDeepest.left = null;
        } else {
          parentOfDeepest.right = null;
        }
      } else {
        this.root = null;
      }

      this.addStep(
        `Deleted node successfully`,
        `// Node removed`,
        'O(n)',
        this.getStateForStep()
      );
    }
  }

  search(value: number | string): void {
    this.clearSteps();
    const numValue = typeof value === 'string' ? parseInt(value) : value;

    if (!this.root) {
      this.addStep(
        `Tree is empty`,
        `if (!root) return false`,
        'O(1)',
        this.getStateForStep()
      );
      return;
    }

    this.addStep(
      `Searching for ${numValue} using level-order traversal`,
      `queue = [root]`,
      'O(n)',
      this.getStateForStep()
    );

    const queue: TreeNode[] = [this.root];

    while (queue.length > 0) {
      const current = queue.shift()!;

      this.addStep(
        `Checking node: ${current.value}`,
        `if (current.value === ${numValue})`,
        'O(n)',
        this.getStateForStep()
      );

      if (current.value === numValue) {
        this.addStep(
          `Found ${numValue} in the tree`,
          `return true`,
          'O(n)',
          this.getStateForStep()
        );
        return;
      }

      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }

    this.addStep(
      `${numValue} not found in tree`,
      `return false`,
      'O(n)',
      this.getStateForStep()
    );
  }

  inorderTraversal(): void {
    this.clearSteps();

    this.addStep(
      `Starting inorder traversal (Left → Root → Right)`,
      `inorder(root)`,
      'O(n)',
      this.getStateForStep()
    );

    this.inorderHelper(this.root);

    this.addStep(
      `Inorder traversal complete`,
      `// Done`,
      'O(n)',
      this.getStateForStep()
    );
  }

  private inorderHelper(node: TreeNode | null): void {
    if (!node) return;

    this.inorderHelper(node.left);

    this.addStep(
      `Visiting node: ${node.value}`,
      `visit(${node.value})`,
      'O(n)',
      this.getStateForStep()
    );

    this.inorderHelper(node.right);
  }

  clear(): void {
    this.root = null;
    this.nodeIdCounter = 0;
    this.clearSteps();
  }

  getState(): any {
    return this.getStateForStep();
  }

  protected getStateForStep(): { nodes: NodeData[] } {
    const nodes: NodeData[] = [];
    this.collectNodes(this.root, nodes);
    return { nodes };
  }

  private collectNodes(node: TreeNode | null, nodes: NodeData[]): void {
    if (!node) return;

    nodes.push({
      id: node.id,
      value: node.value,
      left: node.left?.id || null,
      right: node.right?.id || null,
    });

    this.collectNodes(node.left, nodes);
    this.collectNodes(node.right, nodes);
  }
}
