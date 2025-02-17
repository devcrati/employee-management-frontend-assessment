import { v4 as uuidv4 } from "uuid";
import departments from "./departmentData.json";
import "./index.scss";
import React, { useState, useEffect } from "react";
import DepartmentCard from "./DepartmentCard";
import AddEmployeeForm from "./AddEmployeeForm";

const App = () => {
  const [departments, setDepartments] = useState([]);
  const [newEmployees, setNewEmployees] = useState([]);

  const fetchDepartments = async () => {
    try {
      const response = await fetch(
        "https://api-regional.codesignalcontent.com/employee-management-system/departments"
      );
      const data = await response.json();

      for (const department of data) {
        department.employees = await Promise.all(
          department.employees.map(async (employee) => {
            try {
              const employeeResponse = await fetch(
                `https://api-regional.codesignalcontent.com/employee-management-system/employees/${employee}`
              )
                .then((res) => res.json())
                .catch((err) => null);
              return employeeResponse;
            } catch (err) {
              return null;
            }
          })
        ).then((employees) =>
          employees.filter((employee) => employee !== null)
        ); // Filter out null values
      }

      setDepartments(data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const onSubmit = (value) => {
    setDepartments(
      departments.map((department, index) => {
        if (index === 0) {
          return {
            ...department,
            employees: [
              ...department.employees,
              {
                id: uuidv4(),
                ...value,
              },
            ],
          };
        }
        return department;
      })
    );
  };

  const changeDepartment = (employee, departmentId, newDepartmentId) => {
    setDepartments((prev) =>
      prev.map((department) => {
        if (department.id === departmentId) {
          return {
            ...department,
            employees: department.employees.filter(
              (item) => item.id !== employee.id
            ),
          };
        }

        if (department.id === newDepartmentId) {
          return {
            ...department,
            employees: [...department.employees, employee],
          };
        }

        return department;
      })
    );
  };

  return (
    <main>
      <h2>Add a new employee</h2>
      <AddEmployeeForm onSubmit={onSubmit} />

      <h2>Departments</h2>
      <div className="departments-container">
        {departments.map((item, index) => (
          <DepartmentCard
            key={item.id}
            title={item.title}
            description={item.description}
            employees={item.employees}
            id={item.id}
            departments={departments}
            changeDepartment={changeDepartment}
          />
        ))}
      </div>
    </main>
  );
};

export default App;
