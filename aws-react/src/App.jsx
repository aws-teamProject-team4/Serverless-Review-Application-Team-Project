import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Form from './Form';
import Login from './login';
import SignUp from './signup';
import Board from './board';

import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Form</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">SignUp</Link>
            </li>
            <li>
              <Link to="/board">Board</Link>
            </li>
          </ul>
        </nav>

        <div className="container"> {/* Add a container to center align the content */}
          {/* <h1>Main Page</h1> 이거 왜 login signup 이동하면서 남아있지???*/}
          <Routes>
            <Route path="/" element={<Form />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/board" element={<Board />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
