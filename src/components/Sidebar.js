import styled from "styled-components";
import useUserStore from "../store/userStore";

const baseApi = process.env.REACT_APP_BASE_API;

const Sidebar = () => {
    const { userDetails, isUserLoggedIn, logout } = useUserStore();

    const logoutUser = () => {
        logout();
    };

    return (
        <>
            {isUserLoggedIn && (<SidebarStyle>
                <img
                    alt={userDetails.name}
                    src={`${baseApi}/users/${userDetails._id}/avatar`}
                />
                <h2>{userDetails.name}</h2>
                <p>{userDetails.email}</p>
                <button onClick={logoutUser}>Logout</button>
            </SidebarStyle>)}
        </>
    );
};

const SidebarStyle = styled.nav`
    width: 20vw;
    height: 100vh;
    background-color: black;
    position: sticky;
    top: 0;
    left: 0;
    padding: 20px;
    color: white;
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;

    img {
        width: 160px;
        height: 160px;
        border-radius: 50%;
        margin-top: 40px;
    };

    h2 {
        margin-top: 16px;
    };

    button {
        margin-top: 22px;
        cursor: pointer;
    };
`;

export default Sidebar;
