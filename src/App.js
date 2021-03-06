
import './App.css';
import { useState, useEffect, useRef } from 'react';
import Board from './components/board/Board';
import Modal from './components/modal/Modal';
import StartScreen from './components/startScreen/StartScreen';


import img1 from './images/natureBackground.jpg'
import img2 from './images/outerspaceBackground.jpg'

function App() {
  const DEMO_STATE = [0, 2, 5, 0, 0, 0, 1, 0, 1, 2, 3, 0, 0, 1,0]
  const INITIAL_BOARD_STATE = [0, 4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4]
  const themesArray = ['basic', 'second', 'third']
  const [board, setBoard] = useState(INITIAL_BOARD_STATE)
  const [gameOver, setGameOver] = useState(false)
  const [player1, setPlayer1] = useState(true)
  const [isMoving, setIsMoving] = useState(false)
  const [stonesAnimationPosition, setStonesAnimationPosition] = useState({startY: 0, startX: 0, endX: 0, index: 0})
  const [numberOfStonesInMove, setNumberOfStonesInMove] = useState(0)
  const [firstLoad, setFirstLoad] = useState(true)
  const topOfBoard = useRef()
  const [showStartScreen, setShowStartScreen] = useState(true)
  const [theme, setTheme] = useState('basic')
  const [backgroundImage, setBackgroundImage] = useState('img1')
  


  const checkGameOver = () => {
  
  let playerTotal = 0

      if(board[1] === 0 & board[2] === 0 & board[3] === 0 & board[4] === 0 & board[5] === 0 & board[6] === 0 & numberOfStonesInMove === 0)
        {
        playerTotal = board[0]
        for(let i = 8; i < 14; i++){
            playerTotal = board[i] + playerTotal
          }
        setBoard(prevState => [playerTotal, 0,0,0,0,0,0,prevState[7], 0,0,0,0,0,0])
        setGameOver(true)
      }else if (board[8] === 0 & board[9] === 0 & board[10] === 0 & board[11] === 0 & board[12] === 0 & board[13] === 0 & numberOfStonesInMove === 0 ) 
      {
        playerTotal = board[7]
        for(let i = 1; i < 7; i++){
            playerTotal = board[i] + playerTotal
        }
        setBoard(prevState => [prevState[0], 0,0,0,0,0,0, playerTotal, 0,0,0,0,0,0])
        setGameOver(true)
    }
  }



  useEffect(
    ()=>{
      if(firstLoad)setFirstLoad(false)
      else{
        setIsMoving(true)
      }
    }
  , [stonesAnimationPosition])



  useEffect(
    ()=>{
     if(!isMoving){

      let playerTotal = 0

      if(!isMoving & numberOfStonesInMove === 0 & board[stonesAnimationPosition.index + 1] === 1 & board[14 - stonesAnimationPosition.index - 1] > 0){
      
      

      if(!player1 & stonesAnimationPosition.index + 1 < 7 ){
          setBoard(prevState => [...prevState, prevState[7] = 1 + prevState[14 - stonesAnimationPosition.index - 1 ] + prevState[7], prevState[stonesAnimationPosition.index + 1] = 0, prevState[14 - stonesAnimationPosition.index - 1 ] = 0 ])
      }
      if(player1 & stonesAnimationPosition.index + 1 > 7){
        setBoard(prevState => [...prevState, prevState[0] = 1 + prevState[14 - stonesAnimationPosition.index - 1 ] + prevState[0],prevState[stonesAnimationPosition.index + 1] = 0, prevState[14 - stonesAnimationPosition.index - 1 ] = 0 ])
      }
        
    }
      

      checkGameOver()

   

     }
    }
  , [isMoving])


useEffect(()=>{
  if(!gameOver){
  checkGameOver()
  }

},[board])






  const afterAnimation = () =>{
    
    let numberCheck = numberOfStonesInMove - 1
    let moveXBy
    if(stonesAnimationPosition.index < 6){
      moveXBy = 130
    }else{
      moveXBy = -130
    }




    if(numberCheck === 0) //if ending turn
    {
      //manually change board[index + 1 ] to one less stone
      if(stonesAnimationPosition.index === 6)
      {
        if(player1){
          setNumberOfStonesInMove(0)

          setIsMoving(false)
        setBoard(prevState =>  [...prevState, prevState[7]++])
        }
        else{
          setStonesAnimationPosition(prevState => ({...prevState, startY: topOfBoard, startX: prevState.endX , endX: prevState.endX + moveXBy, index: prevState.index + 1 }))
        }
      }else if(stonesAnimationPosition.index === 13){
        if(player1){ 
          setStonesAnimationPosition(prevState => ({...prevState, startY: prevState.startY + 300, startX: prevState.startX, endX: prevState.endX + 150  , index: 0}))
        }else{
          setNumberOfStonesInMove(0)
          setIsMoving(false)
        setBoard(prevState =>  [...prevState, prevState[0]++])
        

        }
      }
      else
        {          
          setIsMoving(false)
          setPlayer1(() => !player1)
          setBoard(prevState => [...prevState, prevState[stonesAnimationPosition.index + 1]++ ]) 
          setNumberOfStonesInMove(prevState => prevState - 1)
        } 

  
      return
    }




    else if(stonesAnimationPosition.index === 6 & !player1){/*else if player 2 and goes by player 1 store then skip that store*/
    setStonesAnimationPosition(prevState => ({...prevState, startY: topOfBoard, startX: prevState.endX , endX: prevState.endX + moveXBy, index: prevState.index + 1 }))
      
  }else if(stonesAnimationPosition.index === 13){
      if(player1){
        setStonesAnimationPosition(prevState => ({...prevState, startY: topOfBoard.current.offsetTop + 300, startX: prevState.startX, endX: prevState.endX + 150  , index: 0}))
      }else{
        setNumberOfStonesInMove(prevState => prevState - 1)
        setBoard(prevState => [...prevState, prevState[0]++ ])
        setStonesAnimationPosition(prevState => ({...prevState, startX: prevState.startX, endX: prevState.endX + 150  , startY: prevState.startY + 300, index: 0}))
      }
      }
    else if(stonesAnimationPosition.index > 5 & player1){/*if player 1 and goes by player 1 store then add to that store*/
      setStonesAnimationPosition(prevState => ({...prevState, startY: topOfBoard, startX: prevState.endX , endX: prevState.endX + moveXBy, index: prevState.index + 1 }))
      setNumberOfStonesInMove(prevState => prevState - 1)
      setBoard(prevState => [...prevState, prevState[stonesAnimationPosition.index + 1]++ ])
    }
      else{
      setStonesAnimationPosition(prevState => ({...prevState, startX: prevState.endX , endX: prevState.endX + moveXBy, index: prevState.index + 1 }))
      setNumberOfStonesInMove(prevState => prevState - 1)
      setBoard(prevState => [...prevState, prevState[stonesAnimationPosition.index + 1]++ ])
    }
 
  }



  const clickHandler = (e, pocketIndex) => {

    

    if (board[pocketIndex] === 0) return //if that pocket is empty do nothing

    setNumberOfStonesInMove(board[pocketIndex])
   
   
    let stones = board[pocketIndex]


    let calculatedStart = (pocketIndex * 130)
    let topStart = topOfBoard.current.offsetTop
    if(pocketIndex < 7){
      setStonesAnimationPosition({startY: topStart + 300, startX: calculatedStart + 250, endX: calculatedStart + 450, index: pocketIndex })
    }else{
      calculatedStart = (14 - pocketIndex) * 130 
    
      setStonesAnimationPosition({startY: topStart , startX: calculatedStart + 250, endX: calculatedStart + 250 - 140, index: pocketIndex})
    }
    

    let index = pocketIndex + 1
    let state = board
    state[pocketIndex] = 0
    //distribute stones around



    index--
    ///if you landed on am empty house steal the other players stones
    ///
    ////
    if(player1 & index < 7 & index > 0 & state[index] === 1 & state[14-index] > 0){
      //take other players stones 
      state[7] = state[7] + 1 + state[14-index]
      state[14-index] = 0
      state[index] = 0
      }

    if(!player1 & index > 7 & index < 14 & state[index] === 1 & state[14-index] > 0){
      //take other players stones

      state[0] = state[0] + 1 + state[14-index]
      state[14-index] = 0
      state[index] = 0
    }


    setBoard([...state])

    //if the index of last one is their store and games not over then 
    //dont change player 
    //
    //if player 1 and index left on was 7 , then dont switch players
    //if player 2 and index left on was 0 , then dont switch players

    if (index === 7 & player1) {
      return
    }
    if (index === 0 & !player1) {
      return
    }
  }







  //
  ///
  //
  const modalClickHandler = () => {
    setBoard(INITIAL_BOARD_STATE)
    setGameOver(false)
    setPlayer1(true)
    setIsMoving(false)
    setShowStartScreen(true)
  }

  //
  //
  //choose theme
  const themeClickHandler = (chosenTheme) => {
    setTheme(chosenTheme)
  } 
  const backgroundClickHandler = (chosenBackgroundImage) =>{
    setBackgroundImage(chosenBackgroundImage)
  }

  const startGameButtonHandler = () => {
    setShowStartScreen(false)
  }

  if(showStartScreen){
    return(
        <StartScreen 
          themeClickHandler={themeClickHandler} 
          startGameButtonHandler={startGameButtonHandler} 
          backgroundClickHandler={backgroundClickHandler} 
          backgroundImage={backgroundImage} 
          theme={theme} 
        />
      )
  }

   let backgroundImageUrl = backgroundImage === 'img1' ? img1 : img2 
  
  return (

    
    <div className="app" style={{backgroundImage: `url(${backgroundImageUrl})`}}>
    {console.log('render')}
      <Modal gameOver={gameOver} modalClickHandler={modalClickHandler} board={board} />
      <p style={player1 ? { color: 'black' } : { color: 'rgb(21, 255, 28)' }} >Player 2</p>
      <Board theme={theme} numberOfStonesInMove={numberOfStonesInMove} clickHandler={clickHandler} board={board} gameOver={gameOver} afterAnimation={afterAnimation} isMoving={isMoving} stonesAnimationPosition={stonesAnimationPosition} topOfBoard={topOfBoard} /> 
    
       <p style={!player1 ? { color: 'black' } : { color: 'rgb(21, 255, 28)' }}>Player 1</p> 
    </div>
 
  );
}

export default App;


/*
app makes the board with all the pits or houses and sends in the number of items board[index] that each has
and sends in which index in the array they are 
and the click handler which resides in the parent component, App, with state

the function is called from click which handles moving stones around correctly and 
adding one to each pit

a pit component renders a pit on screen and conditionally renders either just the
number in it of stones if its a players main pit (store), or if a regular one then it 
also has a click handler attached to it 

*/