import { Injectable } from '@angular/core';
import { WindowRef } from './window.service';

@Injectable({
  providedIn: 'root',
})
export class Storage {
  constructor(private _window: WindowRef) {}

  allItems() {
    return this._window.ref.localStorage;
  }

  setItem(key: string, value: unknown) {
    const stringified = JSON.stringify(value);
    this._window.ref.localStorage.setItem(key, stringified);
  }

  getItem<T = any>(key: string): T | null {
    const item = this._window.ref.localStorage.getItem(key);

    if (item === null) {
      return null;
    }

    try {
      return JSON.parse(item);
    } catch {
      return null;
    }
  }

  removeItem(key: string) {
    this._window.ref.localStorage.removeItem(key);
  }
}
