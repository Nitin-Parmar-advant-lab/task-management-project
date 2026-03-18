import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/taskSlice';

export default function TaskForm() {
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    category: 'Work',
    dueDate: '',
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newTask = {
      ...formData,
      id: crypto.randomUUID(),
      status: 'Todo', 
    };

    dispatch(addTask(newTask));
    
    setFormData({
      title: '',
      description: '',
      priority: 'Medium',
      category: 'Work',
      dueDate: '',
    });
  };

  return (
    <div className="task-form-container" style={{ border: '1px solid #ccc', padding: '20px', maxWidth: '400px' }}>
      <h3>Create New Task</h3>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        <input 
          type="text" 
          name="title" 
          placeholder="Task Title" 
          value={formData.title} 
          onChange={handleChange} 
          required 
        />
        
        <textarea 
          name="description" 
          placeholder="Task Description" 
          value={formData.description} 
          onChange={handleChange} 
        />
        
        <select name="priority" value={formData.priority} onChange={handleChange}>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        
        <input 
          type="text" 
          name="category" 
          placeholder="Category (e.g., Work, Personal)" 
          value={formData.category} 
          onChange={handleChange} 
        />
        
        <input 
          type="date" 
          name="dueDate" 
          value={formData.dueDate} 
          onChange={handleChange} 
        />
        
        <button type="submit" style={{ cursor: 'pointer', padding: '10px' }}>
          Create Task
        </button>
      </form>
    </div>
  );
}