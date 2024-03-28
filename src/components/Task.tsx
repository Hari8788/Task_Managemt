import React, { useState } from 'react';
import Task from '../models.ts/taskModel';
import Modal from './UI/Modal';
import { TaskDetails } from './TaskDetails';
import AddTask from './AddTask';

interface TaskProps {
  task: Task;
  deleteTask: any,
  updateTask: any
}

const Todo: React.FC<TaskProps> = ({ task, deleteTask, updateTask }) => {

  const { id, title, completed, body } = task
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);


  const deleteTaskById = (id: Number) => {
    deleteTask(id)
  }

  const openDetailsModal = () => {
    setIsDetailsOpen(!isDetailsOpen);
  };
  const openEditModal = () => {
    setIsEditTaskOpen(!isEditTaskOpen);
  };
  const closeDetailsModal = () => {
    setIsDetailsOpen(!isDetailsOpen);
  };
  const closeEditTaskModal = () => {
    setIsEditTaskOpen(!isEditTaskOpen);
  };

  const updateTaskById = (payload: any) => {
    updateTask(payload)
    setIsEditTaskOpen(!isEditTaskOpen);
  }

  return (
    <div className="Task">
      <div className='Task-details'>
        <h1>{title}</h1>
        <p>{body}</p>
      </div>
      <div className='Task-btns'>
        <button onClick={() => deleteTaskById(id)} className='btn-delete'>Delete</button>
        <button onClick={() => openDetailsModal()} className='btn-details'>Details</button>
        <button onClick={openEditModal} className='btn-edit'>Edit</button>
      </div>

      <Modal isOpen={isDetailsOpen} onClose={closeDetailsModal}>
        <TaskDetails task={task} />
      </Modal>
      <Modal isOpen={isEditTaskOpen} onClose={closeEditTaskModal}>
        <AddTask task={task} buttonName={"Edit Task"} saveTask={updateTaskById} edit={true}/>
      </Modal>
    </div>
  );
};

export default Todo;