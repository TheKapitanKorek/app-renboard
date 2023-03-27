'use client';

import { useRef, useState } from 'react';
import {
  Piece,
  PieceInterface,
  MoveHint,
  MoveHintInterface,
  makeMoveFT,
  calcPossibleMovesFT,
} from '@/app/components/ChessPieces';
import { squareString } from '@/app/constants';
import './styles.css';

interface PlayerFieldProps {
  username: string;
  profileImageURL?: string;
  time: number;
}

interface pieceMapElement {
  figure: string;
  color: 'w' | 'b';
}

interface possibleMoveInterface {
  origin: squareString;
  direction: squareString;
  type: 'move' | 'capture';
}

const secondsToClock = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const spareSeconds = seconds - minutes * 60;
  const minutesFrontZero = minutes < 10 ? '0' : '';
  const secondsFrontZero = spareSeconds < 10 ? '0' : '';
  return minutesFrontZero + minutes + ':' + secondsFrontZero + spareSeconds;
};

const PlayerField = ({
  username,
  profileImageURL = 'https://www.cdbradshaw.com/wp-content/uploads/2021/07/generic-avatar.jpg',
  time,
}: PlayerFieldProps): JSX.Element => {
  return (
    <div className="flex flex-row bg-skin my-2 p-1 rounded-md justify-between">
      <div className="flex flex-row">
        <div
          className="mr-2 rounded-md h-8 aspect-square bg-no-repeat bg-cover bg-center"
          style={{ backgroundImage: `url("${profileImageURL}")` }}
        />
        <p className="font-bold text-onyx leading-3">{username}</p>
      </div>
      <div className="bg-cream text-darkerskin font-bold rounded-md flex justify-end align-middle p-1 w-24">
        {secondsToClock(time)}
      </div>
    </div>
  );
};

// GAME ELEMENT
export const ChessBoard = ({}) => {
  const chessboardRef = useRef<HTMLDivElement>(null);
  const [board, setBoard] = useState(
    new Map<squareString, pieceMapElement>([
      ['B4', { figure: 'p', color: 'b' }],
      ['B3', { figure: 'p', color: 'w' }],
      ['A4', { figure: 'p', color: 'b' }],
      ['C3', { figure: 'p', color: 'w' }],
    ])
  );
  const [playerColor, setPlayerColor] = useState<'w' | 'b'>('b');
  const [possibleMoves, setPossibleMoves] = useState<possibleMoveInterface[]>([]);

  const calcPossibleMoves = (piecePosition: string) => {
    //do some heavy calculations TODO
    if (piecePosition === 'A4') {
      setPossibleMoves([
        { origin: 'A4', direction: 'A3', type: 'move' },
        { origin: 'A4', direction: 'B3', type: 'capture' },
      ]);
    } else {
      setPossibleMoves([{ origin: 'B4', direction: 'C3', type: 'capture' }]);
    }
  };

  const makeMove: makeMoveFT = ({ origin, direction, type = 'move' }) => {
    const possibleMove = possibleMoves.find((m) => m.direction === direction);
    if (!possibleMove) return;
    if (!(type === 'move' || type === 'capture')) return;
    const boardCoppy = new Map(board);
    const movedPiece = boardCoppy.get(origin);
    if (!movedPiece) return;
    boardCoppy.set(direction, movedPiece);
    boardCoppy.delete(origin);

    setBoard(boardCoppy);
    setPossibleMoves([]);
  };

  const renderMoves = (moves: possibleMoveInterface[]) => {
    return moves.map((move) => (
      <MoveHint
        origin={move.origin}
        direction={move.direction}
        type={move.type}
        makeMove={makeMove}
      />
    ));
  };

  const renderGame = (board: Map<squareString, pieceMapElement>) => {
    return [...board].map(([position, { color, figure }]) => (
      <Piece
        position={position}
        color={color}
        figure={figure}
        boardRef={chessboardRef}
        ownPiece={color === playerColor}
        makeMove={makeMove}
        calcPossibleMoves={calcPossibleMoves}
        key={color + figure + position}
      />
    ));
  };

  return (
    <div className="w-max mx-5 flex-col basis-2/3 items-center">
      <PlayerField username="player1" time={600} />
      <div id="chess-board" className={playerColor === 'b' ? 'black' : 'white'}>
        <div id="board" ref={chessboardRef}>
          {/* chess pieces */}
          {...renderGame(board)}
          {/* Extra elements */}
          {...renderMoves(possibleMoves)}
        </div>
        <div id="vertical-coordinate">
          <div className="index">1</div>
          <div className="index">2</div>
          <div className="index">3</div>
          <div className="index">4</div>
          <div className="index">5</div>
          <div className="index">6</div>
          <div className="index">7</div>
          <div className="index">8</div>
        </div>
        <div id="horizontal-coordinate">
          <div className="index">a</div>
          <div className="index">b</div>
          <div className="index">c</div>
          <div className="index">d</div>
          <div className="index">e</div>
          <div className="index">f</div>
          <div className="index">g</div>
          <div className="index">h</div>
        </div>
        <div id="corner"></div>
      </div>
      <PlayerField username="player1" time={600} />
    </div>
  );
};
