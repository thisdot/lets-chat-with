export function pickRandomSet<T>(arr: T[], count: number): T[] {
  const copyArr = [...arr];
  const result = Array<T>();
  for (let i = 0; i < count && copyArr.length; i++) {
    result.push(...copyArr.splice(getRandomInt(copyArr.length - 1), 1));
  }
  return result;
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}
