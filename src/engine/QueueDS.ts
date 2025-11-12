import { DataStructure } from './DataStructure';

export class QueueDS extends DataStructure {
  private data: (number | string)[] = [];

  enqueue(value: number | string): void {
    this.clearSteps();

    this.addStep(
      `Enqueueing ${value} to the queue`,
      `queue.enqueue(${value})`,
      'O(1)',
      { data: [...this.data] }
    );

    this.data.push(value);

    this.addStep(
      `${value} added to rear of queue`,
      `rear = ${value}`,
      'O(1)',
      { data: [...this.data] },
      [this.data.length - 1]
    );
  }

  dequeue(): number | string | undefined {
    this.clearSteps();

    if (this.data.length === 0) {
      this.addStep(
        `Queue is empty, cannot dequeue`,
        `if (queue.isEmpty()) return null`,
        'O(1)',
        { data: [...this.data] }
      );
      return undefined;
    }

    const frontValue = this.data[0];

    this.addStep(
      `Dequeueing front element: ${frontValue}`,
      `value = queue.dequeue()`,
      'O(n)',
      { data: [...this.data] },
      [0]
    );

    this.data.shift();

    this.addStep(
      `${frontValue} removed, elements shifted forward`,
      `return ${frontValue}`,
      'O(n)',
      { data: [...this.data] }
    );

    return frontValue;
  }

  peek(): number | string | undefined {
    this.clearSteps();

    if (this.data.length === 0) {
      this.addStep(
        `Queue is empty`,
        `if (queue.isEmpty()) return null`,
        'O(1)',
        { data: [...this.data] }
      );
      return undefined;
    }

    const frontValue = this.data[0];

    this.addStep(
      `Front element is: ${frontValue}`,
      `return queue[front]`,
      'O(1)',
      { data: [...this.data] },
      [0]
    );

    return frontValue;
  }

  insert(value: number | string): void {
    this.enqueue(value);
  }

  delete(_value: number | string): void {
    this.dequeue();
  }

  search(value: number | string): void {
    this.clearSteps();

    if (this.data.length === 0) {
      this.addStep(
        `Queue is empty`,
        `if (queue.isEmpty()) return false`,
        'O(1)',
        { data: [...this.data] }
      );
      return;
    }

    for (let i = 0; i < this.data.length; i++) {
      this.addStep(
        `Checking position ${i + 1}: ${this.data[i]}`,
        `if (queue[${i}] === ${value})`,
        'O(n)',
        { data: [...this.data] },
        [i]
      );

      if (this.data[i] === value) {
        this.addStep(
          `Found ${value} at position ${i + 1} from front`,
          `return true`,
          'O(n)',
          { data: [...this.data] },
          [i]
        );
        return;
      }
    }

    this.addStep(
      `${value} not found in queue`,
      `return false`,
      'O(n)',
      { data: [...this.data] }
    );
  }

  clear(): void {
    this.data = [];
    this.clearSteps();
  }

  getState(): any {
    return { data: [...this.data] };
  }

  isEmpty(): boolean {
    return this.data.length === 0;
  }
}
