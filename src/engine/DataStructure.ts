import { AnimationStep } from '../types';

export abstract class DataStructure {
  protected steps: AnimationStep[] = [];
  protected currentStepIndex = 0;

  abstract insert(value: number | string): void;
  abstract delete(value: number | string): void;
  abstract search(value: number | string): void;
  abstract clear(): void;
  abstract getState(): any;

  getSteps(): AnimationStep[] {
    return this.steps;
  }

  getCurrentStep(): AnimationStep | null {
    return this.steps[this.currentStepIndex] || null;
  }

  nextStep(): AnimationStep | null {
    if (this.currentStepIndex < this.steps.length - 1) {
      this.currentStepIndex++;
      return this.steps[this.currentStepIndex];
    }
    return null;
  }

  previousStep(): AnimationStep | null {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
      return this.steps[this.currentStepIndex];
    }
    return null;
  }

  resetSteps(): void {
    this.currentStepIndex = 0;
  }

  clearSteps(): void {
    this.steps = [];
    this.currentStepIndex = 0;
  }

  protected addStep(
    description: string,
    code: string,
    complexity: string,
    state: any,
    highlightIndices?: number[]
  ): void {
    this.steps.push({
      id: `step-${this.steps.length}`,
      description,
      code,
      complexity,
      state: JSON.parse(JSON.stringify(state)),
      highlightIndices,
    });
  }
}
