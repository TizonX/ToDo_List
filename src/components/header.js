import React, { useState } from 'react'

const Header = ()=>{

    const [item, setItem] = useState()
    const [arrayItem, setArrayItem] = useState([])
    const itemName = (e)=>{
        setItem(e.target.value);
       
    }
    const addItem = ()=>{
        if(!item)
        {
        }
        else{

        
            setArrayItem((getOldItems)=>
            {
                return [...getOldItems, item];
            });
            setItem(''); // after submit input will empty
        }

    }

    // delete Item when click red ' X '
    const delItem = (id)=>{             // geting unique key with ID
        const afterDeletedItems = arrayItem.filter((element, index)=>{
            return id!==index;
        });
        setArrayItem(afterDeletedItems);
    }

return(
    <>
    <input type="search" onChange={itemName} require/>
    <button onClick={addItem}>Add Items</button>
    <ol>
        {
            arrayItem.map((showItems, index)=>
            {
                return (
                
                <li key={index}>{showItems}
                <span className="delete" style={{padding: "5px", color: "red"}} onClick={()=>delItem(index)}>x</span>
                </li>
                );
                
            })
        }
    </ol>
    </>
);
}

export default Header;