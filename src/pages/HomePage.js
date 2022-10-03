import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "../components/Sidebar";
import Task from "../components/Task";
import useUserStore from "../store/userStore";
import useTaskStore from "../store/taskStore";

const HomePage = () => {
  const { isUserLoggedIn} = useUserStore();
  const { pendingTasks, completedTasks, refreshTasks, addTask } = useTaskStore();

  const [task, setTask] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate("/login");
    }
    refreshTasks();
  }, [refreshTasks, isUserLoggedIn, navigate]);

  const taskInputHandler = (e) => {
    setTask(e.target.value);
  };

  const addTaskData = (e) => {
    if (task) {
      toast.info('Adding Task');
      addTask(task).then(() => {
        toast.success('Task Added Successfully');
      });
    } else {
      toast.error('Please enter a task');
    }
    setTask("");
  };

  return (
    <HomePageWrapper>
      <Sidebar />
      {isUserLoggedIn && (
        <div
          style={{
            width: "75vw",
            height: "200vh",
            display: "flex",
            flexDirection: "column",
            padding: "40px",
            gap: "20px",
          }}
        >
          <h1>Omnimemor</h1>
          <TaskInputWrapper>
              <TaskInput value={task}  onChange={taskInputHandler} placeholder="Add a task" />
            <AddTaskButton onClick={addTaskData}>Add</AddTaskButton>
          </TaskInputWrapper>
          <h3>Pending Task</h3>
          <Tasks>
            {pendingTasks.map((task) => (
              <Task task={task} key={task._id} />
            ))}
          </Tasks>
          <h3>Completed Task</h3>
          <Tasks>
            {completedTasks.map((task) => (
              <Task task={task} key={task._id} />
            ))}
          </Tasks>
        </div>
      )}
      <ToastContainer theme="dark" />
    </HomePageWrapper>
  );
};

export default HomePage;

const HomePageWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const TaskInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 100%;
  justify-content: center;

  button {
    padding: 10px;
    outline: none;
    width: 100px;
  }
`

const TaskInput = styled.input`
  padding: 10px;
  outline: none;
  width: 70%;
  border-radius: 25px;
`

const AddTaskButton = styled.button`
  padding: 10px;
  background-color:black;
  color: white;
  border-radius: 25px;
  cursor: pointer;
`

const Tasks = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`;
