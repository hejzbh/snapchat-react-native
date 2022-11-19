export default (name, value) => {
  if (!value) return "";

  switch (name) {
    case "email":
      return value.toLowerCase().trim();
      break;
    case "first_name" || "last_name":
      return (
        value[0].toUpperCase() +
        (value.slice(1) ? value.slice(1).toLowerCase() : "").replaceAll(" ", "")
      );
      break;

    default:
      return value;
  }
};
