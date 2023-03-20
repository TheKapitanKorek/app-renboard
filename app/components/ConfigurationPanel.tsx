export const ConfigurationPanel = () => {
  return (
    <div className="bg-skin text-deepgreen basis-1/4 m-4 rounded-md">
      <div className="w-100">
        <button type="button"></button>
        <div>
          <ul>
            <li>3 min</li>
            <li>10 min</li>
            <li>30 min</li>
            <li>custom</li>
          </ul>
        </div>
        <button>play</button>
        <button>play friend</button>
      </div>
    </div>
  );
};
