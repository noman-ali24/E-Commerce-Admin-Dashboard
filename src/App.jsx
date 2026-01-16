import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import theme from './theme';
import Sidebar from './component/Sidebar';
import Header from './component/Header';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Categories from './pages/Categories';
import Banners from './pages/Banners';
import Payments from './pages/Payments';
import Settings from './pages/Settings';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if user is already authenticated (from localStorage)
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    // Save authentication state to localStorage
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
  }, [isAuthenticated]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/signin" replace />;
    }
    return children;
  };

  // Public Route Component (redirect to dashboard if already authenticated)
  const PublicRoute = ({ children }) => {
    if (isAuthenticated) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  const handleSignIn = () => {
    setIsAuthenticated(true);
  };

  const handleSignUp = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Public Routes - Sign In & Sign Up */}
          <Route
            path="/signin"
            element={
              <PublicRoute>
                <SignIn onSignIn={handleSignIn} />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignUp onSignUp={handleSignUp} />
              </PublicRoute>
            }
          />

          {/* Protected Routes - Dashboard and all admin pages */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Box
                  sx={{
                    display: 'flex',
                    width: '100%',
                    minHeight: '100vh',
                    overflow: 'hidden',
                  }}
                >
                  <Sidebar onLogout={handleLogout} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
                  <Box
                    component="main"
                    sx={{
                      flexGrow: 1,
                      width: { xs: '100%', sm: `calc(100% - 280px)` },
                      backgroundColor: (theme) => theme.palette.background.paper,
                      minHeight: '100vh',
                      display: 'flex',
                      flexDirection: 'column',
                      overflow: 'auto',
                    }}
                  >
                    <Header handleDrawerToggle={handleDrawerToggle} />
                    <Box
                      sx={{
                        flex: 1,
                        width: '100%',
                        overflow: 'auto',
                      }}
                    >
                      <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/products/add" element={<AddProduct />} />
                        <Route path="/products/edit/:id" element={<EditProduct />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/customers" element={<Customers />} />
                        <Route path="/categories" element={<Categories />} />
                        <Route path="/banners" element={<Banners />} />
                        <Route path="/payments" element={<Payments />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/logout" element={<Navigate to="/signin" replace />} />
                      </Routes>
                    </Box>
                  </Box>
                </Box>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
