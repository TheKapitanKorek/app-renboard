'use client';
import { useSpring, animated } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import { RefObject, useRef, useState } from 'react';
import Image from 'next/image';

import { cordToLetterMap } from '@/app/constants';

export type calcPossibleMovesFT = (position: string) => void;

export type makeMoveFT = ({
  origin,
  direction,
  type,
}: {
  origin: string;
  direction: string;
  type?: string;
}) => void;

export interface PieceInterface {
  position: string;
  figure: string;
  color: string;
  boardRef: RefObject<HTMLDivElement>;
  extra?: {};
  ownPiece: boolean;
  calcPossibleMoves: calcPossibleMovesFT;
  makeMove: makeMoveFT;
  key: string;
}

export interface MoveHintInterface {
  origin: string;
  direction: string;
  type: string;
  makeMove: makeMoveFT;
}

export const Piece = ({
  position,
  figure,
  color,
  boardRef,
  extra,
  ownPiece,
  calcPossibleMoves,
  makeMove,
}: PieceInterface): JSX.Element => {
  const ref = useRef(null) as RefObject<HTMLDivElement>;
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
  const [offset, setOffset] = useState({ x: 0, y: 0 }); //x,y,square-side

  const onTap = (event: any) => {
    if (!ownPiece) return;
    const rect = ref.current!.getBoundingClientRect();
    const offsetY = event.pageY - (rect.y + rect.height / 2);
    const offsetX = event.pageX - (rect.x + rect.width / 2);

    setOffset({
      x: offsetX,
      y: offsetY,
    });
    api.start({
      x: offsetX,
      y: offsetY,
      immediate: true,
    });
    calcPossibleMoves(position);
  };
  const onRelese = () => {
    api.start({
      x: 0,
      y: 0,
      immediate: true,
    });
  };

  const bind = useGesture({
    onDrag: ({ down, movement: [mx, my], event }) => {
      if (!ownPiece) return;
      api.start({
        x: down ? mx + offset.x : 0,
        y: down ? my + offset.y : 0,
        immediate: down,
      });
    },
    onDragEnd: ({ event }) => {
      if (!ownPiece) return;
      const rect = ref.current!.getBoundingClientRect();
      const boardRect = boardRef.current!.getBoundingClientRect();
      console.log(boardRef);
      console.log(event);
      const { pageX, pageY } = event as MouseEvent;

      if (
        pageX > boardRect.left &&
        pageX < boardRect.right &&
        pageY > boardRect.top &&
        pageY < boardRect.bottom
      ) {
        let xCord, yCord;
        if (color === 'w') {
          xCord = Math.floor((pageX - boardRect.left) / rect.width);
          yCord = 7 - Math.floor((pageY - boardRect.top) / rect.height);
        } else {
          xCord = 7 - Math.floor((pageX - boardRect.left) / rect.width);
          yCord = Math.floor((pageY - boardRect.top) / rect.height);
        }
        // @ts-ignore
        const square = cordToLetterMap[xCord] + (yCord + 1);

        makeMove({ origin: position, direction: square });
      }
    },
  });

  return (
    <animated.div
      {...bind()}
      ref={ref}
      className={`piece ${position} ${ownPiece ? ' own-piece' : ''}`}
      style={{ x, y, touchAction: 'none' }}
      onMouseDown={onTap}
      onMouseUp={onRelese}
      onTouchStart={() => {
        calcPossibleMoves(position);
      }}
    >
      <Image
        src={`/${color}${figure}.png`}
        alt="figure image"
        width={150}
        height={150}
        style={{ objectFit: 'cover' }}
        draggable={false}
      />
    </animated.div>
  );
};

export const MoveHint = ({
  origin,
  direction,
  type,
  makeMove,
}: MoveHintInterface) => {
  return (
    <div
      className={`move-hint ${direction}`}
      onClick={() => {
        makeMove({ origin, direction, type });
      }}
    >
      <div className={`${type}-mark`}></div>
    </div>
  );
};
