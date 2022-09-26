import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Task from "../components/Task";
import useUserStore from "../store/userStore";
import useTaskStore from "../store/taskStore";
import styled from "styled-components";

const HomePage = () => {
  const { isUserLoggedIn, userDetails, logout } = useUserStore();
  const { tasks, getAllTask } = useTaskStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate("/login");
    }
    getAllTask();
  }, [getAllTask, isUserLoggedIn, navigate]);

  const logoutUser = () => {
    logout();
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
          <h2>Home Page!</h2>
          <h3>Name: {userDetails.name}</h3>
          <h3>Email: {userDetails.email}</h3>
          {tasks.map((task) => (
            <Task task={task} key={task._id} />
          ))}
          <button onClick={logoutUser}>Logout</button>
        </div>
      )}
    </HomePageWrapper>
  );
};

export default HomePage;

const HomePageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  button {
    padding: 10px;
    outline: none;
    border: none;
    width: 100px;
    border-radius: 5px;
  }
`;
