import React, { useState } from "react";

const AddEmployeeForm = ({ onSubmit }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstName !== "" && lastName !== "" && position !== "")
    {
      setFirstName("");
      setLastName("");
      setPosition("");
      onSubmit({ firstName, lastName, position });
    }
    
  };

  return (
    <div className="add-employee-form">
      <form onSubmit={handleSubmit}>
        <input
          name="firstName"
          placeholder="First name*"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          name="lastName"
          placeholder="Last name*"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          name="position"
          placeholder="Position*"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <input type="submit" value="Add" />
      </form>
    </div>
  );
};

export default AddEmployeeForm;
