import { AiFillThunderbolt } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";

interface ButtonInterface {
  onClick?: () => {};
  children: string;
}

export const Button = ({ onClick, children }: ButtonInterface): JSX.Element => {
  return (
    <button
      onClick={onClick}
      className="w-1/3 lg:w-1/4 rounded-md border-2 border-onyx hover:bg-onyx hover:text-skin justify-center items-center"
    >
      {children}
    </button>
  );
};

export const ButtonPrimary = ({
  onClick,
  children,
}: ButtonInterface): JSX.Element => {
  return (
    <button
      onClick={onClick}
      className="flex flex-row rounded-md border-box font-bold my-2 p-1 border-2 border-deepgreen hover:bg-deepgreen  text-deepgreen hover:text-skin justify-center items-center relative"
    >
      {children}
    </button>
  );
};
