import React,{useEffect,useState} from 'react'
import { listEmployee } from '../services/employeeService'

function ListEmployeeComponent() {

  const [employees,setEmployee] = useState([])

   useEffect(() => {
     listEmployee().then((Response =>{
        setEmployee(Response.data);

     })).catch(error=>{
        console.error(error);

     })

   },[])

  return (
    <div className='container'>
      <h2 className='text-center'> Lista de Empleados </h2>
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