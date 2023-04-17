import { letterToCordMap, cordToLetterMap, boardSize } from './index';

test('letterToCordMap works', () => {
  expect(letterToCordMap.get('A')).toEqual(0);
});

test('cordToLetterMap works', () => {
  expect(cordToLetterMap.get(0)).toEqual('A');
});

test('board size is a number greater than 8', () => {
  expect(boardSize).toBeGreaterThanOrEqual(8);
});
