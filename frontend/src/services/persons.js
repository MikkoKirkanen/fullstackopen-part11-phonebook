import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL || '/api/persons';

const getAll = () => {
  return axios.get(baseUrl).then((res) => res.data);
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject).then((res) => res.data);
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((res) => res.data);
};

const update = (updateObject) => {
  return axios.put(baseUrl, updateObject).then((res) => res.data);
};

export default {
  getAll: getAll,
  create: create,
  remove: remove,
  update: update,
};
