"use client";
import { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaChessPawn } from "react-icons/fa";
import { SlMagicWand } from "react-icons/sl";
import { GiMagicShield } from "react-icons/gi";

import { ButtonPrimary, StyledRadioButton } from "../../../components/Buttons";
import { LoadingMessageBox } from "../../../components/LoadingGameBox";

import { trpc } from "@/utils/trpc";
import { WebSocketEvents } from "vitest";

interface GameMode {
  time: `${number}_min`;
  mode: "normal" | "magic" | "epic";
}

export const ConfigurationPanel = () => {
  const [websocket, setWebsocket] = useState(null);
  const [room, setRoom] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [gameMode, setGameMode]: [GameMode, Function] = useState({
    time: "3_min",
    mode: "normal",
  });
  const gameModesIconMap = {
    normal: FaChessPawn,
    magic: SlMagicWand,
    epic: GiMagicShield,
  };
  const GameIcon = gameModesIconMap[gameMode.mode];

  const createRoom = trpc.createRoom.useMutation(); 

  useEffect(()=>{
    const ws = new WebSocket('ws://localhost:3001');
    ws.onmessage = (event)=>{
      console.log('some message', event.data);
    }
    setWebsocket(ws);
  },[])

  const createGame = async (e:React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      const response = await createRoom.mutateAsync({userId: 'user1', playFriend: false});
      console.log(response);
      const object = {type:'join', params:{roomId:response.roomId, senderId:'11111'}};
      websocket.send(JSON.stringify(object));
      console.log('join message sent');
  }


  return (
    <form className="bg-skin text-onyx basis-1/3 sm:mr-8 rounded-md p-4 flex flex-col justify-start sm:h-[60vw] md:h-[85vh] w-full">
      <button
        type="button"
        className="flex flex-row rounded-md border-box border-2 p-1 border-onyx hover:bg-onyx hover:text-skin justify-center items-center relative"
        onClick={() => {
          setExpanded(!expanded);
        }}
        data-testid="mode-select-button"
      >
        <GameIcon size={20} />
        <p className="ml-2">{gameMode.time.replace("_", " ")}</p>
        <MdKeyboardArrowDown
          size={30}
          className={`flex sm:hidden lg:flex position absolute right-1${expanded ? " rotate-180" : ""
            }`}
        />
      </button>
      <fieldset
        role="radiogroup"
        className={`expandable-select${expanded ? "" : " hidden"}`}
        onChange={(e) => {
          const target = e.target as HTMLFieldSetElement;
          const [time, mode] = target.id.split("-");
          setExpanded(false);
          setGameMode({ time, mode });
        }}
        data-testid="config-panel"
      >
        <h2 className="flex flex-row items-center border-b-2 my-2 border-onyx">
          Normal <FaChessPawn className="ml-2" />
        </h2>
        <div className="flex flex-row justify-between my-2">
          <StyledRadioButton id="3_min-normal" name="gametype">
            3 min
          </StyledRadioButton>
          <StyledRadioButton id="10_min-normal" name="gametype">
            10 min
          </StyledRadioButton>
          <StyledRadioButton id="30_min-normal" name="gametype">
            30 min
          </StyledRadioButton>
        </div>
        <h2 className="flex flex-row items-center border-b-2 my-2 border-onyx">
          Magic <SlMagicWand className="ml-2" />
        </h2>
        <ul className="flex flex-row justify-between my-2">
          <StyledRadioButton id="3_min-magic" name="gametype">
            3 min
          </StyledRadioButton>
          <StyledRadioButton id="10_min-magic" name="gametype">
            10 min
          </StyledRadioButton>
          <StyledRadioButton id="30_min-magic" name="gametype">
            30 min
          </StyledRadioButton>
        </ul>
        <h2 className="flex flex-row items-center border-b-2 my-2 border-onyx">
          Epic Draft <GiMagicShield className="ml-2" />
        </h2>
        <ul className="flex flex-row justify-between my-2">
          <StyledRadioButton id="30_min-epic" name="gametype">
            3 min
          </StyledRadioButton>
          <StyledRadioButton id="10_min-epic" name="gametype">
            10 min
          </StyledRadioButton>
          <StyledRadioButton id="30_min-epic" name="gametype">
            30 min
          </StyledRadioButton>
        </ul>
      </fieldset>
      <div className="flex flex-col mt-auto">
        <ButtonPrimary
        onClick={createGame}
        >
          Play
        </ButtonPrimary>
        <LoadingMessageBox message="Searching for a worthy oponent" />
        <ButtonPrimary>Play Friend</ButtonPrimary>
      </div>
      <LoadingMessageBox
        message="Share this link with your friend"
        link="https://www.linko.com/fojabsdfouasbofasdofasodufhoash"
      />
    </form>
  );
};
