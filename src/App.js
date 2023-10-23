import React, { useState } from 'react';
import './App.css'
import { HiOutlinePlus } from 'react-icons/hi';
import {MdDelete} from 'react-icons/md'
import {GrEdit} from 'react-icons/gr'
import {LiaSave} from 'react-icons/lia'

import randomID from "uuid4";


function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [TaskEdited, setTaskEdited] = useState('');


  const addTask = () => {
    if (newTask.trim() === '')
    {
      return;
    }
    else
    {
      setTasks( [ ...tasks, { id: randomID(), text: newTask } ] );
      setNewTask('');
    }
  };

  const TaskEdit = (id) => {
    const taskToEdit = tasks.find(task => task.id === id);
    if (taskToEdit) {
      setEditTaskId(id);
      setTaskEdited(taskToEdit.text);
    }
  };

  const saveEditedTask = () => {
    setTasks(tasks.map(task =>
      task.id === editTaskId ? { ...task, text: TaskEdited } : task
    ));
    setTaskEdited('');
    setEditTaskId(null);
  };

  
  function removeTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }


  return (
    <div className='wrapper'>
      <div className='content'>
          <div className='todoHeadin'><h1 className='h1tag'>Todo List</h1></div>
          <div className='line'></div>

          <div className='input'>
            <div className='widht'>
            <input
              className='input'
              type="text"
              placeholder="New Task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <div className='line line1'></div>
            </div>
            <div className='btn1'><button className='btnx1' onClick={addTask}><div className='plus'><HiOutlinePlus/></div><div className='with'> Add Task</div></button></div>
          </div>

          


          <ul>
            {tasks.map(task => (
              <li key={task.id}>
              {editTaskId === task.id ? (
                <div>
                  <input
                    className='btn2'
                    type="text"
                    value={TaskEdited}
                    onChange={(e) => setTaskEdited(e.target.value)}
                  />
                  <button onClick={saveEditedTask}><LiaSave/></button>
                </div>
              ) : (

                <>
                  <div className='taskItem'>{task.text}</div>
                  <button className='btn3'  onClick={() => TaskEdit(task.id)}><GrEdit/></button>
                </>

              )}
              <button className='btn4' onClick={() => removeTask(task.id)}><MdDelete className='btn5'/></button>
            </li>
            ))}
          </ul>
      </div>
    </div>
  );
}

export default App;
