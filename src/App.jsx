
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent'; // Asegúrate de la ruta correcta
import ListEmployeeComponent from './components/ListEmployeeComponent'; // Asegúrate de la ruta correcta
import FooterComponent from './components/FooterComponent'; // Asegúrate de la ruta correcta
import EmployeeComponent from './components/EmployeeComponent';

function App() {
  return (
    <BrowserRouter>
      <HeaderComponent />
      <Routes>
         {/*http://localhost:3000 */ }
        <Route path="/" element={<ListEmployeeComponent />} />
          {/*http://localhost:3000/employees */ }
        <Route path="/employees" element={<ListEmployeeComponent />} />
        {/*http://localhost:3000/add-employee */ }
        <Route path='/add-employee' element={ <EmployeeComponent/>}> </Route>
      </Routes>
      <FooterComponent />
     
    </BrowserRouter>
  );
}

export default App;

