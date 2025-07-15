import { useState, type MouseEvent } from "react";

interface Props{
    items: string[]
    heading: string
    onSelectItem: (item:string) => void;
}
function ListGroup(props:Props){
    const[state,setState] = useState(-1)
    const handleClick = (index: number) => {
        setState(index)
    }
    return(
        <>  
            <h1>{props.heading}</h1>
            <ul className="list-group">
                {props.items.map((item, index) => (
                    <li
                     className={state === index ? 'list-group-item active' : 'list-group-item' }
                     onClick={() => { handleClick(index); props.onSelectItem(item); }} key={item} >{item}
                     
                     </li>
                    ))}
            </ul>
           
        </>
    );
}

export default ListGroup