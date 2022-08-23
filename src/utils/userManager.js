export const getUserData = (user) => {
    delete user.age;
    delete user.createdAt;
    delete user.updatedAt;

    return user;
}