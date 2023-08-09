import React from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddTodo from './components/AddTodo';
import Login from './components/Login';
import Signup from './components/Signup';
import TodosList from './components/TodosList';
import { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import TodoDataService from './services/Todos'

function App() {

  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [error, setError] = useState("")

  async function login(user = null){ // default user to null
    TodoDataService.login(user).then(response =>{
      setToken(response.data.token);
      setUser(user.username);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', user.username);
      setError('');
    }).catch( e =>{
      console.log('login', e);
      setError(e.toString());
    });
    }
    async function logout(){
      setToken('');
      setUser('');
      localStorage.setItem('token', '');
      localStorage.setItem('user', '');
    }
    async function signup(user = null){ // default user to null
      TodoDataService.signup(user).then(response =>{
        setToken(response.data.token);
        setUser(user.username);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', user.username);
      }).catch( e =>{console.log(e);
        setError(e.toString());
      })
    }
  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">TodoApp</Navbar.Brand>
          <Nav className="me-auto">
            <Link className="nav-link" to={"/todos"}>Todos</Link>
            { user ? (
              <Link className="nav-link" onClick={logout}>Logout ({user})</Link>
            ):(
            <>
              <Link className="nav-link" to={"/login"}>Login</Link>
              <Link className="nav-link" to={"/signup"}>Sign Up</Link>
            </>
            )}
          </Nav>
        </Container>
      </Navbar>
      <div className="container mt-4">
      <Routes>
          <Route exact path="/" element={<TodosList token={token} />} />
          <Route path="/todos" element={<TodosList token={token} />} />
          <Route path="/todos/create" element={<AddTodo token={token} />
          }>
          </Route>
          <Route path="/login" element={<Login login={login} />
          }>
          </Route>
          <Route path="/signup" element={<Signup signup={signup} />
          }>
          </Route>
        </Routes>
      </div>
      <footer className="text-center text-lg-start bg-light text-muted mt-4">
        <div className="text-center p-4">
        © Copyright - <a
        target="_blank"
        className="text-reset fw-bold text-decoration-none"
        href="https://twitter.com/samid3v"
        >
        Sami d3v
        </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
