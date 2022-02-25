import axios from 'axios'

const instance = axios.create()

instance.defaults.baseURL = 'http://localhost:5050/api/v1'

export default instance
