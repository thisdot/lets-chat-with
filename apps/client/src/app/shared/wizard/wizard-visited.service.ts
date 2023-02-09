import { Injectable } from '@angular/core';

@Injectable()
export class WizardVisitedService {
  visited: Set<string> = new Set<string>();

  isVisited(url: string): boolean {
    return !!this.visited.has(url);
  }
}
