import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './features/auth/hooks/useAuth';
import QueryProvider from './app/QueryProvider';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './shared/components/Header';
import ProtectedRoute from './shared/components/ProtectedRoute';

function App() {
  return (
    <QueryProvider>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/" element={<Dashboard />} />
                </Route>
              </Routes>
            </main>
          </div>
          <ToastContainer />
        </Router>
      </AuthProvider>
    </QueryProvider>
  );
}

export default App;
