import React, { useContext } from "react";
import * as S from "./style";
import { themes, ThemeState, ThemeAction } from "../../style/theme";

const colors = Array.from(Object.keys(themes));

const Themes: React.FC = () => {
  const theme = useContext(ThemeState);
  const setTheme = useContext(ThemeAction);

  const handleClick = (color: string) => {
    setTheme(color);
  };

  return (
    <S.ThemeWrapper>
      <h1>Themes</h1>
      <div>
        {colors.map((color, index) => (
          <S.Colors
            key={index}
            isSelect={color === theme}
            bgColor={color}
            onClick={() => {
              handleClick(color);
            }}
          />
        ))}
      </div>
    </S.ThemeWrapper>
  );
};

export default Themes;
