import "./styles.css";

export const ChessBoard = ({}) => {
  return (
    <div className="w-max m-5 flex-col basis-2/3 items-center">
      <div className="bg-slate-400 m-4">player 2</div>
      <div id="chess-board" className="black">
        <div id="board">
          <div className="square">1</div>
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
      <div className="bg-slate-400 m-5">player 1</div>
    </div>
  );
};
