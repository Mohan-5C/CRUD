import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Users } from "./Hooks/Users";
import { CreateUsers } from "./Pages/CreateUsers";
import { UpdateUsers } from "./Pages/UpdateUsers";
import { Home } from "./Components/Home";
import { Login } from "./Components/Login";
import { Register } from "./Components/Register";
import { Form } from "./Form";
import { useState } from "react";
import { ProtectRoute } from "./Protectors/ProtectRoute";
import { PublicRoute } from "./Protectors/PublicRoute";
import { Provider } from "react-redux";
import store from "./Redux/Store";

function App() {
  const [user, setUser] = useState("");
  return (
    <Provider store={store}>
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
                <Users user={user} setUser={setUser} />
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
    </Provider>
  );
}

export default App;
