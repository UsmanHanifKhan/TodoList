import '../assets/css/Todoitem.css'
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


const TodoItem = ({ todo, onToggleComplete , onDeleteTodo }) => {
  
    const { id, title, completed } = todo;
  const handleDeleteClick = () => {
    onDeleteTodo(id);
  };

  return (
    <li className='todo-item'>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggleComplete(id)}
      />
      <span className="todo-item-data" style={{ textDecoration: completed ? 'line-through' : 'none' }}>
        {title}
        <span onClick={handleDeleteClick} style={{color:'red' , cursor:'pointer' , fontSize:'20px'}}><MdOutlineDeleteOutline /></span>
        <span style={{fontSize:'20px' , paddingLeft:'5px' , cursor:'pointer'}}><Link to={`/taskdetail/${id}`}><FaEye /></Link></span>
      </span>
    </li>
  );
};

TodoItem.propTypes = {
    todo: PropTypes.func.isRequired,
    onToggleComplete: PropTypes.func.isRequired,
    onDeleteTodo: PropTypes.func.isRequired
};

export default TodoItem;
