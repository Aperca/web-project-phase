import { useState } from "react";

function App(){
  const[squares,setSquares] = useState(Array(9).fill(null));
  const[xNext, setXnext] = useState(true);
  const[text,setText] = useState('no one won yet!')


  const winners = [[0,1,2], [3,4,5], [6,7,8],[0,3,6], [1,4,7], [2,5,8],[0,4,8], [2,4,6]]
  return(
    <>
    
    <div className="flex flex-col items-center gap-4 mt-8">
        <h1 className="text-2xl font-bold">{text}</h1>
        <div>
          {Array(9).fill(null).map((_, i) =>(
            <Square index={i} key={i}/>
          )
          )}
        </div>

      <button onClick={handleReset} className="px-auto py-2 self-end bg-red-500 text-white hover:bg-red-600">Reset</button>
    </div>
    </>
  )
 
  function Square({index}: {index:number}){
    function handleClick() {
      if (squares[index]||findWinner(squares)) return; // if set dont overwrite
     
      const updatedSquares = [...squares]
      updatedSquares[index] = xNext? 'X' : 'O';

      setSquares(updatedSquares)
      setXnext(!xNext);
      const winner = findWinner(updatedSquares)
      if(winner){
        setText(`${winner} has won!`)
      }
    };

    return <button     className="w-20 h-20 text-2xl font-bold border border-gray-400 flex items-center justify-center"
     onClick={handleClick} >{squares[index]}</button>;
  }

  function findWinner(currSquares:(string|null)[]){
     for(let line of winners){
      const [a,b,c] = line;

      if (
        currSquares[a]&& currSquares[a] === currSquares[b]  &&
        currSquares[a] === currSquares[c]
        ){
          return currSquares[a]
        }
     }

     return null;
    
  }
  function handleReset(){
    setSquares(Array(9).fill(null));
    setXnext(true);
    setText("no one won yet!");
  }

}

export default App