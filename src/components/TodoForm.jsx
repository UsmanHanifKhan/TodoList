import { useState } from 'react';
import '../assets/css/TodoForm.css';
import PropTypes from 'prop-types';
const TodoForm = ({ onAddTodo }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  const [errors, setErrors] = useState({
    title: '',
    description: ''
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear the error when user starts typing
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement form validation here
    const { title, description, dueDate } = formData;
    const newErrors = {};

    if (!title) {
      newErrors.title = 'Please enter a title.';
    }

    if (!description) {
      newErrors.description = 'Please enter a description.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Call the parent component's to add a new todo
    onAddTodo({
      title,
      description,
      dueDate,
      completed: false,
    });

    // Reset the form after submission
    setFormData({ title: '', description: '' });
  };

  return (
    <div className='Todo-div'>
      <form className='Todo-form' onSubmit={handleSubmit}>
    <h2>Todo List</h2>
        <div className='Todo-input'>
          <input
            type="text"
            name="title"
            placeholder='Enter your Title'
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>
        <div className='Todo-input'>
          <input
            type="text"
            name="description"
            placeholder='Enter your Description'
            value={formData.description}
            onChange={handleChange}
          />
          {errors.description && <span className="error">{errors.description}</span>}
        </div>
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};


TodoForm.propTypes = {
    onAddTodo: PropTypes.func.isRequired, 
};

export default TodoForm;
