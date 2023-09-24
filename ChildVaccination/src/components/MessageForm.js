import React, { useState } from 'react';
const host = "http://localhost:5000"
const MessageForm = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [messageContent, setMessageContent] = useState('');
  
  const handleSubmit = async (e) => {
    console.log("in line 12");
    e.preventDefault();
    
    // Make an API request to send the message
    const response = await fetch(`${host}/api/send-message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mobileNumber,
        messageContent,
      }),
    });
    console.log("after handling");
    // Handle the API response
    const data = await response.json();
    if (response.ok) {
      // Display success message
      console.log('Message sent successfully!');
    } else {
      // Display error message
      console.error('Failed to send message:', data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Mobile Number:
        <input
          type="text"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
        />
      </label>
      <label>
        Message:
        <textarea
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
        ></textarea>
      </label>
      <button type="submit">Send Message</button>
    </form>
  );
};

export default MessageForm;
