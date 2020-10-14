import styled from "styled-components";

export const ThemeWrapper = styled.div`
  h1 {
  }
  > div {
    display: flex;
    width: 200px;
    justify-content: space-around;
  }
`;

interface Props {
  bgColor: string;
  isSelect: boolean;
}

export const Colors = styled.div<Props>`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  border: 2px solid
    ${(props) => (props.isSelect ? "rgba(0, 0, 0, 0.1)" : "black")};
  background: ${(props) => props.bgColor};
`;
