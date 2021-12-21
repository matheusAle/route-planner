export const isHandleDisabled = (index: number, length: number): boolean => {
  return index === 0 || index % 2 === 1 || index + 1 === length
}
