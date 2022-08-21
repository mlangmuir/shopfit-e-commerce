import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        font-family: 'League Spartan', sans-serif;
        font-weight: 400;
    }
    
    button {
        background-color: #0c1e4f;
    }
`;

export default GlobalStyle;