interface ButtonInterface {
  onClick?: () => {};
  children: string;
}

interface RadioButtonInterface {
  name?: string;
  id: string;
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

export const StyledRadioButton = ({ id, name, children }: RadioButtonInterface): JSX.Element => {
  return (
    <>
      <input type="radio" id={id} name={name} className="invisible-radio" />
      <label
        htmlFor={id}
        className="flex w-1/4 sm:w-1/3 lg:w-1/4 rounded-md border-2 border-onyx hover:bg-onyx hover:text-skin justify-center items-center cursor-pointer"
      >
        {children}
      </label>
    </>
  );
};

export const ButtonPrimary = ({ onClick, children }: ButtonInterface): JSX.Element => {
  return (
    <button
      onClick={onClick}
      className="flex flex-row rounded-md border-box font-bold my-2 p-1 border-2 bg-darkerskin hover:bg-deepgreen hover:text-lightblue text-skin justify-center items-center relative"
    >
      {children}
    </button>
  );
};
