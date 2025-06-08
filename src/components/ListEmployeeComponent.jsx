import React,{useEffect,useState} from 'react';
import { deleteEmployee, listEmployee } from '../services/employeeService';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';



function ListEmployeeComponent() {

  const [employees,setEmployee] = useState([])
  const navigator = useNavigate();

   useEffect(() => {
     getAllEmployee();

   },[])

   function getAllEmployee(){
        listEmployee().then((Response =>{
          setEmployee(Response.data);

      })).catch(error=>{
          console.error(error);

      })
   }

   function addNewEmployee(){
    navigator('/add-employee');
   }

   function updateEmployee(id){
   
    navigator(`/edit-employee/${id}`);
   }
   function removeEmployee (id){
    console.log(id);
    deleteEmployee(id).then((Response)=>{
    getAllEmployee();
    }).catch(error => {
      console.error(error);
    }) 
   }

  return (
    <div className='container-fluid' >
      <h2 className='text-center'> Lista de Empleados </h2>
      <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Agregar Empleado</button>

      <table className='table table-striped table-bordered'>
        <thead>
            <tr>
               <th> Id </th>
                <th>  Nombre </th>
                <th>  Apellido </th>
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
                          <button className='btn btn-danger'onClick={()=> removeEmployee(employee.id)} style ={{ marginLeft: '10px' }}>  Eliminar </button>
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