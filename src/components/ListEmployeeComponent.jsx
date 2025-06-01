import React,{useEffect,useState} from 'react';
import { listEmployee } from '../services/employeeService';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';



function ListEmployeeComponent() {

  const [employees,setEmployee] = useState([])
  const navigator = useNavigate();

   useEffect(() => {
     listEmployee().then((Response =>{
        setEmployee(Response.data);

     })).catch(error=>{
        console.error(error);

     })

   },[])

   function addNewEmployee(){
    navigator('/add-employee');
   }

  return (
    <div className='container-fluid' >
      <h2 className='text-center'> Lista de Empleados </h2>
      <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Agregar Empleado</button>

      <table className='table table-striped table-bordered'>
        <thead>
            <tr>
               <th> Id </th>
                <th> first Name </th>
                <th> last Name </th>
                <th> Email </th>
            </tr>
        </thead>
        <tbody>
            {
                employees.map(employee =>
                    <tr key={employee.id}>
                        <td> {employee.id}</td>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.email}</td>

                    </tr>
                )
            }
           
        </tbody>
      </table>
    </div>
  )
}


export default ListEmployeeComponent