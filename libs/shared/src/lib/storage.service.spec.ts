import { TestBed, waitForAsync } from '@angular/core/testing';
import { Storage } from './storage.service';

describe('Storage', () => {
  let storage: Storage;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [Storage],
    }).compileComponents();

    storage = TestBed.inject(Storage);
  }));

  it('should create', () => {
    expect(storage).toBeTruthy();
  });

  it('should set an item', () => {
    storage.setItem('object', { foo: 'bar' });

    expect(localStorage.getItem('object')).toEqual('{"foo":"bar"}');
  });

  it('should get an item', () => {
    localStorage.setItem('object', '{ "foo": "bar" }');

    expect(storage.getItem('object')).toEqual({ foo: 'bar' });
  });

  it('should remove an item', () => {
    localStorage.setItem('item', 'value');

    storage.removeItem('item');

    expect(storage.getItem('item')).toBeFalsy();
  });
});
