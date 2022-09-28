import axios from 'axios';
import styled from "styled-components";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserToken } from '../utils/userManager';
import { customLogger, httpErrorLogger } from '../utils/logsManager';
import useTaskStore from "../store/taskStore";

const baseApi = process.env.REACT_APP_BASE_API;

const Task = (task) => {
  const { refreshTasks: getAllTask } = useTaskStore();

  const updateTask = async (taskId, completed) => {
    customLogger('Updating Task');
    toast.info('Updating Task');
    const token = getUserToken();
    if (token) {
      await axios.patch(`${baseApi}/tasks/${taskId}`, {
        completed: !completed,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        getAllTask().then(() => {
          toast.success('Task Updated Successfully');
        });
      }).catch((err) => {
        httpErrorLogger(err);
        toast.error('Error Updating Task');
      });
    }
  };

  const deleteTask = async (taskId) => {
    customLogger('Deleting Task');
    toast.info('Deleting Task');
    const token = getUserToken()
    await axios.delete(`${baseApi}/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      getAllTask().then(() => {
        toast.success('Task Deleted Successfully');
      });
    }).catch((err) => {
      httpErrorLogger(err);
      toast.error('Error Deleting Task');
    });
  };

  return (
    <TaskStyle isDone={task.task.completed}>
      <h4>{task.task.completed ? <span style={{ textDecoration: 'line-through' }}>{task.task.description}</span> : task.task.description}</h4>
      <ButtonRow>
        <Button isDeleteButton={false} onClick={() => updateTask(task.task._id, task.task.completed)}>{task.task.completed? 'Undo': 'Done'}</Button>
        <Button isDeleteButton={true} onClick={() => deleteTask(task.task._id)}>Delete</Button>
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
`
