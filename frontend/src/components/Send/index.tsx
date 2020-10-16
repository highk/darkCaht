import React, {
  useContext,
  useState,
  useEffect,
  useReducer,
  useCallback,
  useRef,
} from "react";
import * as S from "./style";
import { SocketContext } from "../Socket/socket";
import Giphy from "./Giphy";

type State = {
  message: string;
  subMessage: string;
  name: string;
  connected: boolean;
  isCommandView: boolean;
  isGiphyView: boolean;
  isDisable: boolean;
};

type Action =
  | { type: "CHANGE_INPUT"; payload: any }
  | { type: "CLEAR_MESSAGE_INPUT" }
  | { type: "SOCKET_CONNECT" }
  | { type: "SOCKET_DISCONNECT" }
  | { type: "CHANGE_DISABLE"; payload: boolean }
  | { type: "COMMANDVIEW_HIDE" };

const initialState = {
  message: "",
  subMessage: "",
  name: "익명",
  connected: false,
  isCommandView: false,
  isGiphyView: false,
  isDisable: true,
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return { ...state, ...action.payload };
    case "CLEAR_MESSAGE_INPUT":
      return {
        ...state,
        message: "",
        keyword: "",
        isCommandView: false,
        isGiphyView: false,
      };
    case "SOCKET_CONNECT":
      return { ...state, connected: true };
    case "SOCKET_DISCONNECT":
      return { ...state, connected: false };
    case "COMMANDVIEW_HIDE":
      return { ...state, isCommandView: false };
    case "CHANGE_DISABLE":
      return { ...state, isDisable: action.payload };
  }
};

const Send: React.FC = () => {
  const socket = useContext<SocketIOClient.Socket>(SocketContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    message,
    subMessage,
    name,
    connected,
    isCommandView,
    isGiphyView,
    isDisable,
  } = state;

  const messageInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const eTarget = e.currentTarget;
    if (eTarget.name === "message") {
      dispatch({
        type: "CHANGE_INPUT",
        payload: {
          [eTarget.name]: eTarget.value,
          isCommandView: eTarget.value[0] === "/" && !isGiphyView,
          isGiphyView: eTarget.value.slice(0, 4) === "/gif",
        },
      });
    } else {
      dispatch({
        type: "CHANGE_INPUT",
        payload: { [eTarget.name]: eTarget.value },
      });
    }
  };

  const handleGif = (url: string) => {
    console.log(url);
    if (isDisable) return;
    if (name === "") {
      alert("Name is Empty!");
      return;
    }

    const data: any = { name, body: "/img " + url, type: "image" };

    socket.emit("message", data);

    dispatch({
      type: "CLEAR_MESSAGE_INPUT",
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isDisable) return;
    if (name === "") {
      alert("Name is Empty!");
      return;
    }

    const data: any = { name, body: message };

    if (message.slice(0, 5) === "/img ") {
      data.type = "image";
    } else if (message.slice(0, 5) === "/time") {
      data.type = "time";
    } else if (message.slice(0, 6) === "/clear") {
      data.type = "clear";
    } else {
      data.body += subMessage;
    }

    socket.emit("message", data);

    dispatch({
      type: "CLEAR_MESSAGE_INPUT",
    });
  };

  const socketMessage = useCallback((data) => {
    switch (data) {
      case "SOCKET_CONNECT":
        dispatch({
          type: "SOCKET_CONNECT",
        });
        return;

      case "SOCKET_DISCONNECT":
        dispatch({
          type: "SOCKET_DISCONNECT",
        });
        return;
    }
  }, []);

  const disConnectSocket = useCallback(() => {
    socketMessage("SOCKET_DISCONNECT");
  }, [socketMessage]);

  useEffect(() => {
    socket.on("sysMessage", socketMessage);
    socket.on("disconnect", disConnectSocket);
    return () => {
      socket.off("sysMessage", socketMessage);
      socket.off("disconnect", disConnectSocket);
    };
  }, [socket, socketMessage, disConnectSocket]);

  useEffect(() => {
    dispatch({
      type: "CHANGE_DISABLE",
      payload: !connected || message.length === 0,
    });
  }, [connected, message.length]);

  useEffect(() => {
    if (isGiphyView)
      dispatch({
        type: "COMMANDVIEW_HIDE",
      });
  }, [isGiphyView]);

  return (
    <S.SendWrapper>
      {isCommandView && (
        <S.CommandLines
          offY={
            messageInputRef.current.offsetHeight +
            messageInputRef.current.offsetTop
          }
          offX={messageInputRef.current.offsetLeft}
        >
          <div>/img [link]</div>
          <div>/time</div>
          <div>/clear</div>
          <div>/gif</div>
        </S.CommandLines>
      )}

      {isGiphyView && <Giphy handleGif={handleGif} />}
      <form onSubmit={handleSubmit}>
        <S.SendInput
          name="message"
          placeholder={connected ? "대화를 입력..." : "연결 끊김..."}
          onChange={handleChange}
          value={message}
          disabled={!connected}
          autoComplete="off"
          ref={messageInputRef}
          onBlur={() => dispatch({ type: "COMMANDVIEW_HIDE" })}
        />
        <S.SendButton type="submit" disabled={isDisable}>
          Send
        </S.SendButton>
      </form>

      <S.SubWrapper>
        <S.SendSubInput
          name="name"
          placeholder="닉네임 임력..."
          onChange={handleChange}
          value={name}
        />
        <S.SendSubInput
          name="subMessage"
          placeholder="붙임말 임력..."
          onChange={handleChange}
          value={subMessage}
          autoComplete="off"
        />
      </S.SubWrapper>
    </S.SendWrapper>
  );
};

export default Send;
