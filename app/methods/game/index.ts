import {
  SquareString,
  cordToLetterMap,
  letterToCordMap,
  boardSize,
  yCordType,
  xCordType,
} from '@/app/constants';
import {
  PieceMapElement,
  PossibleMove,
  OcasionalMove,
  Color,
  Figure,
  MakeMoveFT,
} from './interfaces';

export const getCords = (position: SquareString) => {
  return [Number(letterToCordMap.get(position[0] as xCordType)), Number(position.slice(1)) - 1];
};
export const getPosition = (cords: [number, number]) => {
  return `${cordToLetterMap.get(cords[0] as yCordType)}${cords[1] + 1}` as SquareString;
};

export class Game {
  constructor(
    private board: Map<SquareString, PieceMapElement>,
    private setBoard: (moves: Map<SquareString, PieceMapElement>) => void,
    private possibleMoves: PossibleMove[],
    private setPossibleMoves: (moves: PossibleMove[]) => void,
    private ocasionalMoves: OcasionalMove[],
    private setOcasionalMoves: (moves: OcasionalMove[]) => void,
    private color: Color,
    private setColor: (color: Color) => void
  ) {}

  private pawnMoves = (position: SquareString, color: Color) => {
    const possibleMoves = [...this.ocasionalMoves]; // adding possible enpassant moves
    const [x, y] = getCords(position);
    const marchSide = color === 'w' ? 1 : -1;
    const pawnStartingPosition = color === 'w' ? 1 : boardSize - 1;
    const travelToBoardEnd = (color === 'w' ? boardSize - 1 : 0) === y + marchSide;
    //moves
    const oneSquareAhead = getPosition([x, y + marchSide]);
    console.log(oneSquareAhead);
    const pieceOnWay = this.board.get(oneSquareAhead);
    console.log('piece', pieceOnWay);
    if (!pieceOnWay) {
      possibleMoves.push({
        origin: position,
        direction: oneSquareAhead,
        type: travelToBoardEnd ? 'promotion' : 'move',
      });
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
        possibleMoves.push({
          origin: position,
          direction: sq,
          type: travelToBoardEnd ? 'promotion' : 'capture',
        });
      }
    });
    return possibleMoves;
  };

  private checkEnpasant = () => {};

  private kingMoves = (position: SquareString, color: Color) => {
    return [];
  };

  private ensureKingSafety = (moves: PossibleMove[]) => {
    return moves;
  };

  public getMoves = (position: SquareString, figure: Figure) => {
    let moveMethod;
    switch (figure) {
      case 'p':
        moveMethod = this.pawnMoves;
        break;
      case 'k':
        moveMethod = this.kingMoves;
        break;
      case 'q':
        moveMethod = this.kingMoves; //TODO make queen moves
    }
    const moves = moveMethod(position, this.color);
    const safeMoves = this.ensureKingSafety(moves);
    this.setPossibleMoves(safeMoves);
  };

  public makeMove: MakeMoveFT = ({ origin, direction }) => {
    const possibleMove = this.possibleMoves.find((m) => m.direction === direction);
    if (!possibleMove) return;
    const boardCoppy = new Map(this.board);
    const movedPiece = boardCoppy.get(origin);
    if (!movedPiece) return;
    if (possibleMove.type === 'promotion') {
      boardCoppy.set(direction, { ...movedPiece, figure: 'q' });
    } else {
      boardCoppy.set(direction, movedPiece);
    }
    boardCoppy.delete(origin);
    if (possibleMove.type === 'enpassant') {
      const captured = possibleMove.passedPawn as SquareString;
      boardCoppy.delete(captured);
    }

    // set ocasional moves like enpasant
    let createdEnPasants: OcasionalMove[] = [];
    if (movedPiece.figure === 'p') {
      const [originX, originY] = getCords(origin);
      const [directionX, directionY] = getCords(direction);
      if (Math.abs(directionY - originY) === 2) {
        let potentialEnemyPassedPawns: [number, number][];
        switch (originX) {
          case 0:
            potentialEnemyPassedPawns = [[originX + 1, directionY]];
            break;
          case boardSize - 1:
            potentialEnemyPassedPawns = [[originX - 1, directionY]];
            break;
          default:
            potentialEnemyPassedPawns = [
              [originX + 1, directionY],
              [originX - 1, directionY],
            ];
            break;
        }
        potentialEnemyPassedPawns.forEach((potentialPawn) => {
          const position = getPosition(potentialPawn);
          const passedFigure = boardCoppy.get(position);
          if (passedFigure?.figure === 'p' && passedFigure?.color != movedPiece.color) {
            const marchSide = movedPiece.color === 'w' ? 1 : -1;
            const enPasantCaputureDestinaiton = getPosition([originX, originY + marchSide]);
            createdEnPasants.push({
              origin: position,
              direction: enPasantCaputureDestinaiton,
              type: 'enpassant',
              passedPawn: direction,
            });
          }
        });
      }
    }
    this.setOcasionalMoves([...createdEnPasants]);
    this.setBoard(boardCoppy);
    //this.setColor(this.color === 'w' ? 'b' : 'w');
    this.setPossibleMoves([]);
  };
}
/*
// check for potential en-passant
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
