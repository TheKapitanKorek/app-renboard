import { MdKeyboardArrowDown } from "react-icons/md";
import { AiFillThunderbolt } from "react-icons/ai";
import { FaChessPawn } from "react-icons/fa";
import { SlMagicWand } from "react-icons/sl";
import { GiMagicShield } from "react-icons/gi";

import "./styles.module.css";
import { Button, ButtonPrimary } from "../Buttons";

export const ConfigurationPanel = () => {
  return (
    <div className="bg-skin text-onyx basis-1/3 m-4 mr-8 rounded-md p-4 flex flex-col justify-between">
      <button
        type="button"
        className="flex flex-row rounded-md border-box border-2 p-1 border-onyx hover:bg-onyx hover:text-skin justify-center items-center relative"
      >
        <AiFillThunderbolt size={20} />
        <p className="ml-2">3 min</p>
        <MdKeyboardArrowDown
          size={30}
          className="hidden lg:flex position absolute right-1"
        />
      </button>
      <div className="expandable-select">
        <h2 className="flex flex-row items-center border-b-2 my-2 border-onyx">
          Normal <FaChessPawn className="ml-2" />
        </h2>
        <ul className="flex flex-row justify-between my-2">
          <Button>3 min</Button>
          <Button>10 min</Button>
          <Button>30 min</Button>
        </ul>
        <h2 className="flex flex-row items-center border-b-2 my-2 border-onyx">
          Magic <SlMagicWand className="ml-2" />
        </h2>
        <ul className="flex flex-row justify-between my-2">
          <Button>3 min</Button>
          <Button>10 min</Button>
          <Button>30 min</Button>
        </ul>
        <h2 className="flex flex-row items-center border-b-2 my-2 border-onyx">
          Epic Draft <GiMagicShield className="ml-2" />
        </h2>
        <ul className="flex flex-row justify-between my-2">
          <Button>3 min</Button>
          <Button>10 min</Button>
          <Button>30 min</Button>
        </ul>
      </div>
      <ButtonPrimary>Play</ButtonPrimary>
      <ButtonPrimary>Play Friend</ButtonPrimary>
    </div>
  );
};
