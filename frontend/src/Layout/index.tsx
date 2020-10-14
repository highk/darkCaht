import React from "react";
import * as S from "./style";
import ChatList from "../components/ChatList";
import Send from "../components/Send";
import Colors from "../components/Colors";

const Layouts: React.FC = () => {
  return (
    <S.MainWrapper>
      <S.TopWrapper>
        <h1>dark Chat</h1>
        <p>Anonymous darkest chat</p>
      </S.TopWrapper>
      <S.ChatWrapper>
        <S.ChatBlock>
          <ChatList />
        </S.ChatBlock>
      </S.ChatWrapper>
      <Send />
      <Colors />
    </S.MainWrapper>
  );
};

export default Layouts;
