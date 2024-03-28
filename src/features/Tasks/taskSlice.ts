import { createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
// import axios from 'axios';
import Task from '../../models.ts/taskModel';
// import  {TaskList}  from '../data';
import { RootState } from '../../store';
import { TaskList } from '../../data';
const  JSON_PLACEHOLDER_API = 'https://jsonplaceholder.typicode.com/posts'


interface TaskState  {
    loading: Boolean,
    error: null | String,
    data: null | Task[]
}
const initialState : TaskState= {
    loading: false,
    error: null,
    data: [
        
        {
          "id": 1,
          "title": "Pay bills",
          "body": 'Paying Bills as per schedule',
          "completed": false,
        }
      ]
}


//ACTION
export const getTasks = createAsyncThunk(
    "tasks/getTasks",
    async (data, thunkApi) => {
        try {
            const response = await fetch(JSON_PLACEHOLDER_API)
            // JSON.parse(localStorage.getItem('task') || '{}')
            console.log("resss",response)
            return response.json()
        } catch(err: any) {
            thunkApi.rejectWithValue(err)
        }
    }
)
export const postTasks = createAsyncThunk<Task,any>(
    "tasks/postTasks",
    async (payload, thunkApi) => {
        try {

            const response = await fetch(JSON_PLACEHOLDER_API, {
                method: 'POST',
                body: JSON.stringify(payload)
            })
            // const data = response.json()
            const data =TaskList.todos//JSON.parse(localStorage.getItem('task') || '{}')
            data.sort((a: any,b: any) => a.id-b.id)
            const newTask = {
                "id": data[data.length-1].id+1,
                "title": payload.title,
                "body": payload.body,
                "completed":false
            }
            data.push(newTask)
            localStorage.setItem('task',JSON.stringify(data))
            return payload
        } catch(err: any) {
            thunkApi.rejectWithValue(err)
        }
    }
)

export const deleteTasks = createAsyncThunk<Task,any>(
    "tasks/deleteTask",
    async (payload, thunkApi) => {
        try {

            const response = await fetch(JSON_PLACEHOLDER_API, {
                method: 'POST',
                body: JSON.stringify(payload)
            })
            const data =TaskList.todos//JSON.parse(localStorage.getItem('task') || '{}')
            const newTask = data.filter((task: Task) => task.id !== payload)
            localStorage.setItem('task',JSON.stringify(newTask))
            return payload
        } catch(err: any) {
            thunkApi.rejectWithValue(err)
        }
    }
)


//SLICE
const taskSlice = createSlice({
    name:'task',
    initialState,
    reducers: {
        addTask: (state, action) => {
            const { payload} = action
         const newTask = {
            id: Math.random(),
            title: payload.title,
            body: payload.body,
            completed: false
         }
         state.data?.push(newTask)
        },
        deleteTask: (state: TaskState, action: PayloadAction<Number>) => {
            const filterData=  state.data?.filter((tsk) => tsk.id !== action.payload)
            state.data = filterData || []
        },
        updateTask: (state, action: PayloadAction<Task>) => {
            const updatedData =  state.data?.map((task) => {
                const task1= JSON.parse(JSON.stringify(task))
               return task1.id === action.payload.id ? action.payload: task1
            })
            console.log("updadad", updatedData)
            state.data = updatedData || []
        }

    },
    extraReducers(builder) {
        //cases
        builder.addCase(getTasks.pending,(state,action) => {
            state.loading= true;
        })
        .addCase(getTasks.fulfilled,(state,action : PayloadAction<Task[]>) => {
            console.log(initialState, state)
            state.loading = false
            state.data = initialState.data
        })
        .addCase(getTasks.rejected, (state,action: PayloadAction<any>) => {
            state.loading = false
            state.error =  action.payload
        })
        .addCase(postTasks.pending,(state,action) => {
            state.loading = true
        })
        .addCase(postTasks.fulfilled,(state,action: PayloadAction<any>) => {
            const  { payload } = {...action }
            const data = JSON.parse(localStorage.getItem('task') || '{}')
            state.loading = false
            state.data = data
        })
        .addCase(postTasks.rejected,(state,action: PayloadAction<any>) => {
            state.loading = false
            state.error = action.payload
        })
        .addCase(deleteTasks.pending,(state,action) => {
            state.loading = true
        })
        .addCase(deleteTasks.fulfilled,(state,action: PayloadAction<any>) => {
            const  { payload } = {...action }
            const data1 = initialState.data || []//JSON.parse(localStorage.getItem('task') || '{}')
            const newTask = data1.filter((task: Task) => task.id !== payload)
            state.loading = false
            state.data = newTask
        })
        .addCase(deleteTasks.rejected,(state,action: PayloadAction<any>) => {
            state.loading = false
            state.error = action.payload
        })
    }

})

export const { deleteTask,addTask , updateTask} = taskSlice.actions;

// export const useAppSelector =  (state: RootState) => state.taskReducer

export default taskSlice.reducer
