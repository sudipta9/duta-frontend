import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`
    body: {
        min-height: 100vh;
    }
    ::-webkit-scrollbar {
    width: 5px;
    }

    ::-webkit-scrollbar-track {
    /* width: 5px;
    background: #f5f5f5; */
    }

    ::-webkit-scrollbar-thumb {
    /* width: 1em;
    background-color: #ddd;
    outline: 1px solid slategrey;
    border-radius: 1rem; */
    }
    .messages-box,
    .chat-box {
    height: 510px;
    overflow-y: scroll;
    }
`;
export default GlobalStyle;
