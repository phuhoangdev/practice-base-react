import axios from "./customize-axios";

const fetchAllUser = (page) => {
   return axios.get(`/api/users?page=${page}`);
};

const createNewUser = (name, job) => {
   return axios.post("/api/users", { name, job });
};

const updateUser = (id, name, job) => {
   return axios.put(`/api/users/${id}`, { name, job });
};

const deleteUser = (id) => {
   return axios.delete(`/api/users/${id}`);
};

const loginApi = (email, password) => {
   return axios.post("/api/login", { email, password });
};
export { fetchAllUser, createNewUser, updateUser, deleteUser, loginApi };
