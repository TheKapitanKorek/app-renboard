import { Game, getCords, getPosition } from '.';
describe('game methods', () => {
  test('get position returns expected position', () => {
    expect(getPosition([1, 5])).toEqual('B6');
  });
  test('get cords returns expected cords', () => {
    expect(getCords('C4')).toEqual([2, 3]);
  });
});
