'use client';

import { useRef, useState, useLayoutEffect } from 'react';
import { Piece, MoveHint } from '@/app/components/ChessPieces';
import './styles.css';

interface PlayerFieldProps {
  username: string;
  profileImageURL?: string;
  time: number;
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
    <div className="flex flex-row bg-skin my-4 p-2 rounded-md justify-between">
      <div className="flex flex-row">
        <div
          className="mx-2 rounded-md h-8 aspect-square bg-no-repeat bg-cover bg-center"
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

const state = {
  board: {
    B4: { figure: 'p', color: 'b' },
    B3: { figure: 'p', color: 'w' },
    A3: { figure: 'p', color: 'b' },
    C3: { figure: 'p', color: 'w' },
  },
};

const renderGame = (board) => {
  return Object.keys(board).map((position) => (
    <Piece
      position={position}
      color={board[position].color}
      figure={board[position].figure}
    />
  ));
};

const renderMoves = (moves) => {
  return moves.map((move) => (
    <MoveHint origin={move.origin} position={move.direction} type={move.type} />
  ));
};

const calcMoveSet = () => {
  return [{ origin: 'A3', direction: 'A2', type: 'move' }];
};

export const ChessBoard = ({}) => {
  const moves = calcMoveSet();
  const chessboardRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-max mx-5 flex-col basis-2/3 items-center">
      <PlayerField username="player1" time={600} />
      <div id="chess-board" className="black">
        <div id="board">
          {/* chess pieces */}
          {...renderGame(state.board)}
          {/* Extra elements */}
          {...renderMoves(moves)}
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
