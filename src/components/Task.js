const Task = (task) => {
  return (
    <div className="task">
      <h4>Task: {task.task.description}</h4>
      <p>Completed: {task.task.completed.toString()}</p>
    </div>
  );
};

export default Task;
