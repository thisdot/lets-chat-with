import { v4 as uuid } from 'uuid';
import { Entry } from '../types';
import { generateValue, ValueGenerators } from './valueGenerator';

export function generateEntries<T extends Object>(
  obj: T,
  additionalGenerators: ValueGenerators = {}
): Array<Entry<T>> {
  const additionalFields = Object.entries(obj).reduce(
    (results, [key, value]) => {
      const values = generateValue(value, additionalGenerators);
      return values
        .map((v) =>
          results.map((res) => ({
            ...res,
            [key]: v,
          }))
        )
        .flat();
    },
    [{}] as T[]
  );

  return additionalFields.map((field) => ({
    ...createBasicEntry(),
    ...field,
  }));
}

function createBasicEntry(): Entry<{}> {
  return {
    id: uuid(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
