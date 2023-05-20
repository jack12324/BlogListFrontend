import axios from "axios";

const baseUrl = "/api/users";

let token = null;

const setToken = (newtoken) => {
  token = newtoken;
};

const create = async (user) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(baseUrl, user, config);
  return response.data;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
const usersService = {
  setToken,
  getAll,
  create,
};
export default usersService;
