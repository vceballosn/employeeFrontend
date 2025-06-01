import React, { useState } from 'react';
import { createEmployee } from '../services/employeeService';
import { useNavigate  } from 'react-router-dom';

function EmployeeComponent() {
  // Use a single state object for employee details
  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const navigator = useNavigate();
  // Generic handler for all input changes
  function handleChange(e) {
    const { name, value } = e.target;
    //console.log(name +" valor "+value)
    setEmployee(prevEmployee => ({
      ...prevEmployee, // Spread existing employee properties
      [name]: value    // Update the property corresponding to the input's 'name' attribute
    }));
  }

  function saveEmployee(e) {
    e.preventDefault(); // Corrected typo: preventDefault()
    console.log(employee);
    // In a real application, you would typically send this 'employee' object
    // to a backend API (e.g., using Axios or Fetch)
    // Example: axios.post('/api/employees', employee)
    //alert('Employee saved! Check the console for details.');

    createEmployee(employee).then((Response)=>{
     console.log(Response.data);
     navigator('/employees')
    }).catch(error=>{
      console.error(error);

   })
  }

  return (
    <div className='container-fluid'>
      <br/> <br/>
      <div className='row'>
        <div className='card col-md-30 offset-md-3 offset-md-3'> {/* Added Bootstrap column classes for centering */}
          <h2 className='text-center'>Agregar Empleado</h2>
          <div className='card-body'>
            <form>
              <div className='form-group mb-2'>
                <label className='form-label'>Primer Nombre</label>
                <input
                  type='text'
                  placeholder='Ingrese El Primer Nombre'
                  name='firstName' // Correct 'name' attribute
                  value={employee.firstName} // Bind value to state object
                  className='form-control'
                  onChange={handleChange} // Use generic handler
                /> {/* Self-closing input tag */}
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Segundo Nombre</label>
                <input
                  type='text'
                  placeholder='Ingrese El Segundo Nombre'
                  name='lastName' // Correct 'name' attribute
                  value={employee.lastName} // Bind value to state object
                  className='form-control'
                  onChange={handleChange} // Use generic handler
                /> {/* Self-closing input tag */}
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Email</label>
                <input
                  type='text' // Corrected type to 'email'
                  placeholder='Ingrese Email'
                  name='email' // Correct 'name' attribute
                  value={employee.email} // Bind value to state object
                  className='form-control'
                  onChange={handleChange} // Use generic handler
                /> {/* Self-closing input tag */}
              </div>

              <button className='btn btn-success' onClick={saveEmployee}>Guardar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeComponent;