import { DataStructure } from './DataStructure';

export class ArrayDS extends DataStructure {
  private data: (number | string)[] = [];

  constructor(initialData: (number | string)[] = []) {
    super();
    this.data = [...initialData];
  }

  insert(value: number | string, index?: number): void {
    this.clearSteps();

    if (index === undefined || index === this.data.length) {
      this.addStep(
        `Inserting ${value} at the end of the array`,
        `arr.push(${value})`,
        'O(1)',
        { data: [...this.data] }
      );

      this.data.push(value);

      this.addStep(
        `Successfully inserted ${value}`,
        `arr = [${this.data.join(', ')}]`,
        'O(1)',
        { data: [...this.data] },
        [this.data.length - 1]
      );
    } else {
      this.addStep(
        `Inserting ${value} at index ${index}`,
        `arr.splice(${index}, 0, ${value})`,
        'O(n)',
        { data: [...this.data] }
      );

      this.data.splice(index, 0, value);

      this.addStep(
        `Elements shifted right, ${value} inserted at index ${index}`,
        `arr = [${this.data.join(', ')}]`,
        'O(n)',
        { data: [...this.data] },
        [index]
      );
    }
  }

  delete(value: number | string): void {
    this.clearSteps();
    const index = this.data.indexOf(value);

    if (index === -1) {
      this.addStep(
        `Element ${value} not found in array`,
        `arr.indexOf(${value}) === -1`,
        'O(n)',
        { data: [...this.data] }
      );
      return;
    }

    this.addStep(
      `Found ${value} at index ${index}`,
      `arr.indexOf(${value}) // returns ${index}`,
      'O(n)',
      { data: [...this.data] },
      [index]
    );

    this.data.splice(index, 1);

    this.addStep(
      `Deleted ${value}, elements shifted left`,
      `arr.splice(${index}, 1)`,
      'O(n)',
      { data: [...this.data] }
    );
  }

  search(value: number | string): void {
    this.clearSteps();

    for (let i = 0; i < this.data.length; i++) {
      this.addStep(
        `Checking index ${i}: ${this.data[i]}`,
        `if (arr[${i}] === ${value})`,
        'O(n)',
        { data: [...this.data] },
        [i]
      );

      if (this.data[i] === value) {
        this.addStep(
          `Found ${value} at index ${i}`,
          `return ${i}`,
          'O(n)',
          { data: [...this.data] },
          [i]
        );
        return;
      }
    }

    this.addStep(
      `${value} not found in array`,
      `return -1`,
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

  getData(): (number | string)[] {
    return [...this.data];
  }
}
