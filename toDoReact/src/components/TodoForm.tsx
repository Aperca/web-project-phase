type Props = {
  value: string;
  onChange: (text:string) => void;
  onAdd: () => void;
};

const TodoForm = ({value, onChange,onAdd }: Props) => {
  return (
    <div className="flex gap-2 mb-4">
        <input type="text"  placeholder="write task" value={value} onChange={(e) => onChange(e.target.value)} 
          className="border p-2 rounded"
        />
        <button onClick={onAdd} className="bg-blue-500  text-white px-4 py-2 rounded hover:bg-blue-600">Add Task</button>
    </div>
  )
}

export default TodoForm
