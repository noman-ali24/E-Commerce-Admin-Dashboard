import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Link,
  useTheme,
} from '@mui/material';

const SignUpForm = ({ onSubmit }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (event) => {
    const value = field === 'agreeTerms' ? event.target.checked : event.target.value;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the Terms and Conditions';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {/* Form Fields */}
      <TextField
        fullWidth
        label="Name"
        value={formData.name}
        onChange={handleChange('name')}
        error={!!errors.name}
        helperText={errors.name}
        sx={{
          mb: 2,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: theme.palette.custom?.lightGreyBorder || theme.palette.custom?.lightGrey,
            },
            '&:hover fieldset': {
              borderColor: theme.palette.primary.light,
            },
            '&.Mui-focused fieldset': {
              borderColor: theme.palette.primary.main,
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: theme.palette.primary.main,
          },
        }}
      />

      <TextField
        fullWidth
        label="Email"
        type="email"
        value={formData.email}
        onChange={handleChange('email')}
        error={!!errors.email}
        helperText={errors.email}
        sx={{
          mb: 2,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: theme.palette.custom?.lightGreyBorder || theme.palette.custom?.lightGrey,
            },
            '&:hover fieldset': {
              borderColor: theme.palette.primary.light,
            },
            '&.Mui-focused fieldset': {
              borderColor: theme.palette.primary.main,
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: theme.palette.primary.main,
          },
        }}
      />

      <TextField
        fullWidth
        label="Password"
        type="password"
        value={formData.password}
        onChange={handleChange('password')}
        error={!!errors.password}
        helperText={errors.password}
        sx={{
          mb: 2,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: theme.palette.custom?.lightGreyBorder || theme.palette.custom?.lightGrey,
            },
            '&:hover fieldset': {
              borderColor: theme.palette.primary.light,
            },
            '&.Mui-focused fieldset': {
              borderColor: theme.palette.primary.main,
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: theme.palette.primary.main,
          },
        }}
      />

      <TextField
        fullWidth
        label="Confirm Password"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange('confirmPassword')}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword}
        sx={{
          mb: 2,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: theme.palette.custom?.lightGreyBorder || theme.palette.custom?.lightGrey,
            },
            '&:hover fieldset': {
              borderColor: theme.palette.primary.light,
            },
            '&.Mui-focused fieldset': {
              borderColor: theme.palette.primary.main,
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: theme.palette.primary.main,
          },
        }}
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={formData.agreeTerms}
            onChange={handleChange('agreeTerms')}
            sx={{
              color: theme.palette.primary.main,
              '&.Mui-checked': {
                color: theme.palette.primary.main,
              },
            }}
          />
        }
        label={
          <Typography
            sx={{
              color: theme.palette.text.dark,
              fontSize: '0.875rem',
            }}
          >
            I agree the{' '}
            <Link
              href="#"
              sx={{
                color: theme.palette.primary.main,
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Terms and Conditions
            </Link>
          </Typography>
        }
        sx={{ mb: 3 }}
      />
      {errors.agreeTerms && (
        <Typography
          variant="caption"
          sx={{
            color: theme.palette.error.main,
            display: 'block',
            mb: 2,
          }}
        >
          {errors.agreeTerms}
        </Typography>
      )}

      {/* Sign Up Button */}
      <Button
        fullWidth
        variant="contained"
        onClick={(e) => {
          e.preventDefault();
          if (validate()) {
            onSubmit(formData);
            navigate('/signin');
          }
        }}
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.text.white,
          py: 1.5,
          mb: 2,
          textTransform: 'uppercase',
          fontWeight: 600,
          fontSize: '0.875rem',
          borderRadius: 2,
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
          },
        }}
      >
        Sign Up
      </Button>

      {/* Sign In Link */}
      <Box sx={{ textAlign: 'center' }}>
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.secondary,
          }}
        >
          Already have an account?{' '}
          <Link
            component="button"
            onClick={(e) => {
              e.preventDefault();
              navigate('/signin');
            }}
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 600,
              textDecoration: 'none',
              cursor: 'pointer',
              border: 'none',
              background: 'none',
              padding: 0,
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Sign in
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignUpForm;
