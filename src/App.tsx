import React, {FC, useCallback, useEffect, useState} from 'react';
import { useAppDispatch, useAppSelector } from './Hooks/useTypedSelector';
import { deleteTask, getTasks, postTasks,addTask, updateTask } from './features/Tasks/taskSlice';
import Loader from './components/UI/Loader';
import Todo from './components/Task';
import Task from './models.ts/taskModel';
import AddTask from './components/AddTask';
import { TaskList } from './data';

const App :FC = () =>{

  const  { data, error, loading } = useAppSelector(state => state)
  const [refresh, setRefresh] =  useState(false)
  const dispatch = useAppDispatch()


  const saveTask = useCallback((data: Task) => {
    dispatch(addTask(data))
    setRefresh(true)
  },[dispatch])

  const deleteTaskById = (id: Number) => {
    dispatch(deleteTask(id))
  }


  const updateTaskById = (data: any) => {
    dispatch(updateTask(data))
  }

  return (
    <main>
      <h1>My Tasks</h1>
      <AddTask saveTask={saveTask} task={{}} buttonName={"AddTask"} edit={false}/>
      {loading ? (
        <Loader />
      ) : (
        data?.length !== 0 &&
        data?.map((task: Task) => (
            <Todo task={task} deleteTask={deleteTaskById} updateTask={updateTaskById}/>
        ))
      )}
    </main>
  );
}

export default App;
