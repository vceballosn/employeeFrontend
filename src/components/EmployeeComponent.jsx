import React, { useState } from 'react';
import { createEmployee } from '../services/employeeService';
import { useNavigate, useParams  } from 'react-router-dom';

function EmployeeComponent() {
  const {id}  = useParams();
  // Use a single state object for employee details
  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const navigator = useNavigate();
  const [errors,setErrors]  = useState({
    firstName:'',
    lastName:'',
    email:''

  })

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

    if (validateForm()) {
        createEmployee(employee).then((Response)=>{
        console.log(Response.data);
        navigator('/employees')
       }).catch(error=>{
         console.error(error);
   
      })

    }

    
  }
  function validateForm(){
    let valid =true;
    const errorCopy ={... errors}

    if(employee.firstName.trim() ){
      errorCopy.firstName='';
    }else{
      errorCopy.firstName = 'First Name is Required';
      valid =false;
    }
    if(employee.lastName.trim()){
      errorCopy.lastName ='';
    }else{
      errorCopy.lastName =' Last Name is Required'
      valid=false;
    }
    if(employee.email.trim()){
      errorCopy.email='';
    }else{
     errorCopy.email='Email is Requiered';
     valid = false;
    }
    setErrors(errorCopy);
   return valid;
  }
  function pageTitle(){
    if(id){
      return  <h2 className='text-center'>Modificar Empleado</h2>
    }else{
      return <h2 className='text-center'>Agregar Empleado</h2>
    }
  }
  return (
    <div className='container-fluid'>
      <br/> <br/>
      <div className='row'>
        <div className='card col-md-30 offset-md-3 offset-md-3'> {/* Added Bootstrap column classes for centering */}
         {pageTitle()}
          <div className='card-body'>
            <form>
              <div className='form-group mb-2'>
                <label className='form-label'>Primer Nombre</label>
                <input
                  type='text'
                  placeholder='Ingrese El Primer Nombre'
                  name='firstName' // Correct 'name' attribute
                  value={employee.firstName} // Bind value to state object
                  className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                  onChange={handleChange} // Use generic handler
                /> {/* Self-closing input tag */}
                {errors.firstName && <div className='invalid-feedback'>{errors.firstName} </div>}
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Segundo Nombre</label>
                <input
                  type='text'
                  placeholder='Ingrese El Segundo Nombre'
                  name='lastName' // Correct 'name' attribute
                  value={employee.lastName} // Bind value to state object
                  className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                  onChange={handleChange} // Use generic handler
                /> {/* Self-closing input tag */}
                 {errors.lastName && <div className='invalid-feedback'>{errors.lastName} </div>}
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Email</label>
                <input
                  type='text' // Corrected type to 'email'
                  placeholder='Ingrese Email'
                  name='email' // Correct 'name' attribute
                  value={employee.email} // Bind value to state object
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  onChange={handleChange} // Use generic handler
                /> {/* Self-closing input tag */}
                 {errors.email && <div className='invalid-feedback'>{errors.email} </div>}
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