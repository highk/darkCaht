import styled from "styled-components";

export const MainWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

export const TopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 400px;
  text-align: center;
`;

export const ChatWrapper = styled.div`
  width: 100%;
  border: 2px solid ${(props) => props.theme.message};
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

