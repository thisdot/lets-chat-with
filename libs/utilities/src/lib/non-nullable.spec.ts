import { isNotNullOrUndefined } from './non-nullable';

describe(`isNotNullOrUndefined`, () => {
  it(`returns false if the provided input is null`, () => {
    const result = isNotNullOrUndefined(null);
    expect(result).toBe(false);
  });

  it(`returns false if the provided input is undefined`, () => {
    const result = isNotNullOrUndefined(undefined);
    expect(result).toBe(false);
  });

  it(`returns true if the provided input is falsy`, () => {
    const result = isNotNullOrUndefined(0);
    expect(result).toBe(true);
  });
});
