import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import EditEmployee from './pages/EditEmployee';
import { Toaster } from 'react-hot-toast';
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <Router>
         <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<LoginPage />} />
        <Route path="/users" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
        <Route path="/employees/:id" element={
          <PrivateRoute>
            <EditEmployee />
          </PrivateRoute>
        } />
        <Route path="/employees/new" element={
          <PrivateRoute>
            <EditEmployee />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;