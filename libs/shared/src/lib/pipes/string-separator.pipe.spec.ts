import { TestBed, waitForAsync } from '@angular/core/testing';
import { StringSeparatorPipe } from './string-separator.pipe';

describe('StringSeparatorPipe', () => {
  let pipe: StringSeparatorPipe;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [StringSeparatorPipe],
    }).compileComponents();

    pipe = TestBed.inject(StringSeparatorPipe);
  }));

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should show a comma between both strings if both values are provided', () => {
    const entry = ['SE2', 'ThisDot'];
    const result = pipe.transform(entry);
    expect(result).toEqual('SE2, ThisDot');
  });

  it('should not show a comma if only the first value is provided', () => {
    const entry = ['SE2', ''];
    const result = pipe.transform(entry);
    expect(result).toEqual('SE2');
  });

  it('should not show a comma if only the second value is provided', () => {
    const entry = ['', 'ThisDot'];
    const result = pipe.transform(entry);
    expect(result).toEqual('ThisDot');
  });

  it('should show an empty string if no values are provided', () => {
    const entry = [];
    const result = pipe.transform(entry);
    expect(result).toEqual('');
  });
});
