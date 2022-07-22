import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const comment = async (newObj) => {
  const { id, text } = newObj;
  const response = await axios.post(`${baseUrl}/${id}`, { text });
  return response.data;
};

const deleteObj = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

const update = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, {
    ...blog,
    likes: blog.likes + 1,
  });
  return response.data;
};

// eslint-disable-next-line
export default { getAll, create, comment, update, setToken, deleteObj };
