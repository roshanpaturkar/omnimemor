import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";

const HomePage = () => {

    const { isUserLoggedIn, userDetails, logout } = useUserStore();

    const navigate = useNavigate();

    useEffect(() => {
      if (!isUserLoggedIn) {
        navigate("/login");
      }
    }, [isUserLoggedIn, navigate]);


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
            <button onClick={logoutUser}>Logout</button>
          </div>
        )}
      </>
    );
}

export default HomePage;
