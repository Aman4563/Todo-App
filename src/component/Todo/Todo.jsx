import React from 'react';
import "./Todo.css";

const Todo = (props) => {
  function handleInputCheckbox(event) {
    const { name } = event.target;
    console.log(name);
    if (name === "delete") {
      props.updateStatus("delete", props.content, props.isCompleted, props.id)
    }
    else {
      props.updateStatus("completed", props.content, !props.isCompleted, props.id)
    }

  }

  const styles = props.isCompleted ? "todo-text task-completed" : "todo-text"


  return (
    <li className="todo">
      <input
        type="checkbox"
        name="isCompleted"
        className='todo-checkbox'
        checked={props.isCompleted}
        onChange={handleInputCheckbox}
      />

      <div className='todo-content'>
        <p className={styles}>{props.content}</p>
        <p className='timestamp'>{props.timestamp}</p>
      </div>
      <div className='todo-btn-container'>
        <button className='delete' name='delete' onClick={handleInputCheckbox}>🗑️</button>
        <button className='modify' name='update' onClick={() => props.handleUpdateId(props.id)}>✏️</button>
        {/* props.handleUpdateChange("update","") */}
      </div>
    </li>
  );
};

export default Todo;
