import axios from "axios";


const REST_API_BASE_URL = 'http://localhost:8080/api/v1/employees';

export const listEmployee = () => axios.get(REST_API_BASE_URL);
export const createEmployee = (employee) => axios.post(REST_API_BASE_URL,employee);

/*export const createEmployee = (employee) => {
    return axios.post(REST_API_BASE_URL, employee);
};*/