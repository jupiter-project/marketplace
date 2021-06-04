const getEllipsis = (str, first = 6, last = -4) => {
  return `${str.slice(0, first)}...${str.slice(last)}`;
};

export default getEllipsis