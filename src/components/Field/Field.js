import React from 'react';
import styled from 'styled-components'


const backCells = [];
backCells.length = 16;
backCells.fill(null);


const Field = ({ cells }) => (
  <FieldContainer>
    <Background>
      {
        backCells.map((cell, i) => <BackgroundCell key={i} />
      )}               
    </Background>

    <Playground>
    {cells.map(({ x, y, value, id }) => (
            <Cell 
              key={id} 
              x={x} 
              y={y} 
              value={value}
            >
              {value}
            </Cell>
          ))}

    </Playground>
  </FieldContainer>
);


const FieldContainer= styled.div`
 
  margin-left: auto;
  margin-right: auto;
  height: 475px;
  position: relative;
  width: 475px;
`;

const Background = styled.div`
  align-content: space-between;
  background-color: #bbada0;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 450px;
  justify-content: space-between;
  padding: 5px;
  position: absolute;
  width: 450px;
`;

const Playground = styled(Background)`
  background-color: transparent;
`

const BackgroundCell = styled.div`
  margin: 5px;
  background-color: rgba(238, 228, 218, 0.35);
  height: 100px;
  width: 100px;
  border-radius: 5px;
`;

const Cell = styled(BackgroundCell)`
  
  transform: translate(${({ x }) => x * 113}px, ${({ y }) => y * 113}px);
  text-align: center;
  line-height: 100px;
  background-color: ${({ value }) => calculateBackgroundColor(value)};
  position: absolute;
  transition-property: transform;
  transition: 100ms ease-in-out;
  color: #6a4e4e;
  font-weight: 900;
  font-size: ${({ value }) =>
    value < 100 ? 66
      : value < 1000 ? 47
        : value < 10000 ? 40
          : 30}px;
`;

const calculateBackgroundColor = value => {
  if (value === 0) {
    return 'transparent'
  }
  const step = Math.min(16, Math.log2(value))
  return `hsl(0, ${calculateSaturation(step)}%, ${calculateLightness(step)}%);`
}
const calculateSaturation = step => Math.floor(100 / 16 * step)
const calculateLightness = step => 100 - Math.floor(50 / 16 * step)

export default Field;