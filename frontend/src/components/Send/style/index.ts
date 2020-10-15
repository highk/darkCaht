import styled from "styled-components";

export const SendInput = styled.input`
  width: calc(100% - 20px);
  height: 100%;
  border: 2px solid ${(props) => props.theme.message};
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.message};
  padding: 10px;
  border-radius: 0;
`;

export const SendSubInput = styled(SendInput)`
  width: 200px;
`;

export const SubWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

interface ButtonProps {
  readonly disabled: boolean;
}

export const SendButton = styled.button<ButtonProps>`
  width: 60px;
  height: 100%;
  color: white;
  background: ${({ theme }) => (props) =>
    !props.disabled ? theme.activeButton : theme.disabledButton};

  border: none;
`;

export const SendWrapper = styled.div`
  > form {
    display: flex;
    width: 100%;
    height: 40px;
  }
  margin: 20px 0;
`;

interface PositionProps {
  offY?: number;
  offX?: number;
}

export const CommandLines = styled.div<PositionProps>`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: ${(props) => props.offY}px;
  left: ${(props) => props.offX}px;

  width: 300px;
  height: 150px;
  color: ${props => props.theme.message};
  background: ${props => props.theme.background};
  box-shadow: 5px 5px 1px rgba(0, 0, 0, 0.7);

  > div {
    display: flex;
    justify-content: center;
    /* align-items: center; */
    width: 100%;
    height: 30px;
  }
`;

export const GiphyWrapper = styled.div`
  max-height: 600px;
  overflow-y: scroll;
`