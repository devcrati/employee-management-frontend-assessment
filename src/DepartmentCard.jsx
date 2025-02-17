import React, {useState, useEffect} from "react";

const DepartmentCard = ({ id, title, description, employees, newEmployees, departments, changeDepartment }) => {
  return (
    <div className="department">
      <h3 className="department__title">{title}</h3>
      <p className="department__description">{description}</p>
      <div className="department__employees">
        {[...employees, ...newEmployees].map((employee) => (
          <div className="employee" key={employee.id}>
            <h4 className="employee__name">{`${employee.firstName} ${employee.lastName}`}</h4>
            <select className="employee__select-btn" name="department" value={id} onChange={e => changeDepartment(employee, id, e.target.value)}>
              {departments.map(department => (
                <option value={department.id} key={department.id}>
                  {department.title}
                </option>
              ))}
            </select>
            <span className="employee__position">{employee.position}</span>
          </div>
        ))}
      </div>
    </div>
  )
};

export default DepartmentCard;
