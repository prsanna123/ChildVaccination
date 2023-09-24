// import React, { useState } from "react";
// const host = "http://localhost:5000";
// const VerificationForm = () => {
//   const [email, setEmail] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       const response = await fetch(`${host}/api/send-verification-email`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Verification email sent successfully
//         setErrorMessage("");
//         // Handle success behavior if needed
//       } else {
//         // Handle error messages from the backend
//         setErrorMessage(data.message);
//       }
//       console.log("sent successfully");
//     } catch (error) {
//       console.error("Error sending verification email:", error);
//       setErrorMessage("An error occurred. Please try again later.");
//     }
//   };

//   return (
//     <form onSubmit={handleFormSubmit}>
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Enter your email"
//       />
//       <button type="submit">Send Verification Email</button>
//       {errorMessage && <p>{errorMessage}</p>}
//     </form>
//   );
// };

// export default VerificationForm;


// // template id:template_2u6s6b8
// //template name:My Default Template

// import { useRef, useEffect, useState } from "react";
// import emailjs from "@emailjs/browser";
// export default function App() {
//   // ... state
//   const emailRef = document.getElementById("emailref")
//   const nameRef = document.getElementById("nameref")
//   const [loading, setLoading] = useState(false);
//   useEffect(() => emailjs.init("YOUR-PUBLIC-KEY-HERE"), []);
//   // Add these
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const serviceId = "service_soh6yov";
//     const templateId = "template_2u6s6b8";
//     try {
//       setLoading(true);
//       console.log("insideS")
//       console.log(nameRef)
//       await emailjs.send(serviceId, templateId, {
//        name: nameRef,
//         recipient: emailRef
//       });
//       alert("email successfully sent check inbox");
//     } catch (error) {
//       console.log("in catch block")
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <section>
//       <aside></aside>
//       <form className="for" onSubmit={handleSubmit}>
//         <div className="form_group">
//           <label htmlFor="">name</label>
//           <input id="nameRef" placeholder="enter your name" />
//         </div>
//         <div className="form_group">
//           <label htmlFor="">email</label>
//           <input id="emailRef" type="email" placeholder="enter your email" />
//         </div>
//         <button className="btn" disabled={loading}>
//           subscribe
//         </button>
//       </form>
//     </section>
//   );
// }

import React, { useState } from 'react';
import axios from 'axios';
const host = "http://localhost:5000"
const VerificationForm = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send the email for verification
    sendVerificationEmail(email);
  };

  const sendVerificationEmail = async (email) => {
    try {
      const response = await axios.post(`${host}/api/send-verification-email`, { email });
      console.log('Email sent successfully:', response.data);
      // Handle success or display a message to the user
    } catch (error) {
      console.error('Failed to send email:', error);
      // Handle error or display an error message to the user
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={handleEmailChange} />
      </label>
      <button type="submit">Send Verification Email</button>
    </form>
  );
};

export default VerificationForm;
