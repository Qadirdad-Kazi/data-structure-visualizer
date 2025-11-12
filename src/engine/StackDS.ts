import { DataStructure } from './DataStructure';

export class StackDS extends DataStructure {
  private data: (number | string)[] = [];

  push(value: number | string): void {
    this.clearSteps();

    this.addStep(
      `Pushing ${value} onto the stack`,
      `stack.push(${value})`,
      'O(1)',
      { data: [...this.data] }
    );

    this.data.push(value);

    this.addStep(
      `${value} pushed successfully, now at top`,
      `top = ${value}`,
      'O(1)',
      { data: [...this.data] },
      [this.data.length - 1]
    );
  }

  pop(): number | string | undefined {
    this.clearSteps();

    if (this.data.length === 0) {
      this.addStep(
        `Stack is empty, cannot pop`,
        `if (stack.isEmpty()) return null`,
        'O(1)',
        { data: [...this.data] }
      );
      return undefined;
    }

    const topValue = this.data[this.data.length - 1];

    this.addStep(
      `Popping top element: ${topValue}`,
      `value = stack.pop()`,
      'O(1)',
      { data: [...this.data] },
      [this.data.length - 1]
    );

    this.data.pop();

    this.addStep(
      `${topValue} removed from stack`,
      `return ${topValue}`,
      'O(1)',
      { data: [...this.data] }
    );

    return topValue;
  }

  peek(): number | string | undefined {
    this.clearSteps();

    if (this.data.length === 0) {
      this.addStep(
        `Stack is empty`,
        `if (stack.isEmpty()) return null`,
        'O(1)',
        { data: [...this.data] }
      );
      return undefined;
    }

    const topValue = this.data[this.data.length - 1];

    this.addStep(
      `Top element is: ${topValue}`,
      `return stack[top]`,
      'O(1)',
      { data: [...this.data] },
      [this.data.length - 1]
    );

    return topValue;
  }

  insert(value: number | string): void {
    this.push(value);
  }

  delete(_value: number | string): void {
    this.pop();
  }

  search(value: number | string): void {
    this.clearSteps();

    if (this.data.length === 0) {
      this.addStep(
        `Stack is empty`,
        `if (stack.isEmpty()) return false`,
        'O(1)',
        { data: [...this.data] }
      );
      return;
    }

    for (let i = this.data.length - 1; i >= 0; i--) {
      this.addStep(
        `Checking position ${this.data.length - i}: ${this.data[i]}`,
        `if (stack[${i}] === ${value})`,
        'O(n)',
        { data: [...this.data] },
        [i]
      );

      if (this.data[i] === value) {
        this.addStep(
          `Found ${value} at position ${this.data.length - i} from top`,
          `return true`,
          'O(n)',
          { data: [...this.data] },
          [i]
        );
        return;
      }
    }

    this.addStep(
      `${value} not found in stack`,
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
