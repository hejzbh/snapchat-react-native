export default (users, loggedUserID) => {
  const [stranger] = users.filter((user) => user.id !== loggedUserID);
  return stranger;
};
