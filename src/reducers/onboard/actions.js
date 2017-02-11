import { INCREMENT, DECREMENT } as types from './actionTypes';

export function Increment() {
  return { type: INCREMENT }
}

export function Decrement() {
  return { type: DECREMENT }
}
