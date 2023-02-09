import { TestBed, waitForAsync } from '@angular/core/testing';
import { ReversePipe } from './reverse.pipe';

describe('ReversePipe', () => {
  let pipe: ReversePipe;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [ReversePipe],
    }).compileComponents();

    pipe = TestBed.inject(ReversePipe);
  }));

  it('should reverse the array', () => {
    const entry = ['a', 'b'];

    const result = pipe.transform(entry);

    expect(result[0]).toEqual('b');
  });

  it('should not affect the original array', () => {
    const entry = ['a', 'b'];

    pipe.transform(entry);

    expect(entry[0]).toEqual('a');
  });
});
