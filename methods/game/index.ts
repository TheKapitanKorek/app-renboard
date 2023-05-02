import {
  SquareString,
  cordToLetterMap,
  letterToCordMap,
  boardSize,
  yCordType,
  xCordType,
} from '@/constants';
import {
  PieceMapElement,
  PossibleMove,
  OcasionalMove,
  Color,
  Figure,
  MakeMoveFT,
  VectorArray,
  King,
  Piece,
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

  private pawnMoves = (
    position: SquareString,
    color: Color,
    board: Map<SquareString, PieceMapElement> = this.board
  ) => {
    const possibleMoves = [...this.ocasionalMoves]; // adding possible enpassant moves
    const [x, y] = getCords(position);
    const marchSide = color === 'w' ? 1 : -1;
    const pawnStartingPosition = color === 'w' ? 1 : boardSize - 1;
    const travelToBoardEnd = (color === 'w' ? boardSize - 1 : 0) === y + marchSide;
    //moves
    const oneSquareAhead = getPosition([x, y + marchSide]);
    const pieceOnWay = board.get(oneSquareAhead);
    if (!pieceOnWay) {
      possibleMoves.push({
        origin: position,
        destination: oneSquareAhead,
        type: travelToBoardEnd ? 'promotion' : 'move',
      });
      if (y === pawnStartingPosition) {
        const twoSquaresAhead = getPosition([x, y + 2 * marchSide]);
        const pieceOnWay = board.get(twoSquaresAhead);
        if (!pieceOnWay) {
          possibleMoves.push({ origin: position, destination: twoSquaresAhead, type: 'move' });
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
      const piece = board.get(sq);
      if (piece && piece.color !== color) {
        possibleMoves.push({
          origin: position,
          destination: sq,
          type: travelToBoardEnd ? 'promotion' : 'capture',
        });
      }
    });
    return possibleMoves;
  };

  private collisionLessMoves = (
    position: SquareString,
    color: Color,
    vectorArray: VectorArray,
    board: Map<SquareString, PieceMapElement> = this.board
  ) => {
    const possibleMoves: PossibleMove[] = [];
    const [currentX, currentY] = getCords(position);
    vectorArray.forEach(([xDir, yDir]) => {
      const newX = currentX + xDir;
      const newY = currentY + yDir;
      if (newX < 0 || newX > boardSize - 1 || newY < 0 || newY > boardSize - 1) return;
      const newPosition = getPosition([newX, newY]);
      const pieceOnWay = board.get(newPosition);
      if (!pieceOnWay) {
        possibleMoves.push({ origin: position, destination: newPosition, type: 'move' });
      } else if (pieceOnWay.color !== color) {
        possibleMoves.push({ origin: position, destination: newPosition, type: 'capture' });
      }
    });
    return possibleMoves;
  };

  private collisionMoves = (
    position: SquareString,
    color: Color,
    vectorArray: VectorArray,
    board: Map<SquareString, PieceMapElement> = this.board
  ) => {
    const possibleMoves: PossibleMove[] = [];
    const [currentX, currentY] = getCords(position);
    const opositeColor = color === 'w' ? 'b' : 'w';
    vectorArray.forEach(([x, y]) => {
      for (let i = 1; i < boardSize; i++) {
        const newX = currentX + x * i;
        const newY = currentY + y * i;
        if (newX < 0 || newX > boardSize - 1 || newY < 0 || newY > boardSize - 1) return;
        const newPosition = getPosition([newX, newY]);
        const pieceOnWay = board.get(newPosition);
        if (!pieceOnWay) {
          possibleMoves.push({ origin: position, destination: newPosition, type: 'move' });
        } else {
          if (pieceOnWay.color === opositeColor) {
            possibleMoves.push({ origin: position, destination: newPosition, type: 'capture' });
          }
          return;
        }
      }
    });
    return possibleMoves;
  };

  private castles = (
    position: SquareString,
    color: Color,
    board: Map<SquareString, PieceMapElement> = this.board
  ) => {
    if (boardSize <= 4) return [];
    const possibelMoves: PossibleMove[] = [];
    const king = board.get(position) as King;
    const castleDirections = [];
    if (king.canLongCastle) castleDirections.push(-1);
    if (king.canShortCastle) castleDirections.push(1);
    castleDirections.forEach((castleDirection) => {
      const boardCoppy = new Map(board);
      const [currentX, currentY] = getCords(position);
      // chech if there are any pieces between the king and rook
      const adjutment = castleDirection === -1 ? 1 : 0;
      const boardCorner = boardSize / 2 + adjutment;
      for (let i = 1; i < boardCorner; i++) {
        const newPosition = getPosition([currentX + i * castleDirection, currentY]);
        const pieceOnTheWay = boardCoppy.get(newPosition);
        if (pieceOnTheWay) {
          if (i !== boardCorner - 1) return;
          if (
            i === boardCorner - 1 &&
            !(pieceOnTheWay.figure === 'r' && pieceOnTheWay.color === color)
          )
            return;
        }
      }
      //check if king is in check
      if (this.kingInCheck(board, color)) return;
      // check if king will be going through any endangared squaress
      for (let i = 0; i < 2; i++) {
        const currentPosition = getPosition([currentX + i * castleDirection, currentY]);
        const newPosition = getPosition([currentX + (i + 1) * castleDirection, currentY]);
        boardCoppy.delete(currentPosition);
        boardCoppy.set(newPosition, king);
        const squareUnderAttack = this.kingInCheck(boardCoppy, color);
        if (squareUnderAttack) return;
      }
      const movedRook = getPosition([currentX + (boardCorner - 1) * castleDirection, currentY]);
      const rookDestination = getPosition([currentX + castleDirection, currentY]);
      const kingDestination = getPosition([currentX + castleDirection * 2, currentY]);
      possibelMoves.push({
        origin: position,
        destination: kingDestination,
        movedRook,
        rookDestination,
        type: 'castle',
      });
    });
    return possibelMoves;
  };

  private kingMoves = (
    position: SquareString,
    color: Color = this.color,
    board: Map<SquareString, PieceMapElement> = this.board
  ) => {
    const movedirections: VectorArray = [
      [1, 1],
      [1, 0],
      [1, -1],
      [0, 1],
      [0, -1],
      [-1, 1],
      [-1, 0],
      [-1, -1],
    ];
    const castles = this.castles(position, color, board);
    const normalMoves = this.collisionLessMoves(position, color, movedirections, board);
    return [...castles, ...normalMoves];
  };

  private kinghtMoves = (
    position: SquareString,
    color: Color,
    board: Map<SquareString, PieceMapElement> = this.board
  ) => {
    const movedirections: VectorArray = [
      [-1, 2],
      [1, 2],
      [2, 1],
      [2, -1],
      [-1, -2],
      [1, -2],
      [-2, 1],
      [-2, -1],
    ];
    return this.collisionLessMoves(position, color, movedirections, board);
  };

  private bishopMoves = (
    position: SquareString,
    color: Color,
    board: Map<SquareString, PieceMapElement> = this.board
  ) => {
    const directionVectors: [number, number][] = [
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
    ];
    return this.collisionMoves(position, color, directionVectors, board);
  };

  private rookMoves = (
    position: SquareString,
    color: Color,
    board: Map<SquareString, PieceMapElement> = this.board
  ) => {
    const directionVectors: [number, number][] = [
      [1, 0],
      [-1, 0],
      [0, -1],
      [0, 1],
    ];
    return this.collisionMoves(position, color, directionVectors, board);
  };

  private queenMoves = (
    position: SquareString,
    color: Color,
    board: Map<SquareString, PieceMapElement> = this.board
  ) => {
    const directionVectors: [number, number][] = [
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
      [1, 0],
      [-1, 0],
      [0, -1],
      [0, 1],
    ];
    return this.collisionMoves(position, color, directionVectors, board);
  };

  private getMoves = (
    position: SquareString,
    figure: Figure,
    color: Color,
    board: Map<SquareString, PieceMapElement> = this.board
  ) => {
    let moveMethod;
    switch (figure) {
      case 'p':
        moveMethod = this.pawnMoves;
        break;
      case 'k':
        moveMethod = this.kingMoves;
        break;
      case 'n':
        moveMethod = this.kinghtMoves;
        break;
      case 'b':
        moveMethod = this.bishopMoves;
        break;
      case 'r':
        moveMethod = this.rookMoves;
        break;
      case 'q':
        moveMethod = this.queenMoves; //TODO make queen moves
    }
    return moveMethod(position, color, board);
  };
  // TODO consider extracting attecked square logic to more generic function and usin it here
  private kingInCheck = (board: Map<SquareString, PieceMapElement>, color: Color) => {
    //find players king and check if it is safe
    const opositeColor = color === 'w' ? 'b' : 'w';
    const boardSetup = [...board];
    const playerKing = boardSetup.find(([square, piece]) => {
      return piece.figure === 'k' && piece.color === color;
    });
    // some game varians may allow one side not to have king so if it isnt present on the board just allow any move
    if (!playerKing) return false;
    for (const [square, piece] of boardSetup) {
      if (piece.color === opositeColor) {
        const enemyPiecePossibleMoves = this.getMoves(square, piece.figure, opositeColor, board);
        const attackOnKing = enemyPiecePossibleMoves.find(
          ({ destination, type }) => destination === playerKing[0]
        );
        if (attackOnKing) return true;
      }
    }
    return false;
  };

  private ensureKingSafety = (
    moves: PossibleMove[],
    color: Color = this.color,
    board: Map<SquareString, PieceMapElement> = this.board
  ) => {
    return moves.filter((move) => {
      //make move on coppy of the board
      const boardCoppy = new Map(board);
      const movedPiece = boardCoppy.get(move.origin);
      if (!movedPiece) throw new Error('Error calculating move for piece that does not exist!');
      if (move.type === 'promotion') {
        boardCoppy.set(move.destination, { ...movedPiece, figure: 'q' });
        boardCoppy.delete(move.origin);
      } else if (move.type === 'enpassant') {
        const captured = move.passedPawn as SquareString;
        boardCoppy.delete(captured);
        boardCoppy.delete(move.origin);
      } else if (move.type === 'castle') {
        const rookSquare = move.movedRook as SquareString;
        const rookDestination = move.rookDestination as SquareString;
        const rook = boardCoppy.get(rookSquare) as Piece;
        boardCoppy.set(rookDestination, rook);
        boardCoppy.set(move.destination, movedPiece);
        boardCoppy.delete(rookSquare);
        boardCoppy.delete(move.origin);
      } else {
        boardCoppy.set(move.destination, movedPiece);
        boardCoppy.delete(move.origin);
      }

      const check = this.kingInCheck(boardCoppy, color);
      return !check;
    });
  };

  public setMoves = (position: SquareString, figure: Figure) => {
    const moves = this.getMoves(position, figure, this.color);
    const safeMoves = this.ensureKingSafety(moves);
    this.setPossibleMoves(safeMoves);
  };

  private checkMates = (board: Map<SquareString, PieceMapElement>) => {
    const opositeColor = this.color === 'w' ? 'b' : 'w';
    const boardSetup = [...board];

    for (const [square, piece] of boardSetup) {
      if (piece.color === opositeColor) {
        const moves = this.getMoves(square, piece.figure, opositeColor, board);
        const viableMoves = this.ensureKingSafety(moves, opositeColor, board);
        if (viableMoves.length > 0) return 'nomate';
      }
    }
    const check = this.kingInCheck(board, opositeColor);
    return check ? 'mate' : 'stelmate';
  };

  public makeMove: MakeMoveFT = ({ origin, destination }) => {
    const possibleMove = this.possibleMoves.find((m) => m.destination === destination);
    if (!possibleMove) return;
    const boardCoppy = new Map(this.board);
    const movedPiece = boardCoppy.get(origin);
    if (!movedPiece) return;
    if (possibleMove.type === 'promotion') {
      boardCoppy.set(destination, { ...movedPiece, figure: 'q' });
      boardCoppy.delete(origin);
    } else if (possibleMove.type === 'enpassant') {
      const captured = possibleMove.passedPawn as SquareString;
      boardCoppy.delete(captured);
      boardCoppy.delete(origin);
    } else if (possibleMove.type === 'castle') {
      const rookSquare = possibleMove.movedRook as SquareString;
      const rookDestination = possibleMove.rookDestination as SquareString;
      const rook = boardCoppy.get(rookSquare) as Piece;
      boardCoppy.set(rookDestination, rook);
      boardCoppy.set(possibleMove.destination, {
        ...movedPiece,
        canLongCastle: false,
        canShortCastle: false,
      });
      boardCoppy.delete(rookSquare);
      boardCoppy.delete(origin);
    } else {
      boardCoppy.set(destination, movedPiece);
      //check if moved piece is a king or rook to disable future castle options
      if (movedPiece.figure === 'k') {
        boardCoppy.set(destination, { ...movedPiece, canLongCastle: false, canShortCastle: false });
      } else if (movedPiece.figure === 'r') {
        const [originX, originY] = getCords(origin);
        if (
          (movedPiece.color === 'w' && originX === 0 && originY === 0) ||
          (movedPiece.color === 'b' && originX === 0 && originY === boardSize - 1)
        ) {
          boardCoppy.set(destination, { ...movedPiece, canShortCastle: false });
        } else if (
          (movedPiece.color === 'w' && originX === boardSize - 1 && originY === 0) ||
          (movedPiece.color === 'b' && originX === boardSize - 1 && originY === boardSize - 1)
        ) {
          boardCoppy.set(destination, { ...movedPiece, canLongCastle: false });
        } else {
          boardCoppy.set(destination, movedPiece);
        }
      } else {
        boardCoppy.set(destination, movedPiece);
      }
      boardCoppy.delete(origin);
    }

    // set ocasional moves like enpasant
    let createdEnPasants: OcasionalMove[] = [];
    if (movedPiece.figure === 'p') {
      const [originX, originY] = getCords(origin);
      const [destinationX, destinationY] = getCords(destination);
      if (Math.abs(destinationY - originY) === 2) {
        let potentialEnemyPassedPawns: [number, number][];
        switch (originX) {
          case 0:
            potentialEnemyPassedPawns = [[originX + 1, destinationY]];
            break;
          case boardSize - 1:
            potentialEnemyPassedPawns = [[originX - 1, destinationY]];
            break;
          default:
            potentialEnemyPassedPawns = [
              [originX + 1, destinationY],
              [originX - 1, destinationY],
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
              destination: enPasantCaputureDestinaiton,
              type: 'enpassant',
              passedPawn: destination,
            });
          }
        });
      }
    }
    this.setOcasionalMoves([...createdEnPasants]);
    this.setBoard(boardCoppy);
    this.setColor(this.color === 'w' ? 'b' : 'w');
    this.setPossibleMoves([]);
  };
}
