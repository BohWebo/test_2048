import styled from 'styled-components'

export const WinPanel = styled.div`
  background: rgba(252,234,187,.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  height: 450px;
  position: absolute;
  width: 450px;
  padding: 5px;

`;

export const ContinueButton = styled.button`
  background: #bbada0;
  color: #f9f6f2;
  height: 20px;
  margin: 10px;
  cursor: pointer;
  border-radius: 3px;
  text-align: center;
  font-weight: bold;
  font-size: 15px;
`;