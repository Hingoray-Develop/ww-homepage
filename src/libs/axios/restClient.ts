import axios from "axios";

const restClient = axios.create({ baseURL: import.meta.env.VITE_API_URL });
export default restClient;
