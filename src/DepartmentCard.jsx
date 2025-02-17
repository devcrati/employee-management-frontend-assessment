import React from "react";

const DepartmentCard = ({ title, description, employees }) => (
  <div className="department">
    <h3 className="department__title">{title}</h3>
    <p className="department__description">{description}</p>
    <div className="department__employee">
      {employees.map((employee) => (
        <div className="employee" key={employee.id}>
          <h4 className="employee__name">{`${employee.firstName} ${employee.lastName}`}</h4>
          <span className="employee__position">{employee.position}</span>
        </div>
      ))}
    </div>
  </div>
);

export default DepartmentCard;
