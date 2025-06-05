import axios from "axios";


const REST_API_BASE_URL = 'http://localhost:8080/api/v1/employees';

export const listEmployee = () => axios.get(REST_API_BASE_URL);
export const createEmployee = (employee) => axios.post(REST_API_BASE_URL,employee);

/*
otra manera de hacerlo 
export const createEmployee = (employee) => {
    return axios.post(REST_API_BASE_URL, employee);
};*/
/* get employee for id */
export const getEmployee = (employeeId) => axios.get(REST_API_BASE_URL+'/'+employeeId);

export const updateEmployee = (employeeId,employee) => axios.put(REST_API_BASE_URL+'/'+employeeId,employee);