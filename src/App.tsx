import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Outlet, Route, Routes, BrowserRouter as Switch } from 'react-router-dom'
import { AuthenticationPage } from './pages/AuthenticationPage';

function App() {
  return (
    <div className='App'>
      <Switch>
        <Routes>
          <Route path='/' element={<AuthenticationPage />}></Route>
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
