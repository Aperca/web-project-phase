type Props = {
  value: string;
  onChange: (text:string) => void;
  onAdd: () => void;
};

const TodoForm = ({value, onChange,onAdd }: Props) => {
  return (
    <div>
        <input type="text"  placeholder="write task" value={value} onChange={(e) => onChange(e.target.value)} />
        <button onClick={onAdd}>Add Task</button>
    </div>
  )
}

export default TodoForm
