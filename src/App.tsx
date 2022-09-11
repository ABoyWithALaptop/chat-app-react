import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Outlet, Route, Routes, BrowserRouter as Switch } from 'react-router-dom'
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';

function App() {
  return (
    <div className='App'>
      <Switch>
        <Routes>
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route
            path='/conversations'
            element={
              <div>
                <div>
                  Conversations
                </div>
                <Outlet />
              </div>
            }
          >
            <Route path=':id' element={<div> Conversation id page</div>}></Route>
          </Route>
        </Routes>
      </Switch>

    </div>
  );
}

export default App;
