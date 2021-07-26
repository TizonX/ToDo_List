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
  const [toggleSubmit, setToggleSubmit] = useState(true); // input plus and edit toggle
  const [isEditItem, setiIsEditItem] = useState(null);
  const itemName = (e) => {
    setItem(e.target.value);
  };
  const addItem = () => {
    if (!item) {    // ristricted to store null values "","",""]
                    
    }
    else if(items && !toggleSubmit)
    {
      setArrayItem(
        arrayItem.map((element)=>
        {
          if(element.id===isEditItem)
          {
            return {...element,name:items}
          }
          return element;
        })
      )
      setToggleSubmit(true);
      setItems('');
      setiIsEditItem(null);
    }
    else {
      const idObject = {id: new Date().getTime().toString(), name:items}
      setArrayItem([...arrayItem, idObject]);
      setItem(); // after submit input will empty // currently not working (don't know Y);
    }
  };

  const delItem = (index) => {
    // geting unique key with ID
    const afterDeletedItems = arrayItem.filter((element) => {
      return index !== element.id;
    });
    setArrayItem(afterDeletedItems); // remaining item will display
  };
  
  const editItem = (id)=>
  {
    let newEditItem = arrayItem.find((element)=>
    {
      return element.id === id;
    }
    );
    setToggleSubmit(false);
    setItems(newEditItem.name);
    setiIsEditItem(id);
  };
  
    useEffect(()=>
  {
    localStorage.setItem('data',JSON.stringify(arrayItem))    // storing data inside the localStorage
  },[arrayItem]);
  
    const handler = (event) => {  // enter button event
      console.log(event.charCode);
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
           {
              toggleSubmit?<i
              onClick={addItem}
              className="fa fa-plus add-btn"
              title="add items"
              
            ></i>:
            <i
              onClick={addItem}
              className="fa fa-edit add-btn"
              title="update items"
              
            ></i>
            }
          </div>

          <div className="showItems">
            {arrayItem.map((showItems) => {
              return (
                <div className="eachItem" key={showItems.id}>
                  <h3>{showItems.name}</h3>
                 <div className="todo-btn">
                   <i
                    onClick={() => editItem(showItems.id)} // sending key as a parameter
                    className="far fa-edit add-btn"
                    title="edit item">
                      </i>
                     <i
                    onClick={() => delItem(showItems.id)} // sending key as a parameter
                    className="far fa-trash-alt add-btn"
                    title="delete item">
                      </i>
                 </div>
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
