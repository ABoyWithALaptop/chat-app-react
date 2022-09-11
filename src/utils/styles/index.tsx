import styled from 'styled-components';

export const DARK = '#131313';

// export const theme = 

export const InputField = styled.input`
  background: inherit;
  outline: none;
  border: none;
  color:#fff;
  font-family: 'Inter';
  font-size: 18px;
  width: 100%
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
  font-size: 18px;
  padding: 20px 0;
  border: none;
  outline: none;
  border-radius: 10px;

`

export const Page = styled.div`
  height: 100%;
  background-color: #1a1a1a;
  display: flex;
  justify-content: center;
  align-items: center;
`