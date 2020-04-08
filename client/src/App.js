import React from 'react';
import AppNavbar from './components/AppNavbar';
import EmployeeAbsenceList from './components/EmployeesAbsenceList';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <AppNavbar />
      <EmployeeAbsenceList />
    </div>
  );
}

export default App;
