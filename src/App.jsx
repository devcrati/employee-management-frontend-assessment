import { v4 as uuidv4 } from "uuid";
import departments from "./departmentData.json";
import "./index.scss";
import React, { useState } from "react";
import DepartmentCard from "./DepartmentCard";
import AddEmployeeForm from "./AddEmployeeForm";

const App = () => {
  const [employees, setEmployees] = useState(departments[0].employees);

  const onSubmit = (value) => {
    setEmployees((prev) => [
      ...prev,
      {
        id: uuidv4(),
        ...value,
      },
    ]);
  };

  return (
    <main>
      <h2>Add a new employee</h2>
      <AddEmployeeForm onSubmit={onSubmit} />

      <h2>Departments</h2>
      <div className="departments-container">
        <DepartmentCard
          title={departments[0].title}
          description={departments[0].description}
          employees={employees}
        />
        <DepartmentCard
          title={departments[1].title}
          description={departments[1].description}
          employees={departments[1].employees}
        />
        <DepartmentCard
          title={departments[2].title}
          description={departments[2].description}
          employees={departments[2].employees}
        />
      </div>
    </main>
  );
};

export default App;
