'use client';
/* c8 ignore start */
import { useRef, useState } from 'react';
import { Piece, MoveHint } from '@/app/components/ChessPieces';
import { SquareString } from '@/app/constants';
import { Game } from '@/app/methods/game';
import { PieceMapElement, PossibleMove, OcasionalMove, Color } from '@/app/methods/game/interfaces';
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
    new Map<SquareString, PieceMapElement>([
      ['B4', { figure: 'p', color: 'b' }],
      ['B3', { figure: 'p', color: 'w' }],
      ['A4', { figure: 'p', color: 'b' }],
      ['C2', { figure: 'p', color: 'w' }],
      ['D4', { figure: 'p', color: 'b' }],
      ['D3', { figure: 'k', color: 'w' }],
      ['D5', { figure: 'k', color: 'b' }],
      ['D8', { figure: 'n', color: 'b' }],
      ['A1', { figure: 'n', color: 'w' }],
      ['A2', { figure: 'n', color: 'w' }],
      ['A3', { figure: 'b', color: 'w' }],
      ['G5', { figure: 'b', color: 'w' }],
      ['B8', { figure: 'r', color: 'b' }],
      ['C7', { figure: 'q', color: 'w' }],
      ['G1', { figure: 'r', color: 'b' }],
      ['H5', { figure: 'r', color: 'w' }],
    ])
  );
  const [playerColor, setPlayerColor] = useState<Color>('w');
  const [possibleMoves, setPossibleMoves] = useState<PossibleMove[]>([]);
  const [ocasionalMoves, setOcasionalMoves] = useState<OcasionalMove[]>([]);

  const game = new Game(
    board,
    setBoard,
    possibleMoves,
    setPossibleMoves,
    ocasionalMoves,
    setOcasionalMoves,
    playerColor,
    setPlayerColor
  );

  const renderMoves = (moves: PossibleMove[]) => {
    return moves.map((move) => (
      <MoveHint
        key={move.origin + '>' + move.destination}
        origin={move.origin}
        destination={move.destination}
        type={move.type === 'capture' ? 'capture' : 'move'}
        makeMove={game.makeMove}
      />
    ));
  };

  const renderGame = (board: Map<SquareString, PieceMapElement>) => {
    return [...board].map(([position, { color, figure }]) => (
      <Piece
        position={position}
        color={color}
        figure={figure}
        boardRef={chessboardRef}
        ownPiece={color === playerColor}
        makeMove={game.makeMove}
        calcPossibleMoves={game.setMoves}
        key={color + figure + position}
      />
    ));
  };

  return (
    <div className="w-max mx-5 flex-col basis-2/3 items-center" data-testid="chess-board">
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
