import React, { useEffect, useState } from 'react';
import { createEmployee, getEmployee, updateEmployee } from '../services/employeeService';
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
  useEffect(() => {
    // This is the "effect" function that runs after every render
    // where 'id' changes (or on the initial mount).
    if (id) {
      // Check if 'id' has a truthy value (i.e., it's not null, undefined, 0, or an empty string).
      // This prevents trying to fetch data if 'id' isn't available yet.
  
      getEmployee(id)
        // Call the 'getEmployee' function, passing the 'id'.
        // We're assuming 'getEmployee' is a function that makes an asynchronous API call
        // and returns a Promise (e.g., using Axios or Fetch).
  
        .then((response) => {
          // If the API call is successful, this '.then()' block executes.
          // 'response' contains the data returned from the server.
          console.log(response.data)
            setEmployee(response.data);
          // Assuming 'employee' is an object (perhaps from useContext or useState)
          // that has a 'setEmployee' method. This line updates the state or context
          // with the 'data' property of the API response.
        })
        .catch((error) => {
          // If the API call fails for any reason (e.g., network error, server error),
          // this '.catch()' block executes.
          console.error(error);
          // Logs the error to the console, which is helpful for debugging.
        });
    }
  }, [id]); // This is the dependency array.


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

  function saveOrUpdateEmployee(e) {
    e.preventDefault(); // Corrected typo: preventDefault()
    console.log(employee);
    // In a real application, you would typically send this 'employee' object
    // to a backend API (e.g., using Axios or Fetch)
    // Example: axios.post('/api/employees', employee)
    //alert('Employee saved! Check the console for details.');

    if (validateForm()) {
       if (id){
         console.log(employee);
          updateEmployee(id,employee).then((response)=>{
            console.log(response.data);
            navigator('/employees')
          }).catch.error(error =>{
            console.error(error);
          })
       }else{
          createEmployee(employee).then((Response)=>{
            console.log(Response.data);
            navigator('/employees')
          }).catch(error=>{
            console.error(error);
      
          })
       }
       

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

              <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Guardar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeComponent;