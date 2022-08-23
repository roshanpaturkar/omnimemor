import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Task from '../components/Task'
import useUserStore from '../store/userStore';
import useTaskStore from '../store/taskStore';

const HomePage = () => {

  const { isUserLoggedIn, userDetails, logout } = useUserStore();
  const { tasks, getAllTask } = useTaskStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate('/login');
    }
    getAllTask();
  }, [getAllTask, isUserLoggedIn, navigate]);

  const logoutUser = () => {
    logout();
  }

  return (
    <>
      {isUserLoggedIn && (
        <div>
          <h2>Home Page!</h2>
          <h3>Name: {userDetails.name}</h3>
          <h3>Email: {userDetails.email}</h3>
          {tasks.map((task) => (
            <Task
              task={task}
              key={task._id}
            />
          ))}
          <button onClick={logoutUser}>Logout</button>
        </div>
      )}
    </>
  );
}

export default HomePage;
