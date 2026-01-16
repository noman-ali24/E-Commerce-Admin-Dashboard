import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import SignUpForm from '../../component/SignUpForm';

const SignUp = ({ onSignUp }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleSubmit = (formData) => {
    // TODO: Implement actual registration
    console.log('Sign up data:', formData);
    // Call onSignUp callback to update authentication state
    if (onSignUp) {
      onSignUp();
    }
    // Navigate to dashboard after successful sign up
    navigate('/');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.background.default} 100%)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `radial-gradient(circle at 20% 50%, ${theme.palette.primary.main}1A 0%, transparent 50%), radial-gradient(circle at 80% 80%, ${theme.palette.primary.main}1A 0%, transparent 50%)`,
          zIndex: 0,
        }}
      />

      <Container
        maxWidth="sm"
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Paper
          elevation={8}
          sx={{
            width: '100%',
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          }}
        >
          {/* Header Section with Gradient */}
          <Box
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
              p: 4,
              textAlign: 'center',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: theme.palette.text.white,
                mb: 1,
              }}
            >
              Join us today
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.white,
                opacity: 0.9,
              }}
            >
              Enter your email and password to register
            </Typography>
          </Box>

          {/* Form Section */}
          <Box
            sx={{
              p: 4,
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <SignUpForm onSubmit={handleSubmit} />
          </Box>
        </Paper>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          py: 3,
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
          borderTop: `1px solid ${theme.palette.custom?.lightGreyBorder || theme.palette.custom?.lightGrey}`,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.secondary,
          }}
        >
          © 2026, made with ❤️ by Noman Ali.
        </Typography>
      </Box>
    </Box>
  );
};

export default SignUp;
