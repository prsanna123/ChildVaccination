
import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <div>
      <h1>Main Component</h1>
      <Link to="/childdata">
        <button>Add child data</button>
      </Link>
      <Link to="/message">
        <button>send message</button>
      </Link>
    </div>
  );
};

export default WelcomePage;
