import axios from 'axios'

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true
})

type TodolistType = {
    id: string
    addedDate: Date
    order: number
    title: string
}


type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: Date
    deadline: string
    id: string
    todoListId: string
    order: number
    addDate: Date
}

export type UpdateTaskType = {
    title: string
}

type ResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    data: T
}

export type ResponseTaskType = {
    error: string | null
    totalCount: number
    items: TaskType[]

}




export const todolistAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>("todo-lists")
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{
            item: TodolistType
        }>>("todo-lists",
            {title})
    },

    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(
            `todo-lists/${todolistId}`,
            {title})
    },
    getTasks(todolistId:string) {
        return instance.get<ResponseTaskType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{
            item: TaskType
        }>>(`todo-lists/${todolistId}/tasks`,
            {title})
    },

    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, title: string, taskId: string) {
        return instance.put<ResponseType<{item:UpdateTaskType}>>(
            `/todo-lists/${todolistId}/tasks/${taskId}`,
            {title})
    }
}
