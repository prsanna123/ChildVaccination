import React, { useState } from 'react';
import {Link} from "react-router-dom"
function Hospital() {
  const [formData, setFormData] = useState({
    parentName: '',
    phoneNumber: '',
    birthDate: '',
    hospitalname:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {parentName,phoneNumber,birthDate,hospitalname}=formData
    const response=await fetch("http://localhost:5000/api/auth/addchild",{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({hospitalname,parentName,phoneNumber,birthDate})
    })
    const json=await response.json()

    // You can handle form submission here, e.g., send the data to an API
    console.log(formData);
    console.log(json)
    if(json.success){
      console.log("successfully added child data")
    }
    else{
      console.log("error occured in adding child data")
    }
  };

  return (
    <div>
      <h1>User Information Form</h1>
      <form onSubmit={handleSubmit}>
      <div>
          <label htmlFor="hospname">HospitalName:</label>
          <input
            type="text"
            id="hname"
            name="hospitalname"
            value={formData.hospitalname}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="parentName">Parent's Name:</label>
          <input
            type="text"
            id="parentName"
            name="parentName"
            value={formData.parentName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="birthDate">Birthdate:</label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <Link to="/wel">
        <button>back</button>
      </Link>
    </div>
  );
}

export default Hospital;
