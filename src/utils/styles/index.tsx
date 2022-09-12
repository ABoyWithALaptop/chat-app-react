import styled from 'styled-components';
import { PageProps } from './styleTypes';

export const DARK = '#131313';

// export const theme = 
const SIDEBAR_WIDTH = 450;

export const InputField = styled.input`
  background: inherit;
  outline: none;
  border: none;
  color:#fff;
  font-family: 'Inter';
  font-size: 18px;
  width: 100%;
  box-sizing: border-box;
  padding: 0;
  margin: 4px 0;
`

export const InputContainer = styled.div`
  background-color: #131313;
  padding: 12px 16px;
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;

`;

export const InputLabel = styled.label`
  display: block;
  color: #afafaf;
  font-size: 12px;
  font-weight: bold;
  margin: 4px 0;
`;

export const Button = styled.button`
  width: 100%;
  background-color: #2b09ff;
  color: #fff;
  font-family: 'Inter';
  font-weight: 500;
  font-size: 18px;
  padding: 20px 0;
  border: 2px solid #2b09ff;
  border-radius: 10px;
  outline: none;
  box-sizing: border-box;
  transition: background-color 500ms ease;
  transition: border 500ms ease;

  &:hover {
    cursor: pointer;
    background-color: #381afa
  }
  &:focus {
    background-color: #381afa;
    border: 2px solid #ffffff;
  }
`

export const Page = styled.div<PageProps>`
  height: 100%;
  background-color: #1a1a1a;
  display: ${(props) => props.display};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
`

export const ConversationSidebarStyle = styled.aside`
  background-color: #1a1a1a;
  border-right: 1px solid #5454543d;
  width:${SIDEBAR_WIDTH}px ;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
export const ConversationSidebarHeader = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 0 2rem;
  align-items: center;
  background-color: #151515;
  height: 6.5rem;
  border-bottom: 1px solid #5454543d;
  h1 {
    font-weight: 500;
  }
  position: sticky;
  top: 0;
`

export const ConversationChannelPageStyle = styled.div`
  height: 100%;
  margin-left: ${SIDEBAR_WIDTH}px ;
`
export const ConversationSidebarContainer = styled.div`
`

export const ConversationSidebarItem = styled.div`
  display:flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem 2rem;
  border-bottom: 1px solid #5454543d;
  background-color: #151515;

`