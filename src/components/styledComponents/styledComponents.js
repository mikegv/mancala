 import styled, { keyframes } from 'styled-components';



 //keyframes for stonesAnimation
const move = (startX, endX) => keyframes`
  from {
    left: ${startX + 'px'};
  }
  to {
    left: ${endX + 'px'};
  }
`
//
//styled component for the animation
export const StonesAnimation = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 60px;
  height: 50px;
  background-color: transparent;
  position: absolute;
  left: ${props => props.endX + 'px'};
  top: ${props => props.startY + 'px'};
  z-index: 13;
  animation-name: ${props => move(props.startX, props.endX)};
  animation-duration: .8s;
  animation-timing-function: ease-in-out;
`


// const Stone = styled.div`
//     position: relative;
//     border: solid black 1px;
//     height: 25px;
//     width: 25px;
//     border-radius: 25px;
//     margin: 1px;
//     box-shadow: inset 3px 2px 6px 3px rgb(0,30, 90);
//     background-color: red;
   
// `

 // ${props => props.theme === "second" ? 
    // 'background-color: red' : props.theme == 'third' ? 'background-color: purple' : 'background-color: rgb(0,68,255)'}