import React from 'react';
import Task from '../models.ts/taskModel';

interface TaskProps {
    task: Task;
  }

export const TaskDetails: React.FC<TaskProps> = ({ task }) => {
    const {
     title, completed, body
    } = task
    return (
        <div className="Article">
        <div style={{width: "100%"}}>
            <h1>{title}</h1>
            <p>{body}</p>
            <p><b>Task Completed:</b> {completed ? 'Done' : 'InProgress'}</p>
        </div>
  </div>
    );
};