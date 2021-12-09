export const reorder = <T>(
  list: T[],
  startIndex: number,
  endIndex: number,
): T[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};


export function getPositionForIndex(list: number[] = [], index: number): number {
  if (list.length === 0) {
    return 65536;
  }

  if (index === 0) {
    const order = list[index] === undefined ? 65536 : (list[index] <= 0 ? (list[index] - 65536) : list[index]);
    return parseInt((order / 2).toFixed(), 10);
  }

  if (index === list.length) {
    return (list[list.length - 1] + 65536);
  }

  const  previewPosition = list[index - 1];
  const nestPosition = list[index];

  return parseInt(((previewPosition + nestPosition) / 2).toFixed(), 10);
}