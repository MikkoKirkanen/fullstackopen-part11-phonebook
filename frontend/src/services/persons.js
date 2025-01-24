import axios from 'axios'

const baseUrl = import.meta.env.VITE_BASE_URL || '/api/persons'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const create = async (newObject) => {
  const res = await axios.post(baseUrl, newObject)
  return res.data
}

const remove = async (id) => {
  const res = await axios.delete(`${baseUrl}/${id}`)
  return res.data
}

const update = async (updateObject) => {
  const res = await axios.put(baseUrl, updateObject)
  return res.data
}

export default {
  getAll: getAll,
  create: create,
  remove: remove,
  update: update,
}
