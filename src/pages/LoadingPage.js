import { useEffect } from "react";
import useUserStore from "../store/userStore";
import { useNavigate } from "react-router-dom";

const LoadingPage = () => {
    const navigate = useNavigate();
    const { userToken, getUserDetails } = useUserStore();
    useEffect(() => {
        if (userToken) {
          getUserDetails().then(() => {
            navigate("/home");
          });
        } else {
          navigate("/login");
        }
    } , [userToken, getUserDetails, navigate]);
    return <h2>Loading Page</h2>;
}

export default LoadingPage;
