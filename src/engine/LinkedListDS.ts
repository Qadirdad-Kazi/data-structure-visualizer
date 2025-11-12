import { DataStructure } from './DataStructure';
import { NodeData } from '../types';

class ListNode {
  value: number | string;
  next: ListNode | null = null;
  id: string;

  constructor(value: number | string, id: string) {
    this.value = value;
    this.id = id;
  }
}

export class LinkedListDS extends DataStructure {
  private head: ListNode | null = null;
  private nodeIdCounter = 0;

  insert(value: number | string): void {
    this.clearSteps();
    const newNode = new ListNode(value, `node-${this.nodeIdCounter++}`);

    if (!this.head) {
      this.addStep(
        `List is empty, inserting ${value} as head`,
        `head = new Node(${value})`,
        'O(1)',
        this.getStateForStep()
      );

      this.head = newNode;

      this.addStep(
        `Successfully inserted ${value} as head`,
        `head.value = ${value}`,
        'O(1)',
        this.getStateForStep()
      );
    } else {
      this.addStep(
        `Traversing to the end of the list`,
        `let current = head`,
        'O(n)',
        this.getStateForStep()
      );

      let current = this.head;
      while (current.next) {
        current = current.next;
      }

      this.addStep(
        `Found end of list, inserting ${value}`,
        `current.next = new Node(${value})`,
        'O(n)',
        this.getStateForStep()
      );

      current.next = newNode;

      this.addStep(
        `Successfully inserted ${value} at end`,
        `current.next.value = ${value}`,
        'O(n)',
        this.getStateForStep()
      );
    }
  }

  delete(value: number | string): void {
    this.clearSteps();

    if (!this.head) {
      this.addStep(
        `List is empty, cannot delete ${value}`,
        `if (!head) return`,
        'O(1)',
        this.getStateForStep()
      );
      return;
    }

    if (this.head.value === value) {
      this.addStep(
        `Head node contains ${value}, removing it`,
        `head = head.next`,
        'O(1)',
        this.getStateForStep()
      );

      this.head = this.head.next;

      this.addStep(
        `Successfully deleted ${value} from head`,
        `head = ${this.head?.value || 'null'}`,
        'O(1)',
        this.getStateForStep()
      );
      return;
    }

    this.addStep(
      `Searching for ${value} in the list`,
      `let current = head`,
      'O(n)',
      this.getStateForStep()
    );

    let current = this.head;
    while (current.next && current.next.value !== value) {
      current = current.next;
    }

    if (!current.next) {
      this.addStep(
        `${value} not found in the list`,
        `return false`,
        'O(n)',
        this.getStateForStep()
      );
      return;
    }

    this.addStep(
      `Found ${value}, removing node`,
      `current.next = current.next.next`,
      'O(n)',
      this.getStateForStep()
    );

    current.next = current.next.next;

    this.addStep(
      `Successfully deleted ${value}`,
      `// node removed`,
      'O(n)',
      this.getStateForStep()
    );
  }

  search(value: number | string): void {
    this.clearSteps();

    if (!this.head) {
      this.addStep(
        `List is empty`,
        `if (!head) return false`,
        'O(1)',
        this.getStateForStep()
      );
      return;
    }

    this.addStep(
      `Starting search from head`,
      `let current = head`,
      'O(n)',
      this.getStateForStep()
    );

    let current: ListNode | null = this.head;
    let position = 0;

    while (current) {
      this.addStep(
        `Checking node at position ${position}: ${current.value}`,
        `if (current.value === ${value})`,
        'O(n)',
        this.getStateForStep()
      );

      if (current.value === value) {
        this.addStep(
          `Found ${value} at position ${position}`,
          `return true`,
          'O(n)',
          this.getStateForStep()
        );
        return;
      }

      current = current.next;
      position++;
    }

    this.addStep(
      `${value} not found in the list`,
      `return false`,
      'O(n)',
      this.getStateForStep()
    );
  }

  clear(): void {
    this.head = null;
    this.nodeIdCounter = 0;
    this.clearSteps();
  }

  getState(): any {
    return this.getStateForStep();
  }

  private getStateForStep(): { nodes: NodeData[] } {
    const nodes: NodeData[] = [];
    let current = this.head;

    while (current) {
      nodes.push({
        id: current.id,
        value: current.value,
        next: current.next?.id || null,
      });
      current = current.next;
    }

    return { nodes };
  }
}
