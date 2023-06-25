export const getError = () => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};
