import { SquareString } from '@/app/constants';
import { RefObject } from 'react';

export type Color = 'w' | 'b';

export type Figure = 'p' | 'k';

export interface PieceMapElement {
  figure: Figure;
  color: 'w' | 'b';
}

export interface PossibleMove {
  origin: SquareString;
  direction: SquareString;
  type: 'move' | 'capture';
}

export type OcasionalMove = PossibleMove;
export type CalcPossibleMovesFT = (position: SquareString, figure: Figure) => void;

export type MakeMoveFT = ({
  origin,
  direction,
  type,
}: {
  origin: SquareString;
  direction: SquareString;
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
  direction: SquareString;
  type: string;
  makeMove: MakeMoveFT;
}
