export default (firebaseError, setError) => {
  const errorMessage = firebaseError
    .slice(firebaseError.lastIndexOf("/") + 1)
    .split("-")
    .join(" ")
    .replaceAll(")", "");

  // If we didnt pass state (setError) where errorMessage will be stored just return errorMessage;
  if (!setError) return errorMessage;

  // If we passed state  (setError) store errorMessage inside them
  switch (error) {
    case error.includes("email"):
      setError((err) => ({
        ...err,
        global: errorMessage,
        forEmail: errorMessage,
      }));
      break;
    case error.includes("password"):
      setError((err) => ({
        ...err,
        global: errorMessage,
        forPassword: errorMessage,
      }));
      break;

    default:
      return "";
  }
};
