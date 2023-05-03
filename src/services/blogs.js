import axios from 'axios';

const baseUrl = '/api/blogs';

let token = null;

const setToken = (newtoken) => {
  token = newtoken;
};

const create = async (blog) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const update = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog);
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
const service = {
  setToken, getAll, create, update, deleteBlog,
};
export default service;
