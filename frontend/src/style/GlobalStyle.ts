import * as styled from "styled-components";


const GlobalStyle = styled.createGlobalStyle`
  * {
    font-family: "Helvetica Neue";
    box-sizing: border-box;
  }

  body {
    margin: 0;

    background: ${(props) => props.theme.background};
    color: ${(props) => props.theme.message};
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }
`;

export default GlobalStyle;
