import axios from "axios";

const baseUrl = "/api/users";

const getAllUsers = async () => {
  const response = await axios(baseUrl);
  return response.data;
};

export default getAllUsers;
