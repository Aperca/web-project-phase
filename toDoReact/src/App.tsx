import { useState,useEffect } from 'react'
import TodoItem from './components/TodoItem'
import TodoForm from './components/TodoForm'

type Todo = {
  id: number
  text: string
  isDone: boolean
}

function App() {
  const [taskText, setTaskText] = useState("")
  const [todos, setTodos] = useState<Todo[]>([])

  
  useEffect(() => { 
    const saved = localStorage.getItem("todos");
    if (saved) {
      setTodos(JSON.parse(saved) as Todo[]);
    }
  }, []);
  useEffect(() => {
    const handler = setTimeout(() => {
      localStorage.setItem("todos", JSON.stringify(todos));
    }, 100);
    return () => clearTimeout(handler);
  }, [todos]);
  const handleAddTask = () => {
    if (!taskText) {
      return alert("Please enter a task")}

    setTodos([...todos, {id: Date.now(), text:taskText, isDone: false}])
    setTaskText('');
  }

  return (
    <div className='mt-10 items-center justify-center p-8 flex flex-col'>
      <h1 className='text-3xl font-bold'>Todo List</h1>
      <TodoForm value = {taskText} onChange={setTaskText} onAdd={handleAddTask}/>

      <ul className='list-none max-w-md '>
  {todos.length === 0 ? (
    <li className="text-center text-gray-500 py-4">No tasks yet. Add one above!</li>
  ) : (
    todos.map((todo) => (
      <TodoItem key={todo.id} todo={todo} 
        onToggle={() => setTodos(todos.map(t => t.id === todo.id ? {...t, isDone: !t.isDone} : t))} 
        onDelete={() => setTodos(todos.filter((t) => t.id !== todo.id))}
        onEdit={(newText) => setTodos(todos.map(t => t.id === todo.id ? {...t, text: newText} : t))}
      />
    ))
  )}
</ul>
      
    </div>
  )
}

export default App
