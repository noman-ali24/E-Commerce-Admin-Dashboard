import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import theme from './theme';
import Sidebar from './component/Sidebar';
import Header from './component/Header';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box 
          sx={{ 
            display: 'flex',
            width: '100%',
            minHeight: '100vh',
            overflow: 'hidden',
          }}
        >
          <Sidebar />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              width: '100%',
              backgroundColor: '#FFFFFF',
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'auto',
            }}
          >
            <Header />
            <Box
              sx={{
                flex: 1,
                width: '100%',
                overflow: 'auto',
              }}
            >
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/products" element={<div>Products Page</div>} />
                <Route path="/orders" element={<div>Orders Page</div>} />
                <Route path="/notifications" element={<div>Notifications Page</div>} />
                <Route path="/profile" element={<div>Profile Page</div>} />
              </Routes>
            </Box>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
