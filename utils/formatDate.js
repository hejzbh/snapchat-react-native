export default (datefromprops) => {
  const date = datefromprops ? datefromprops : new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getUTCDate();

  return `${day} / ${month} / ${year}`;
};
