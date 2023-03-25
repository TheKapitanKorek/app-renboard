'use client';
import { useSpring, animated } from '@react-spring/web';
import { useDrag, useGesture } from '@use-gesture/react';
import Image from 'next/image';

interface ChessPieceInterface {
  position: string;
  figure: string;
  color: string;
  extra?: {};
}

export const Piece = ({
  position,
  figure,
  color,
  extra,
}: ChessPieceInterface): JSX.Element => {
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
  // Set the drag hook and define component movement based on gesture data
  const bind = useGesture({
    onDrag: ({ down, movement: [mx, my] }) =>
      api.start({ x: down ? mx : 0, y: down ? my : 0, immediate: down }),
  });

  return (
    <animated.div
      {...bind()}
      className={`piece ${position}`}
      style={{ x, y, touchAction: 'none' }}
      onClick={() => {
        console.log('heyeeee');
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
  position,
  type,
}: {
  origin: string;
  position: string;
  type: string;
}) => {
  return (
    <div
      className={`move-hint ${position}`}
      onMouseUp={() => {
        console.log('fadas');
      }}
    >
      <div className={`${type}-mark`}></div>
    </div>
  );
};
