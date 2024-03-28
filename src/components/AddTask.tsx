import React, { useState , useRef} from 'react';
import Task from '../models.ts/taskModel';
// import { getTasks } from '';

interface TaskProps {
  task: Task;
  saveTask: any,
  buttonName: String,
  updateTask: any,
  edit: any

}


const AddTask: React.FC<any> = ({ saveTask,task, buttonName, edit }) => {
    const { body, title} = task
    const [formData, setFormData] = useState({
        id: '',
        body:'',
        title: '',
    })
    const formRef= useRef<HTMLFormElement>(null)
    const handleArticleData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target
        console.log("formrrr",formData)
        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: value,
        }))
    };

    const addNewTask = (e: React.FormEvent) => {
        e.preventDefault()

        saveTask(formData)
        formRef.current?.reset()
    }

    const updateTaskBy = (e: React.FormEvent) => {
        e.preventDefault()
        const {title, body} = formData || {}
        let newTask = {
            id: task.id,
            title: title || task.title,
            body: body || task.body
        }
        saveTask(newTask)
    }
  return (
    <form  onSubmit={edit ? updateTaskBy: addNewTask} className="Add-task" ref={formRef}>
    <input
      type="text"
      id="title"
      placeholder="Title"
      defaultValue={title}
      onChange={handleArticleData}
    />
    <input
      type="text"
      id="body"
      placeholder="Description"
      defaultValue={body}
      onChange={handleArticleData}
    />
    <button  disabled={formData === undefined ? true : false}>
      {buttonName}
    </button>
  </form>
  );
};

export default AddTask;
