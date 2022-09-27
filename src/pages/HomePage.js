import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Task from "../components/Task";
import useUserStore from "../store/userStore";
import useTaskStore from "../store/taskStore";
import styled from "styled-components";

const HomePage = () => {
  const { isUserLoggedIn} = useUserStore();
  const { tasks, getAllTask } = useTaskStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate("/login");
    }
    getAllTask();
  }, [getAllTask, isUserLoggedIn, navigate]);

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
          <h2>Tasks!</h2>
          {tasks.map((task) => (
            <Task task={task} key={task._id} />
          ))}
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
