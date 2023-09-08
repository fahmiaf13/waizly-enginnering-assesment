import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface UserState {
  name: string;
  city: string;
  regency: string;
  todos: Todo[];
}

const initialState: UserState = {
  name: "",
  city: "",
  regency: "",
  todos: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setRegency: (state, action: PayloadAction<string>) => {
      state.regency = action.payload;
    },
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };
      state.todos.push(newTodo);
    },
    editTodo: (state, action: PayloadAction<{ id: number; text: string }>) => {
      const todoToEdit = state.todos.find((todo) => todo.id === action.payload.id);
      if (todoToEdit) {
        todoToEdit.text = action.payload.text;
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todoToToggle = state.todos.find((todo) => todo.id === action.payload);
      if (todoToToggle) {
        todoToToggle.completed = !todoToToggle.completed;
      }
    },
  },
});

export const { setName, setCity, setRegency, addTodo, editTodo, deleteTodo, toggleTodo } = userSlice.actions;
export default userSlice.reducer;
