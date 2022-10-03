export const getUserData = (user) => {
    user.avatar = `${process.env.REACT_APP_BASE_API}/users/${user._id}/avatar`;

    delete user.age;
    delete user.createdAt;
    delete user.updatedAt;

    return user;
}

export const getUserToken = () => {
    const token = localStorage.getItem('userToken');
    if (token) {
        return token;
    }
}
