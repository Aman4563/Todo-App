import React, { useState } from 'react'
import "./Model.css"
const Model = ({ updateStatus, updateId }) => {

  const [updateInput, setUpdateInput] = useState("")

  function handleUpdateInput(event) {
    const { name, value } = event.target
    setUpdateInput(value)
    // console.log(updateInput)
  }
  return (
    <div className="model-wrapper">
      <div className='model-container'>
        <div className='quit' onClick={() => updateStatus("cancel")}>&#x2715;</div>
        <form className='form-container' >
          <h3 className='title'>Update TODO</h3>
          <label htmlFor="todo-title" className='title-lable'>Note</label>
          <input type="text" name="text" id="todo-title" className='todo-update-text' onChange={handleUpdateInput} />
          <div className="btn-container">
            <button type='button' className='update btn' onClick={() => updateStatus("makeupdate", updateInput, "", updateId)}>Update Task</button>
            <button type='button' className='cancle btn' onClick={() => updateStatus("cancel")}>Cancle</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Model