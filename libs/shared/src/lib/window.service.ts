import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WindowRef {
  get ref() {
    return window;
  }
}
