import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/taskSlice';

export default function TaskForm() {
  const dispatch = useDispatch();
  
  // Local state to handle form inputs
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    category: 'Work',
    dueDate: '',
  });

  // Update state as user types
  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  // Handle the submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Assemble the final task object with an ID and a default Kanban status
    const newTask = {
      ...formData,
      id: crypto.randomUUID(), // Generates a unique ID instantly
      status: 'Todo', // Every new task starts in the "Todo" column
    };

    // Send it to Redux!
    dispatch(addTask(newTask));
    
    // Reset the form so it's ready for the next task
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