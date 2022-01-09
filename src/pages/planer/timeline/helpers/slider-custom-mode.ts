import {HandleItem} from 'react-compound-slider'

export function getSortByVal(reversed = false) {
  return function sortByVal(a: HandleItem, b: HandleItem) {
    if (a.val > b.val) {
      return reversed ? -1 : 1
    }

    if (b.val > a.val) {
      return reversed ? 1 : -1
    }

    return 0
  }
}

export function getUpdatedHandles(
  handles: HandleItem[],
  index: number,
  increment: number,
  reversed = false,
) {
  return [
    ...handles.slice(0, index),
    ...handles
      .slice(index)
      .map(({val, ...rest}) => ({...rest, val: val + increment})),
  ].sort(getSortByVal(reversed))
}

export function sliderCustomHandle(
  curr: HandleItem[],
  next: HandleItem[],
  step: number,
  reversed: boolean,
  getValue: (x: number) => number,
): HandleItem[] {
  let indexForMovingHandle = -1
  let handleMoveIsPositive = true

  for (let i = 0; i < curr.length; i++) {
    const c = curr[i]
    const n = next[i]

    // make sure keys are in same order if not return curr
    if (!n || n.key !== c.key) {
      return curr
    } else if (n.val !== c.val) {
      indexForMovingHandle = i
      handleMoveIsPositive = n.val - c.val > 0
    }
  }

  // nothing has changed (shouldn't happen but just in case).
  if (indexForMovingHandle === -1) {
    return curr
  }

  const increment = handleMoveIsPositive ? step : -step

  const last = next[next.length - 2]
  const nextLastStap = last.val + increment
  if (getValue(nextLastStap) !== nextLastStap) return curr

  return getUpdatedHandles(next, indexForMovingHandle + 1, increment, reversed)
}
