export const boardSize = 8;
export type xCordType = 'A' | 'B' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J';
export type yCordType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type SquareString = `${xCordType}${yCordType}`;
export const cordToLetterMap = new Map<yCordType, xCordType>([
  [0, 'A'],
  [1, 'B'],
  [2, 'C'],
  [3, 'D'],
  [4, 'E'],
  [5, 'F'],
  [6, 'G'],
  [7, 'H'],
  [8, 'I'],
  [9, 'J'],
]);
export const letterToCordMap = new Map<xCordType, yCordType>([
  ['A', 0],
  ['B', 1],
  ['C', 2],
  ['D', 3],
  ['E', 4],
  ['F', 5],
  ['G', 6],
  ['H', 7],
  ['I', 8],
  ['J', 9],
]);
