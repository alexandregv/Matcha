import React from 'react';
import { Link } from "react-router-dom";
import './Main.scss'

const Start = () => {
  return (
    <div className="start bg-desc">
      <h1>Matcha</h1>
      <div>
        <Link to="/login" className="btn">Login</Link>
        <Link to="/signup" className="btn">Sign up</Link>
        <Link to="/browseResponsive" className="btn">Browse</Link>
      </div>
    </div>
  );
}

export default Start;
