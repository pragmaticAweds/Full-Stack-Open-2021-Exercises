import axios from "axios";
const baseUrl = "/api/persons";

const getDatas = () => axios.get(baseUrl).then((res) => res.data);

const create = (newObject) =>
  axios.post(baseUrl, newObject).then((res) => res.data);

const update = (id, newObject) =>
  axios.put(`${baseUrl}/${id}`, newObject).then((res) => res.data);

const deleteData = (id) =>
  axios.delete(`${baseUrl}/${id}`).then((res) => res.data);

export default { getDatas, create, update, deleteData };
