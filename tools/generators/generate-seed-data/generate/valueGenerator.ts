import { v4 as uuid } from 'uuid';

export type ValueGenerator<T = unknown, R extends Array<unknown> = unknown[]> = (value: T) => R;
export type ValueGenerators = Record<string, ValueGenerator>;

export const valueGenerators: ValueGenerators = {
  '<uuid>': () => [uuid()],
};

export const identityValueGenerator: ValueGenerator = <T>(value: T) => [value];

export const getIndexedValueGenerator = (generator: ValueGenerator<number>): ValueGenerator => {
  let index = 0;
  return () => generator(index++);
};

export function generateValue(
  value: unknown,
  additionalGenerators: ValueGenerators = {}
): unknown[] {
  if (typeof value === 'string') {
    const generator =
      additionalGenerators[value] || valueGenerators[value] || identityValueGenerator;
    return generator(value);
  }
  return [value];
}
