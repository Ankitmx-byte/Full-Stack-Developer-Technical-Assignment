import { useState } from 'react';

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editedTitle.trim() && editedTitle !== task.title) {
      onEdit(task.id, editedTitle.trim());
    }
    setIsEditing(false);
  };

  return (
    <div className="task-item">
      <div className="task-content">
        <input
          type="checkbox"
          className="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id, !task.completed)}
        />
        {isEditing ? (
          <form className="edit-form" onSubmit={handleEditSubmit}>
            <input
              type="text"
              className="edit-input"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              autoFocus
              onBlur={handleEditSubmit}
            />
          </form>
        ) : (
          <span 
            className={`task-title ${task.completed ? 'completed' : ''}`}
            onDoubleClick={() => setIsEditing(true)}
            title="Double click to edit"
          >
            {task.title}
          </span>
        )}
      </div>
      <button className="btn danger" onClick={() => onDelete(task.id)} title="Delete Task">
        ✕
      </button>
    </div>
  );
}

export default TaskItem;
