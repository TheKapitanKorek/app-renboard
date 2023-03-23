'use client';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { useEffect } from 'react';
import {
  FaChessPawn,
  FaChessBishop,
  FaChessKnight,
  FaChessRook,
  FaChessQueen,
  FaChessKing,
} from 'react-icons/fa';

interface ChessPieceInterface {
  position: string;
  playerColor: string;
  extra?: {};
}

export const Bishop = ({
  position,
  playerColor,
  extra,
}: ChessPieceInterface): JSX.Element => {
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(({ down, movement: [mx, my] }) => {
    api.start({ x: down ? mx : 0, y: down ? my : 0, immediate: down });
  });

  return <animated.div className="piece G4" {...bind()} style={{ x, y }} />;
};
