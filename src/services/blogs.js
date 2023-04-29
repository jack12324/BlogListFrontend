import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newtoken => {
  token = newtoken
}

const create = async blog => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
const service = {setToken, getAll, create}
export default service