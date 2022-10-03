import { useState } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useUserStore from "../store/userStore";
import useSidebarStateManagerStore from "../store/sidebarStateManagerStore";

const Sidebar = () => {
    const { userDetails, isUserLoggedIn, logout, updateAvatar } = useUserStore();
    const { isUpdateProfileOpen, setUpdateProfileOpen } = useSidebarStateManagerStore();

    const [source, setSource] = useState(userDetails.avatar);

    const logoutUser = () => {
        logout();
    };

    const avatarInputHandler = (event) => {
        const avatar = event.target.files[0];

        if (avatar.size > 1000000) {
            toast.error('Avatar size should be less than 1MB');
        } else {
            toast.info('Updating Avatar');
            const avatarData = new FormData();
            avatarData.append("avatar", avatar, avatar.name);

            updateAvatar(avatarData).then(() => {
                setSource(`${userDetails.avatar}?${new Date().getTime()}`);
                setUpdateProfileOpen(false);
                toast.success('Avatar Updated Successfully');
            });
        }
    }

    return (
        <>
            {isUserLoggedIn && (<SidebarStyle>
                <img
                    alt={userDetails.name}
                    src={source}
                    onClick={() => setUpdateProfileOpen(true)}
                />
                {isUpdateProfileOpen && <AvatarUpdater type='file' onChange={avatarInputHandler} /> }
                <h2>{userDetails.name}</h2>
                <p>{userDetails.email}</p>
                <button onClick={logoutUser}>Logout</button>
            </SidebarStyle>)}
            <ToastContainer theme="dark" />
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
        cursor: pointer;
    };

    h2 {
        margin-top: 16px;
    };

    button {
        margin-top: 22px;
        background-color: white;
        color: black;
        border-radius: 5px;
        cursor: pointer;
    };
`;

const AvatarUpdater = styled.input`
    margin-top: 8px;
    width: 200px;
    height: 30px;
    border-radius: 5px;
    border: none;
    padding: 8px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

export default Sidebar;
