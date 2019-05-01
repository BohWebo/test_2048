import React from 'react';
import styled from 'styled-components'


const ControlPanel = ({ score, restartGame }) => (
  <Container>
    <Button onClick={restartGame}>New Game</Button>
     <Score> Score <p>{score}</p></Score>
  </Container>
);


const Container = styled.div`
  display: flex;
  margin-right: auto;
  margin-left: auto;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  width: 475px;

`;

const Button = styled.button`
  background: #8f7a66;
  color: #f9f6f2;
  height: 40px;
  margin: 10px;
  cursor: pointer;
  border-radius: 3px;
  text-align: center;
  font-weight: bold;
  font-size: 25px;
  
`;

const Score = styled.div`
  margin-top: 16px;
  align-self: center;
  position: relative;
  display: inline-block;
  background: #bbada0;
  padding: 15px 25px;
  font-size: 20px;
  height: 25px;
  line-height: 3px;
  font-weight: bold;
  border-radius: 3px;
  color: white; 
  text-align: center;
    
`;

export default ControlPanel;