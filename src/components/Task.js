import styled from "styled-components";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useTaskStore from "../store/taskStore";

const Task = (task) => {
  const { updateTask, deleteTask } = useTaskStore();

  const updateTaskData = async (taskId, completed) => {
    toast.info('Updating Task');
    updateTask(taskId, completed).then(() => {
    }).catch((err) => {
      toast.error('Error Updating Task');
    });
  };

  const deleteTaskData = async (taskId) => {
    toast.info('Deleting Task');
    deleteTask(taskId).then(() => {
    }).catch((err) => {
      toast.error('Error Deleting Task');
    });
  };

  return (
    <TaskStyle isDone={task.task.completed}>
      <h4>{task.task.completed ? <span style={{ textDecoration: 'line-through' }}>{task.task.description}</span> : task.task.description}</h4>
      <ButtonRow>
        <Button isDeleteButton={false} onClick={() => updateTaskData(task.task._id, task.task.completed)}>{task.task.completed ? 'Undo' : 'Done'}</Button>
        <Button isDeleteButton={true} onClick={() => deleteTaskData(task.task._id)}>Delete</Button>
      </ButtonRow>
      <ToastContainer theme="dark" />
    </TaskStyle>
  );
};

export default Task;

const TaskStyle = styled.div`
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;
  margin: 10px;
  background-color: ${props => props.isDone ? 'lightgray' : 'white'};

  button {
    padding: 10px;
    outline: none;
    width: 100px;
  }
`

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  justify-content: center;
  gap: 10px;
`

const Button = styled.button`
  background-color: ${props => props.isDeleteButton ? "white" : "black"};
  color: ${props => props.isDeleteButton ? "black" : "white"};
  border-radius: 5px;
  cursor: pointer;
`
