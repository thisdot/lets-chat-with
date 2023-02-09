import { matchControlValidator } from './match-control.validator';

class FormGroupMock {
  controls: any;

  constructor(args) {
    this.controls = args;
    Object.keys(this.controls).forEach((control) => {
      this.controls[control] = { value: this.controls[control] };
    });
  }
}

describe('MatchControlValidator', () => {
  let validator;

  beforeEach(() => {
    validator = matchControlValidator('source', 'check');
  });

  it('should fail', () => {
    const formGroup = new FormGroupMock({
      source: 'foo',
      check: 'bar',
    });

    expect(validator(formGroup)).toEqual({
      notMatching: true,
    });
  });

  it('should succeed', () => {
    const formGroup = new FormGroupMock({
      source: 'foo',
      check: 'foo',
    });

    expect(validator(formGroup)).toEqual(null);
  });
});
