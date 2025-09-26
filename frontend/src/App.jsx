import React, { useReducer } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import AdminLogin from "./pages/Login";
import Dashboard from "./components/Dashboard";
import TicketForm from "./components/TicketForm"; // <-- import TicketForm
import { authReducer, initialState } from "./reducers/authReducer";

function App() {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <Router>
      <Navbar auth={state.isAuthenticated} dispatch={dispatch} />
      <div className="p-6">
        <Routes>
          {/* Public Dashboard */}
          <Route path="/" element={<Dashboard auth={state.isAuthenticated} />} />

          {/* Ticket Form */}
          <Route path="/create" element={<TicketForm />} />  {/* <-- added */}

          {/* Admin Login */}
          <Route
            path="/login"
            element={
              !state.isAuthenticated ? (
                <AdminLogin dispatch={dispatch} />
              ) : (
                <Navigate to="/admin" />
              )
            }
          />

          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
