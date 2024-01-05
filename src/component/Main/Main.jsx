import React from 'react'
import './Main.css'
const Main = ({ handleInputChange, addTodo, todoItems, todoInput, contentList, updateStatus }) => {
    return (
        <>
            <h1 className='main-header'>TODO LIST</h1>
            <div className='todo-container'>
                <div className='input-section'>
                    <input
                        type="text"
                        name="todoInput"
                        id="todo"
                        className='input-text'
                        onChange={handleInputChange}
                        value={todoInput}
                    />
                    <button className='add-btn' onClick={addTodo}>
                        Add Task
                    </button>
                </div>
                <ul className='todo-list'>{todoItems.length !== 0 ? contentList : <h2 className='empty-list'>NO TODOS</h2>}</ul>
            </div>
        </>
    )
}

export default Main