export const boardSize = 8;
export type xCordType = 'A' | 'B' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J';
export type yCordType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type SquareString = `${xCordType}${yCordType}`;
export const cordToLetterMap: {
  [key: `${number}`]: xCordType;
} = {
  '0': 'A',
  '1': 'B',
  '2': 'C',
  '3': 'D',
  '4': 'E',
  '5': 'F',
  '6': 'G',
  '7': 'H',
  '8': 'I',
  '9': 'J',
};
export const letterToCordMap: {
  [key: `${string}`]: yCordType;
} = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 6,
  G: 7,
  H: 8,
  I: 9,
  J: 10,
};
