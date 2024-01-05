import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
// import Todo from './component/todo/todo';
import Main from './component/Main/Main';
import Model from './component/Model/Model';
import Todo from './component/Todo/Todo'
function App() {

  // function for timestamp generation for todos
  const getFormattedTimestamp = () => {
    const date = new Date();
    return `${date.getHours() % 12}:${date.getMinutes()} ${date.getHours() < 12 ? "AM" : "PM"}, ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };


  //localStorage to useState with this
  let storeItems = JSON.parse(localStorage.getItem('items')) || [];

  const handleKey = (event) => {
    const key = event.key;
    key === "Enter" && addTodo();
  };

  // useStates or States used
  const [todoItems, setTodoItems] = useState(storeItems);

  const [todoInput, setTodoInput] = useState("");

  const [update, setUpdate] = useState(false)

  const [updateId, setUpadteId] = useState("")


  // console.log(todoItems[0])

  // for input value update 
  const handleInputChange = (event) => {
    const { value } = event.target;
    setTodoInput(value);

  };

  function handleUpdateId(newId) {
    setUpadteId(newId);
    // console.log(newId)
    updateStatus("update")

  }

  // for isComplete value update and delete functionality
  function updateStatus(task, content, newStatus, id) {
    // console.log("entered in updateStatus function");

    if ((task === "cancel") || (task === "update")) {
      setUpdate(!update)
    }
    if (task === "delete") {

      const newTodoList = todoItems.filter(item => item.id !== id);
      // console.log(newTodoList)
      setTodoItems(newTodoList);
    }
    if (task === "makeupdate") {
      setTodoItems((prevTodoItems) => {
        return prevTodoItems.map((item) => item.id === id ? { ...item, todoText: content } : item)
      })
      setUpdate(!update)
    }
    else {
      setTodoItems((prevTodoItems) => {
        return prevTodoItems.map((item) => item.id === id ? { ...item, isCompleted: newStatus } : item);
      });
    }
  }

  // create and add a todo item in array todoItems
  const addTodo = () => {

    if (todoInput !== "") {
      const timestamp = getFormattedTimestamp();
      const newTodoToAdd = {
        id: Date.now(),
        todoText: todoInput,
        timestamp: timestamp,
        isCompleted: false,
      }

      setTodoItems((prevTodoList) => [
        ...prevTodoList,
        newTodoToAdd,
      ]);
    }
    setTodoInput("");
  };


  // Render the array of Todo Component into ul 
  // normal without useMemo

  // const contentList = todoItems.map((item, index) => (
  //   <Todo content={item.todoText} timestamp={item.timestamp} isCompleted={item.isCompleted} updateStatus={updateStatus} key={index} />
  // ));

  // useMemo for some optimization if todoItems state is not changing we dont recompute it this hook helps to mezmorize things
  const contentList = useMemo(() => {
    return todoItems.map((item, index) => (
      <Todo
        content={item.todoText}
        timestamp={item.timestamp}
        isCompleted={item.isCompleted}
        updateStatus={updateStatus}
        // handleUpdateChange={handleUpdateChange} 
        handleUpdateId={handleUpdateId}
        key={index}
        id={item.id}
      />
    ));
  }, [todoItems]);

  
  // Handle local Storage 

  useEffect(() => {

    localStorage.setItem('items', JSON.stringify(todoItems));

  }, [todoItems])

  return (
    <>
      {update ? <Model updateStatus={updateStatus} updateId={updateId} /> : <Main handleInputChange={handleInputChange} addTodo={addTodo} updateStatus={updateStatus} todoItems={todoItems} todoInput={todoInput} contentList={contentList} />}

    </>
  );
}

export default App;
