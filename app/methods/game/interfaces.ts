import { Piece } from '@/app/components/ChessPieces';
import { SquareString } from '@/app/constants';
import { RefObject } from 'react';

export type Color = 'w' | 'b';

export type Figure = 'p' | 'k' | 'q' | 'n' | 'b' | 'r';

export type MoveType = 'move' | 'capture' | 'enpassant' | 'promotion' | 'castle';

export type VectorArray = [number, number][];

export interface Piece {
  figure: Figure;
  color: 'w' | 'b';
}

export interface King extends Piece {
  canLongCastle: boolean;
  canShortCastle: boolean;
}

export type PieceMapElement = Piece | King;

export interface PossibleMove {
  origin: SquareString;
  destination: SquareString;
  type: MoveType;
  passedPawn?: SquareString;
  movedRook?: SquareString;
  rookDestination?: SquareString;
}

export type OcasionalMove = PossibleMove;

export type CalcPossibleMovesFT = (position: SquareString, figure: Figure) => void;

export type MakeMoveFT = ({
  origin,
  destination,
  type,
}: {
  origin: SquareString;
  destination: SquareString;
  type?: string;
}) => void;

export interface PieceInterface {
  position: SquareString;
  figure: Figure;
  color: string;
  boardRef: RefObject<HTMLDivElement>;
  extra?: {};
  ownPiece: boolean;
  calcPossibleMoves: CalcPossibleMovesFT;
  makeMove: MakeMoveFT;
  key: string;
}

export interface MoveHintInterface {
  origin: SquareString;
  destination: SquareString;
  type: string;
  makeMove: MakeMoveFT;
}
