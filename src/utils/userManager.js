export const getUserData = (user) => {
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
