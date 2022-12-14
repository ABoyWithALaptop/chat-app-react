import styled from "styled-components";
import { InputContainerPageProps, PageProps } from "./styleTypes";

export const DARK = "#131313";

// export const theme =
const SIDEBAR_WIDTH = 450;

export const InputField = styled.input`
  background: inherit;
  outline: none;
  border: none;
  color: #fff;
  font-family: "Inter";
  font-size: 18px;
  width: 100%;
  box-sizing: border-box;
  padding: 0;
  margin: 4px 0;
`;

export const InputContainer = styled.div<InputContainerPageProps>`
  background-color: ${(props) => props.backgroundColor || `#131313`};
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
  font-family: "Inter";
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
    background-color: #381afa;
  }
  &:focus {
    background-color: #381afa;
    border: 2px solid #ffffff;
  }
`;

export const Page = styled.div<PageProps>`
  height: 100%;
  background-color: #1a1a1a;
  display: ${(props) => props.display};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
`;

export const ConversationSidebarStyle = styled.aside`
  background-color: #1a1a1a;
  border-right: 1px solid #5454543d;
  width: ${SIDEBAR_WIDTH}px;
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
  height: 9.9vh;
  border-bottom: 0.1vh solid #5454543d;
  h1 {
    font-weight: 500;
  }
  position: sticky;
  top: 0;
`;

export const ConversationChannelPageStyle = styled.div`
  height: 100vh;
  margin-left: ${SIDEBAR_WIDTH}px;
  background-color: #1f1f1f;
`;
export const ConversationSidebarContainer = styled.div``;

export const ConversationSidebarItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem 2rem;
  border-bottom: 1px solid #5454543d;
  background-color: #151515;
`;

export const OverlayStyle = styled.div`
  height: 100%;
  width: 100%;
  background-color: #0000008a;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;

export const ModalContainerStyle = styled.div`
  background-color: #121212;
  width: 650px;
  border-radius: 10px;
`;

export const ModalHeaderStyle = styled.header`
  width: 100%;
  padding: 0px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 28px;
  box-sizing: border-box;
  & h2 {
    font-weight: 500;
    margin: 0;
  }
`;

export const ModalContentBodyStyle = styled.div`
  padding: 18px;
`;

export const TextFieldStyle = styled.textarea`
  background: inherit;
  outline: none;
  border: none;
  color: #fff;
  font-family: "Inter";
  font-size: 18px;
  width: 100%;
  box-sizing: border-box;
  padding: 0;
  margin: 4px 0;
  resize: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const MessagePanelStyle = styled.div`
  background: inherit;
  height: 90vh;
  display: flex;
  flex-direction: column;
  padding: 24px;
  box-sizing: border-box;
  position: relative;
`;

export const MessageContainerStyle = styled.div`
  height: 100%;
  /* border: 1px solid #ffff; */
  box-sizing: border-box;
  padding-left: 12px;
  display: flex;
  /* justify-content: flex-end; */
  flex-direction: column-reverse;
  overflow-y: scroll;
  :first-child {
    margin-top: auto !important;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const MessageInputContainerStyle = styled.div`
  box-sizing: border-box;
  /* padding: 32px; */
  margin-top: 32px;
  background-color: #101010;
  border-radius: 5px;
`;

export const MessageInputFieldStyle = styled.textarea`
  background-color: inherit;
  outline: none;
  border: none;
  margin: 24px 0;
  padding-inline: 32px;
  color: #949494;
  font-family: "Inter";
  font-size: 18px;
  resize: none;
  width: 100%;
  box-sizing: border-box;
  ::-webkit-scrollbar {
    display: none;
  }
  height: 100px;
`;

export const MessageItemContainerStyle = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 5px 0;
  /* width: 1000px; */
  &.author {
    .name {
      color: #fff;
    }
    /* float: right; */
    /* flex-direction: row-reverse; */
  }
  &.recipient {
    .name {
      color: #5e8bff;
    }
  }
  &.noDetail {
    padding-left: 70px;
    display: flex;
    width: 90%;
    /* height: 60px; */
    justify-content: space-between;
    .time {
      color: #6d6d6d;
      font-size: 12px;
      font-weight: bold;
    }
  }
`;

export const MessageItemAvatar = styled.div`
  width: 50px;
  height: 50px;
  background-color: #b12b2b;
  border-radius: 50%;
`;

export const MessageItemDetails = styled.div`
  /* display: flex;
  width: 90%;
  justify-content: space-between;
  .time {
    color: #6d6d6d;
    font-size: 12px;
    font-weight: bold;
  } */
  display: block;
  width: 90%;
`;

export const MessageItemHeader = styled.div`
  display: flex;
  /* gap: 12px; */
  justify-content: space-between;
  width: 100%;

  .authorName {
    font-weight: 600;
    font-size: 16px;
  }
`;

export const MessageItemContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  span:first-child {
    /* display: block; */
    max-width: 70%;
  }
  .time {
    color: #6d6d6d;
    font-size: 12px;
    font-weight: bold;
  }
`;

export const MessagePanelHeaderStyle = styled.div`
  background-color: #151515;
  /* padding-bottom: 20px; */
  border-bottom: 0.1vh solid #5454543d;
  height: 9.9vh;
  line-height: 9.9vh;
  font-weight: 400;
  margin: 0;
  padding-inline: 36px;
  font-size: 20px;
`;
