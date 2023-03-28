import { SquareString, cordToLetterMap, letterToCordMap, boardSize } from '@/app/constants';
import { PieceMapElement, PossibleMove, OcasionalMove, Color, Figure } from './interfaces';

const getCords = (position: SquareString) => {
  return [Number(letterToCordMap[position[0]]) - 1, Number(position.slice(1)) - 1];
};
const getPosition = (cords: [number, number]) => {
  return `${cordToLetterMap[`${cords[0]}`]}${cords[1]}` as SquareString;
};

export class Game {
  constructor(
    private board: Map<SquareString, PieceMapElement>,
    private setBoard: (moves: Map<SquareString, PieceMapElement>) => void,
    private setPossibleMoves: (moves: PossibleMove[]) => void,
    private ocasionalMoves: OcasionalMove[],
    private setOcasionalMoves: (moves: OcasionalMove[]) => void,
    private color: Color
  ) {}

  pawnMoves = (position: SquareString, color: Color) => {
    const possibleMoves = [...this.ocasionalMoves]; // adding possible en pasant moves
    const [x, y] = getCords(position);
    const marchSide = color === 'w' ? 1 : -1;
    const pawnStartingPosition = color === 'w' ? 1 : boardSize - 1;
    //moves
    const oneSquareAhead = getPosition([x, y + marchSide]);
    const pieceOnWay = this.board.get(oneSquareAhead);
    if (!pieceOnWay) {
      possibleMoves.push({ origin: position, direction: oneSquareAhead, type: 'move' });
      if (y === pawnStartingPosition) {
        const twoSquaresAhead = getPosition([x, y + 2 * marchSide]);
        const pieceOnWay = this.board.get(twoSquaresAhead);
        if (!pieceOnWay) {
          possibleMoves.push({ origin: position, direction: twoSquaresAhead, type: 'move' });
        }
      }
    }
    //captures
    let diagonalSquares: [number, number][];
    switch (x) {
      case 0:
        diagonalSquares = [[x + 1, y + marchSide]];
      case boardSize - 1:
        diagonalSquares = [[x - 1, y + marchSide]];
      default:
        diagonalSquares = [
          [x + 1, y + marchSide],
          [x - 1, y + marchSide],
        ];
    }
    diagonalSquares.forEach((pos) => {
      const sq = getPosition(pos);
      const piece = this.board.get(sq);
      if (piece && piece.color !== color) {
        possibleMoves.push({ origin: position, direction: sq, type: 'capture' });
      }
    });
    return possibleMoves;
  };

  kingMoves = (position: SquareString, color: Color) => {
    return [];
  };

  ensureKingSafety = (moves: PossibleMove[]) => {
    return moves;
  };

  public getMoves = (position: SquareString, figure: Figure) => {
    let moveMethod;
    switch (figure) {
      case 'p':
        moveMethod = this.pawnMoves;
      case 'k':
        moveMethod = this.kingMoves;
    }
    const moves = moveMethod(position, this.color);
    const safeMoves = this.ensureKingSafety(moves);
    this.setPossibleMoves(safeMoves);
  };
}

/*
// check for potential en-pasant
let potentialEnemyPassedPawns: [number, number][];
switch (x) {
  case 0:
    potentialEnemyPassedPawns = [[x + 1, y + 2]];
  case boardSize - 1:
    potentialEnemyPassedPawns = [[x - 1, y + 2]];
  default:
    potentialEnemyPassedPawns = [
      [x + 1, y + 2],
      [x - 1, y + 2],
    ];
}
potentialEnemyPassedPawns.forEach((pos) => {
  const sq = getPosition(pos);
  const piece = this.board.get(sq);
  if (piece && piece.color !== color && piece.figure === 'p') {
  }
});
*/
