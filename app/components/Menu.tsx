import Link from "next/link";
import React, { FC } from "react";
import { FaChessKing, FaChessPawn, FaUserFriends } from "react-icons/fa";
import { GiLetterBomb, GiCog } from "react-icons/gi";
import { BsPersonVcard } from "react-icons/bs";
import { HiDotsHorizontal } from "react-icons/hi";

export const Menu: FC = () => {
  return (
    <div className="flex grow-0 flex-col h-screen border-solid border-r-4 border-skin w-12 md:w-64 text-skin fixed">
      <div className="flex items-end p-2 py-8 md:p-4 text-deepgreen bg-skin">
        <FaChessKing size={40} />
        <p className="text-2xl ml-2 hidden md:flex"> Ren Board</p>
      </div>
      <ul className="menu-list">
        <li>
          <Link href="/play">
            <FaChessPawn size={30} />
            <p>Play</p>
          </Link>
        </li>
        <li>
          <Link href="/user">
            <BsPersonVcard size={30} />
            <p>Profile</p>
          </Link>
        </li>
        <li>
          <Link href="social/friends">
            <FaUserFriends size={30} />
            <p>Friends</p>
          </Link>
        </li>
        <li>
          <Link href="/">
            <HiDotsHorizontal size={30} />
            <p>More</p>
          </Link>
        </li>
      </ul>
      <ul className="lower-menu mb-4">
        <li>
          <Link href="/">
            <GiLetterBomb size={30} />
            <p>Settings</p>
          </Link>
        </li>
        <li>
          <Link href="/">
            <GiCog size={30} />
            <p>Contact</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};
