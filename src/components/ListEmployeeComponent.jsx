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

   function updateEmployee(id){
   
    navigator(`/edit-employee/${id}`);
   }

  return (
    <div className='container-fluid' >
      <h2 className='text-center'> Lista de Empleados </h2>
      <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Agregar Empleado</button>

      <table className='table table-striped table-bordered'>
        <thead>
            <tr>
               <th> Id </th>
                <th> Primer Nombre </th>
                <th> Segundo Nombre </th>
                <th> Correo </th>
                <th> Accion </th>
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
                        <td>
                          <button className='btn btn-info'onClick={()=> updateEmployee(employee.id)}> Modificar  </button>
                        </td>

                    </tr>
                )
            }
           
        </tbody>
      </table>
    </div>
  )
}


export default ListEmployeeComponent