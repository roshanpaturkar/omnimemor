import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import PendingTask from "../components/PendingTask";
import CompletedTask from "../components/CompletedTask";
import useUserStore from "../store/userStore";
import useTaskStore from "../store/taskStore";
import styled from "styled-components";

const HomePage = () => {
  const { isUserLoggedIn} = useUserStore();
  const { pendingTasks, completedTasks, getAllTask } = useTaskStore();

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
          <h3>Pending Task</h3>
          <PendingTasks>
            {pendingTasks.map((task) => (
              <PendingTask task={task} key={task._id} />
            ))}
          </PendingTasks>
          <h3>Completed Task</h3>
          <CompletedTasks>
            {completedTasks.map((task) => (
              <CompletedTask task={task} key={task._id} />
            ))}
          </CompletedTasks>
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

const PendingTasks = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`;

const CompletedTasks = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`;
