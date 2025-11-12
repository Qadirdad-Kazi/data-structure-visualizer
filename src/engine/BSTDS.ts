import { BinaryTreeDS } from './BinaryTreeDS';
import { NodeData } from '../types';

class BSTNode {
  value: number;
  left: BSTNode | null = null;
  right: BSTNode | null = null;
  id: string;

  constructor(value: number, id: string) {
    this.value = value;
    this.id = id;
  }
}

export class BSTDS extends BinaryTreeDS {
  private bstRoot: BSTNode | null = null;
  private bstNodeIdCounter = 0;

  insert(value: number | string): void {
    this.clearSteps();
    const numValue = typeof value === 'string' ? parseInt(value) : value;
    const newNode = new BSTNode(numValue, `node-${this.bstNodeIdCounter++}`);

    if (!this.bstRoot) {
      this.addStep(
        `BST is empty, inserting ${numValue} as root`,
        `root = new Node(${numValue})`,
        'O(1)',
        this.getBSTStateForStep()
      );

      this.bstRoot = newNode;

      this.addStep(
        `Successfully inserted ${numValue} as root`,
        `root.value = ${numValue}`,
        'O(1)',
        this.getBSTStateForStep()
      );
    } else {
      this.addStep(
        `Starting insertion of ${numValue} from root`,
        `insertNode(root, ${numValue})`,
        'O(log n) avg, O(n) worst',
        this.getBSTStateForStep()
      );

      this.insertNode(this.bstRoot, newNode);
    }
  }

  private insertNode(current: BSTNode, newNode: BSTNode): void {
    this.addStep(
      `Comparing ${newNode.value} with ${current.value}`,
      `if (${newNode.value} < ${current.value})`,
      'O(log n) avg',
      this.getBSTStateForStep()
    );

    if (newNode.value < current.value) {
      if (!current.left) {
        this.addStep(
          `Left child is empty, inserting ${newNode.value} here`,
          `current.left = new Node(${newNode.value})`,
          'O(log n) avg',
          this.getBSTStateForStep()
        );

        current.left = newNode;

        this.addStep(
          `Successfully inserted ${newNode.value} as left child of ${current.value}`,
          `current.left.value = ${newNode.value}`,
          'O(log n) avg',
          this.getBSTStateForStep()
        );
      } else {
        this.addStep(
          `Going left from ${current.value}`,
          `insertNode(current.left, ${newNode.value})`,
          'O(log n) avg',
          this.getBSTStateForStep()
        );
        this.insertNode(current.left, newNode);
      }
    } else {
      if (!current.right) {
        this.addStep(
          `Right child is empty, inserting ${newNode.value} here`,
          `current.right = new Node(${newNode.value})`,
          'O(log n) avg',
          this.getBSTStateForStep()
        );

        current.right = newNode;

        this.addStep(
          `Successfully inserted ${newNode.value} as right child of ${current.value}`,
          `current.right.value = ${newNode.value}`,
          'O(log n) avg',
          this.getBSTStateForStep()
        );
      } else {
        this.addStep(
          `Going right from ${current.value}`,
          `insertNode(current.right, ${newNode.value})`,
          'O(log n) avg',
          this.getBSTStateForStep()
        );
        this.insertNode(current.right, newNode);
      }
    }
  }

  search(value: number | string): void {
    this.clearSteps();
    const numValue = typeof value === 'string' ? parseInt(value) : value;

    if (!this.bstRoot) {
      this.addStep(
        `BST is empty`,
        `if (!root) return false`,
        'O(1)',
        this.getBSTStateForStep()
      );
      return;
    }

    this.addStep(
      `Searching for ${numValue} in BST`,
      `searchNode(root, ${numValue})`,
      'O(log n) avg, O(n) worst',
      this.getBSTStateForStep()
    );

    this.searchNode(this.bstRoot, numValue);
  }

  private searchNode(current: BSTNode | null, value: number): boolean {
    if (!current) {
      this.addStep(
        `Reached null node, ${value} not found`,
        `return false`,
        'O(log n) avg',
        this.getBSTStateForStep()
      );
      return false;
    }

    this.addStep(
      `Checking node: ${current.value}`,
      `if (current.value === ${value})`,
      'O(log n) avg',
      this.getBSTStateForStep()
    );

    if (current.value === value) {
      this.addStep(
        `Found ${value} in BST`,
        `return true`,
        'O(log n) avg',
        this.getBSTStateForStep()
      );
      return true;
    } else if (value < current.value) {
      this.addStep(
        `${value} < ${current.value}, going left`,
        `searchNode(current.left, ${value})`,
        'O(log n) avg',
        this.getBSTStateForStep()
      );
      return this.searchNode(current.left, value);
    } else {
      this.addStep(
        `${value} > ${current.value}, going right`,
        `searchNode(current.right, ${value})`,
        'O(log n) avg',
        this.getBSTStateForStep()
      );
      return this.searchNode(current.right, value);
    }
  }

  delete(value: number | string): void {
    this.clearSteps();
    const numValue = typeof value === 'string' ? parseInt(value) : value;

    if (!this.bstRoot) {
      this.addStep(
        `BST is empty, cannot delete`,
        `if (!root) return`,
        'O(1)',
        this.getBSTStateForStep()
      );
      return;
    }

    this.addStep(
      `Starting deletion of ${numValue}`,
      `deleteNode(root, ${numValue})`,
      'O(log n) avg, O(n) worst',
      this.getBSTStateForStep()
    );

    this.bstRoot = this.deleteNode(this.bstRoot, numValue);
  }

  private deleteNode(current: BSTNode | null, value: number): BSTNode | null {
    if (!current) {
      this.addStep(
        `Node ${value} not found`,
        `return null`,
        'O(log n) avg',
        this.getBSTStateForStep()
      );
      return null;
    }

    if (value < current.value) {
      this.addStep(
        `${value} < ${current.value}, going left`,
        `current.left = deleteNode(current.left, ${value})`,
        'O(log n) avg',
        this.getBSTStateForStep()
      );
      current.left = this.deleteNode(current.left, value);
    } else if (value > current.value) {
      this.addStep(
        `${value} > ${current.value}, going right`,
        `current.right = deleteNode(current.right, ${value})`,
        'O(log n) avg',
        this.getBSTStateForStep()
      );
      current.right = this.deleteNode(current.right, value);
    } else {
      if (!current.left && !current.right) {
        this.addStep(
          `Node ${value} is a leaf, removing it`,
          `return null`,
          'O(log n) avg',
          this.getBSTStateForStep()
        );
        return null;
      } else if (!current.left) {
        this.addStep(
          `Node ${value} has only right child, replacing with it`,
          `return current.right`,
          'O(log n) avg',
          this.getBSTStateForStep()
        );
        return current.right;
      } else if (!current.right) {
        this.addStep(
          `Node ${value} has only left child, replacing with it`,
          `return current.left`,
          'O(log n) avg',
          this.getBSTStateForStep()
        );
        return current.left;
      } else {
        const minNode = this.findMin(current.right);
        this.addStep(
          `Node ${value} has two children, replacing with min from right subtree: ${minNode.value}`,
          `current.value = findMin(current.right)`,
          'O(log n) avg',
          this.getBSTStateForStep()
        );
        current.value = minNode.value;
        current.right = this.deleteNode(current.right, minNode.value);
      }
    }

    return current;
  }

  private findMin(node: BSTNode): BSTNode {
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  clear(): void {
    this.bstRoot = null;
    this.bstNodeIdCounter = 0;
    this.clearSteps();
  }

  getState(): any {
    return this.getBSTStateForStep();
  }

  private getBSTStateForStep(): { nodes: NodeData[] } {
    const nodes: NodeData[] = [];
    this.collectBSTNodes(this.bstRoot, nodes);
    return { nodes };
  }

  private collectBSTNodes(node: BSTNode | null, nodes: NodeData[]): void {
    if (!node) return;

    nodes.push({
      id: node.id,
      value: node.value,
      left: node.left?.id || null,
      right: node.right?.id || null,
    });

    this.collectBSTNodes(node.left, nodes);
    this.collectBSTNodes(node.right, nodes);
  }
}
