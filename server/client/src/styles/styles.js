import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`


  *,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
  body {
    margin:0;
    padding: 0;
   
   overflow-x: hidden;
   letter-spacing:.5px ;
   font-family: 'Inter', sans-serif;
   background: ${({ theme }) => theme.main_bg};
   
  }

  body::-webkit-scrollbar {
  width: 3px;               /* width of the entire scrollbar */
}

body::-webkit-scrollbar-track {
  background: #6c62e2;        /* color of the tracking area */
}

body::-webkit-scrollbar-thumb {
  background-color: blue;    /* color of the scroll thumb */
  border-radius: 20px;       /* roundness of the scroll thumb */
  border: 3px solid blue;  /* creates padding around scroll thumb */
}

  html, body{
    height: 100%;
  }
  
  ul {
  margin: 0;
  padding: 0;

}

li{
  list-style: none;
}

a{
  text-decoration: none;
  color: inherit;
}
button{
  border: none;
  outline: none;
  background:none ;
}





`;
