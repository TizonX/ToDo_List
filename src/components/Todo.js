import React, { useState, useEffect } from "react";

const getLocalData = ()=> // function deleting the data from LocalStorage
  {
    let data = localStorage.getItem('data');
    if(data)
    {
      return JSON.parse(localStorage.getItem('data'));
    }
    else{
      return [];
    }
  }

function Todo() {
  const [item, setItem] = useState('');
  const [arrayItem, setArrayItem] = useState(getLocalData());
  const itemName = (e) => {
    setItem(e.target.value);
  };
  const addItem = () => {
    if (!item) {    // ristricted to store null values "","",""]
                    
    } else {
      setArrayItem((getOldItems) => {
        return [...getOldItems, item];    // array destructuring 
      });
      setItem(); // after submit input will empty // currently not working (don't know Y);
    }
  };

  const delItem = (id) => {
    // geting unique key with ID
    const afterDeletedItems = arrayItem.filter((element, index) => {
      return id !== index;
    });
    setArrayItem(afterDeletedItems); // remaining item will display
  };
  
    useEffect(()=>
  {
    localStorage.setItem('data',JSON.stringify(arrayItem))    // storing data inside the localStorage
  },[arrayItem]);
  
    const handler = (event) => {  // enter button event
      if(event.charCode == 13){ // 13 is the value of Enter
        addItem();
      }
    };
  
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <div className="addItems">
            <input
              onChange={itemName}
              type="text"
              placeholder="add items"
              onKeyPress={(e) => handler(e)} // when press enter Item will store
            ></input>
            <i
              onClick={addItem}
              className="fa fa-plus add-btn"
              title="add items"
            ></i>
          </div>

          <div className="showItems">
            {arrayItem.map((showItems, index) => {
              return (
                <div className="eachItem" key={index}>
                  <h3>{showItems}</h3>
                  <i
                    onClick={() => delItem(index)} // sending key as a parameter
                    className="far fa-trash-alt add-btn"
                    title="delete item"
                  ></i>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo;
