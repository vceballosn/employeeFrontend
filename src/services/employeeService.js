import axios from "axios";


const REST_API_BASE_URL = 'http://localhost:8080/api/v1/employees';

//const REST_API_BASE_URL = 'http://localhost:8080/api/v1/mongo/employees';

export const listEmployee = () => axios.get(REST_API_BASE_URL);
export const createEmployee = (employee) => axios.post(REST_API_BASE_URL,employee);

/*
otra manera de hacerlo 
export const createEmployee = (employee) => {
    return axios.post(REST_API_BASE_URL, employee);
};*/
/* get employee for id */
export const getEmployee = (employeeId) => axios.get(REST_API_BASE_URL+'/'+employeeId);
// export const updateEmployee = (employeeId,employee) => axios.put(REST_API_BASE_URL+'/'+employeeId,employee);
export const updateEmployee = (employeeId,employee) => axios.put(REST_API_BASE_URL,employee);
export const deleteEmployee = (employeeId) => axios.delete(REST_API_BASE_URL+'/'+employeeId)