import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, toggleTodo, editTodo } from "@/redux/todoSlice";
import { RootState } from "@/redux/store";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { capital } from "case";

const TodoForm: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();
  const [text, setText] = useState<string>("");
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editedText, setEditedText] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");

  const handleAddTodo = () => {
    if (text.trim()) {
      dispatch(addTodo(text));
      setText("");
    }
  };

  const handleEditTodo = (id: number, newText: string) => {
    dispatch(editTodo({ id, text: newText }));
    setEditingTodoId(null);
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodo(id));
  };

  const handleToggleTodo = (id: number) => {
    dispatch(toggleTodo(id));
  };
  const handleCancelEdit = () => {
    setEditingTodoId(null);
    setEditedText("");
  };

  useEffect(() => {
    const storedTodo = localStorage.getItem("persist:root") as string;
    const parsedTodo = JSON.parse(storedTodo);
    setDisplayName(capital(parsedTodo.name).replace(/"/g, ""));
  }, []);

  const filteredTodos = todos.filter((todo) => todo.text.toLowerCase().includes(searchValue.toLowerCase()));

  return (
    <div className="min-h-screen container mx-auto flex justify-center items-center">
      <div className="flex flex-col items-center w-1/2 ">
        <Link to="/">
          <div className="text-4xl font-extrabold">Todify</div>
        </Link>
        <div className="font-extrabold mt-5">Hello, {displayName}</div>
        <Card className="p-5 w-full my-5">
          <div className="flex gap-3">
            <Input className="bg-light-100 " type="text" placeholder="Add a new task..." value={text} onChange={(e) => setText(e.target.value)} />
            <Button onClick={handleAddTodo}>
              <Icon icon="uil:plus" />
            </Button>
          </div>
        </Card>
        <Card className="p-5 flex flex-col gap-3 w-full min-h-[15rem]">
          <Input className="bg-light-200" type="text" placeholder="Search..." value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />

          {filteredTodos.map((todo) => (
            <Card className="p-3" key={todo.id}>
              {editingTodoId === todo.id ? (
                <div>
                  <Input className="bg-light-200 " type="text" value={editedText} onChange={(e) => setEditedText(e.target.value)} />
                  <div className="flex gap-3 mt-5">
                    <Button className="mt-5 w-full" onClick={() => handleEditTodo(todo.id, editedText)}>
                      Save
                    </Button>
                    <Button className="mt-5 w-full" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <div
                    style={{
                      textDecoration: todo.completed ? "line-through" : "none",
                    }}
                    className="font-extrabold text-xl"
                  >
                    {todo.text}
                  </div>
                  <div className="flex gap-3 mt-5">
                    <Button className="w-full" onClick={() => handleToggleTodo(todo.id)}>
                      {todo.completed ? "Undo" : "Complete"}
                    </Button>
                    <Button className="w-full" onClick={() => setEditingTodoId(todo.id)}>
                      Edit
                    </Button>
                    <Button className="w-full" onClick={() => handleDeleteTodo(todo.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </Card>
      </div>
    </div>
  );
};

export default TodoForm;
