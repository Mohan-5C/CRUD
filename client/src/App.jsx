import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import {Users} from './Users';
import {CreateUsers} from './CreateUsers';
import {UpdateUsers} from './UpdateUsers';
import {Home} from './Components/Home';
import {Login} from './Components/Login';
import {Register} from './Components/Register';
import {Form} from './Form';
import { useState } from 'react';
import {ProtectRoute} from './Protect/ProtectRoute'
import { PublicRoute } from './Protect/PublicRoute';


function App() {
  const [user,setUser]=useState("");
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Home user={user} setUser={setUser} />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login user={user} setUser={setUser} />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
        
        <Route
          path="/user"
          element={
            <ProtectRoute>
              <Users user={user} setUser={setUser}/>
            </ProtectRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectRoute>
              <CreateUsers />
            </ProtectRoute>
          }
        />
        <Route
          path="/update/:id"
          element={
            <ProtectRoute>
              <UpdateUsers />
            </ProtectRoute>
          }
        />
        <Route path="/form" element={<Form setUser={setUser} />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;


