import React, {
  useEffect,
  useContext,
  useRef,
  useCallback,
  createElement,
} from "react";
import * as S from "./style";
import { ChatMessage } from "../Socket/types";
import { SocketContext } from "../Socket/socket";

const regexp = /(http[s]{0,1}:\/\/\w+\S+|\w+\.\w+\.\S+)/g;

const UrlParse = (str: any) => {
  const match: any = str.match(regexp);
  if (match === null) return str;

  const matches: any = str.matchAll(regexp);
  let newNodes = [];

  const parseUrls = [];
  for (const url of matches) {
    parseUrls.push(url);
  }

  for (let x = 0; x < parseUrls.length; x++) {
    newNodes.push(
      <React.Fragment>
        {str.slice(0, parseUrls[x]["index"])}
        {createElement(
          "a",
          {
            target: "_blank",
            href: `${
              parseUrls[x][0].match("http")
                ? parseUrls[x][0]
                : "http://" + parseUrls[x][0]
            }`,
          },
          parseUrls[x][0]
        )}
      </React.Fragment>
    );
    if (x < parseUrls.length - 1) {
      parseUrls[x + 1]["index"] -=
        parseUrls[x]["index"] + parseUrls[x][0].length;
      str = str.slice(parseUrls[x]["index"] + parseUrls[x][0].length);
    } else {
      newNodes.push(
        <React.Fragment>
          {str.slice(parseUrls[x]["index"] + parseUrls[x][0].length)}
        </React.Fragment>
      );
    }
  }

  return (
    <span>
      {newNodes.map((node, index) => (
        <React.Fragment key={index}>{node}</React.Fragment>
      ))}
    </span>
  );
};

const ChatList: React.FC = () => {
  const socket = useContext<SocketIOClient.Socket>(SocketContext);
  const messagesEndRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const [messages, setMessages] = React.useState<ChatMessage[]>([]);

  const addMessage = useCallback(
    (data: ChatMessage) => {
      setMessages(messages.concat(data));
      if (messagesEndRef && messagesEndRef.current)
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    },
    [messages, messagesEndRef]
  );

  const sysMessage = useCallback(
    (data: any) => {
      setMessages(messages.concat({ name: "[SYSTEM] ", body: data }));
      if (messagesEndRef && messagesEndRef.current)
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    },
    [messages, messagesEndRef]
  );

  const commandMessage = useCallback((data: any) => {
    switch (data.type) {
      case "clear":
        setMessages([]);
        break;
      default:
        return;
    }
  }, []);

  useEffect(() => {
    socket.on("message", addMessage);
    socket.on("sysMessage", sysMessage);
    socket.on("command", commandMessage);
    return () => {
      socket.off("message", addMessage);
      socket.off("sysMessage", sysMessage);
      socket.off("command", commandMessage);
    };
  }, [socket, addMessage, sysMessage, commandMessage]);

  return (
    <React.Fragment>
      {messages.map(({ name, body, type }: ChatMessage, index: number) => {
        if (type === "image") {
          return (
            <S.ChatMessage ref={messagesEndRef} key={index}>
              <span>{name} : </span>
              <img
                src={body}
                style={{ maxHeight: "300px", maxWidth: "560px" }}
                alt="chatImage"
              />
            </S.ChatMessage>
          );
        }

        return (
          <S.ChatMessage ref={messagesEndRef} key={index}>
            <span>{name} :&nbsp;</span>
            {UrlParse(body)}
          </S.ChatMessage>
        );
      })}
    </React.Fragment>
  );
};
export default ChatList;
