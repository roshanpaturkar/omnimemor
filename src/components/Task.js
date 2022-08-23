const Task = (task) => {
    return (
        <div className="task">
            <h4>Task: {task.task.description}</h4>
            <h5>Completed: {task.task.completed.toString()}</h5>
        </div>
    );
}

export default Task;
