// import './Stone.css'  
    // ${props => props.theme === "second" ? 
    // 'background-color: red' : props.theme == 'third' ? 'background-color: purple' : 'background-color: rgb(0,68,255)'}
import styled from 'styled-components';

const Stone = styled.div`
    position: relative;
    border: solid black 1px;
    height: 25px;
    width: 25px;
    border-radius: 25px;
    margin: 1px;
    box-shadow: inset 3px 2px 6px 3px rgb(0,30, 90);
    background-color: red;
   
`
// const Stone = (props) => {
//     const stoneStyle={
//         position: 'relative',
//         top: props.position < 5 ? props.position : props.position - Math.random() * 20,
//         left: props.position < 5 ? props.position : props.position - Math.random() * 20,
//         backgroundColor: 'rgb(0,0,900)',
//         border: 'solid black 1px',
//         height: '25px',
//         width: '25px',
//         borderRadius: '25px',
//         margin: '1px',
//         boxShadow: 'inset 2px 2px 8px 4px rgb(10,10,100)'
//     }



//     return (
//         <p className='stone' style={stoneStyle}>
            
//         </p>
//     );
// };

export default Stone;