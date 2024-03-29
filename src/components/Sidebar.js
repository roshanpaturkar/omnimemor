import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Buffer } from "buffer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useUserStore from "../store/userStore";
import useTaskStore from "../store/taskStore";
import useSidebarStateManagerStore from "../store/sidebarStateManagerStore";
import { customLogger, httpErrorLogger } from "../utils/logsManager";

const Sidebar = () => {
    const { userDetails, isUserLoggedIn, logout, logoutAll, updateAvatar, updateName, resetUserState } = useUserStore();
    const { isUpdateProfileOpen, setUpdateProfileOpen, isUpdateNameOpen, setUpdateNameOpen, isUpdatePasswordOpen, setUpdatePasswordOpen, isLogoutOptionOpen, setLogoutOptionOpen, isDeleteAccountOpen, setDeleteAccountOpen } = useSidebarStateManagerStore();
    const { resetTasksTest } = useTaskStore();

    const [avatarSource, setAvatarSource] = useState(userDetails ? userDetails.avatar : '');
    const [name, setName] = useState(userDetails ? userDetails.name : '');

    useEffect(() => {
        const getAvatarData = () => {
            axios
                .get(userDetails.avatar)
                .then((response) =>
                    setAvatarSource(Buffer.from(response.data.image).toString("base64"))
                );
        }
        getAvatarData();
    }, [userDetails.avatar]);

    const logoutUserThisDevice = () => {
        toast.info('Logging out');
        logout().then(() => {
            setLogoutOptionOpen(false);
        });
    };

    const logoutUserAllDevices = () => {
        toast.info('Logging out');
        logoutAll().then(() => {
            setLogoutOptionOpen(false);
        });
    }

    const initialValues = {
        oldPassword: '',
        newPassword: '',
    };

    const [values, setValues] = useState(initialValues);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
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
                axios 
                    .get(userDetails.avatar)
                    .then((response) => 
                        setAvatarSource(Buffer.from(response.data.image).toString("base64"))
                    );
                setUpdateProfileOpen(false);
            });
        }
    }

    const nameInputHandler = (e) => {
        setName(e.target.value);
    };

    const updateNameDetails = () => {
        if (name && name.trim() !== '') {
            toast.info('Updating Name');
            updateName(name).then(() => {
                setUpdateNameOpen(false);
            });
        } else {
            toast.error('Please enter a name');
        }
    }

    const updatePasswordDetails = async () => {
        if (values.oldPassword && values.oldPassword.trim() !== '' && values.newPassword && values.newPassword.trim() !== '') {
            if (values.newPassword.length < 7) {
                toast.error('Password should be atleast 7 characters long');
            } else {
                toast.info('Updating Password');
                customLogger('Updating User Password');
                const token = localStorage.getItem('userToken');
                if (token) {
                    await axios
                        .patch(
                            `${process.env.REACT_APP_BASE_API}/users/me/password`, {
                            oldPassword: values.oldPassword.trim(),
                            newPassword: values.oldPassword.trim()
                        },
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            }
                        ).then(() => {
                            setValues(initialValues);
                            setUpdatePasswordOpen(false);
                            resetUserState();
                        })
                        .catch((err) => {
                            httpErrorLogger(err);
                            toast.error('Old Password is incorrect!');
                        });
                }
            }
        } else {
            toast.error('Please enter old and new password');
        }
    };

    const deleteAccount = async () => {
        if (values.newPassword && values.newPassword.trim() !== '') {
            const token = localStorage.getItem('userToken');
            if (token) {
                customLogger('Deleting User Account');
                toast.info('Deleting Account');
                await axios.delete(`${process.env.REACT_APP_BASE_API}/users/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    data: {
                        password: values.newPassword.trim(),
                    },
                }).then(() => {
                    resetTasksTest();
                    setValues(initialValues);
                    setDeleteAccountOpen(false);
                }).catch((err) => {
                    httpErrorLogger(err);
                    toast.error('Password is incorrect!');
                    setValues(initialValues);
                });
            }
        } else {
            toast.error('Please enter password');
        }
    }

    return (
        <>
            {isUserLoggedIn && (<SidebarStyle>
                <img
                    alt={userDetails.name}
                    src={"data:image/jpeg;base64," + avatarSource}
                    onError={(e) => {
                        e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png';
                    }}
                    onDoubleClick={() => setUpdateProfileOpen(true)}
                />
                {isUpdateProfileOpen && <AvatarUpdater type='file' onChange={avatarInputHandler} />}
                {isUpdateProfileOpen && <button onClick={() => setUpdateProfileOpen(false)}>Cancel</button>}
                <h2 onDoubleClick={() => setUpdateNameOpen(true)}>{userDetails.name}</h2>
                {isUpdateNameOpen && <NameUpdateWrapper>
                    <input value={name} onChange={nameInputHandler} type="text" placeholder="Update Name" />
                    {isUpdateNameOpen && <ButtonsRowWrapper>
                        <button onClick={updateNameDetails}>Update</button>
                        <button onClick={() => setUpdateNameOpen(false)}>Cancel</button>
                    </ButtonsRowWrapper>}
                </NameUpdateWrapper>}
                <p>{userDetails.email}</p>
                {isUpdatePasswordOpen && <PasswordWrapper>
                    <input value={values.oldPassword} onChange={handleInputChange} type="password" name="oldPassword" placeholder="Old Password" />
                    <input value={values.newPassword} onChange={handleInputChange} type="password" name="newPassword" placeholder="New Password" />
                    {isUpdatePasswordOpen && <ButtonsRowWrapper>
                        <button onClick={() => updatePasswordDetails()}>Change</button>
                        <button onClick={() => setUpdatePasswordOpen(false)}>Cancel</button>
                    </ButtonsRowWrapper>}
                </PasswordWrapper>}
                {!isUpdatePasswordOpen && <button onClick={() => setUpdatePasswordOpen(true)}>Change Password</button>}
                {isDeleteAccountOpen && <PasswordWrapper>
                    <input value={values.newPassword} onChange={handleInputChange} type="password" name="newPassword" placeholder="Password" />
                    <ButtonsRowWrapper>
                        <button onClick={() => deleteAccount()}>Delete</button>
                        <button onClick={() => setDeleteAccountOpen(false)}>Cancel</button>
                    </ButtonsRowWrapper>
                </PasswordWrapper>}
                {!isDeleteAccountOpen && <button onClick={() => setDeleteAccountOpen(true)}>Delete Account</button>}
                {!isLogoutOptionOpen && <button onClick={() => setLogoutOptionOpen(true)}>Logout</button>}
                {isLogoutOptionOpen && <ButtonsRowWrapper>
                    <button onClick={() => logoutUserThisDevice()}>This Device</button>
                    <button onClick={() => logoutUserAllDevices()}>All Device</button>
                </ButtonsRowWrapper>}
                {isLogoutOptionOpen && <button onClick={() => setLogoutOptionOpen(false)}>cancle</button>}
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
        background-color: white;
        width: 160px;
        height: 160px;
        border-radius: 50%;
        margin-top: 40px;
        cursor: pointer;
    };

    h2 {
        margin-top: 16px;
        cursor: pointer;
    };

    p {
        margin-bottom: 16px;
    }

    button {
        width: 75%;
        padding: 10px;
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

const NameUpdateWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;

    input {
        width: 200px;
        height: 30px;
        border-radius: 5px;
        border: none;
        padding: 8px;
    }
`;

const PasswordWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;

    input {
        width: 200px;
        height: 30px;
        border-radius: 5px;
        border: none;
        padding: 8px;
    }
`;

const ButtonsRowWrapper = styled.div`
    width: 75%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 8px;
`;

export default Sidebar;
