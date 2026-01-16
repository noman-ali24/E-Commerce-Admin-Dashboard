import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  useTheme,
  TextField,
  Button,
  Grid,
  Divider,
  Avatar,
  IconButton,
  InputAdornment,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SaveIcon from '@mui/icons-material/Save';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import StoreIcon from '@mui/icons-material/Store';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import LockIcon from '@mui/icons-material/Lock';

const Settings = () => {
  const theme = useTheme();
  const [settings, setSettings] = useState(() => {
    const stored = localStorage.getItem('storeSettings');
    if (stored) {
      return JSON.parse(stored);
    }
    return {
      storeName: 'E-Commerce Store',
      storeLogo: '',
      email: 'admin@example.com',
      phone: '+1 234 567 8900',
      address: '123 Main Street, City, State 12345',
      website: 'https://www.example.com',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    };
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [saved, setSaved] = useState({ store: false, contact: false, password: false });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    localStorage.setItem('storeSettings', JSON.stringify(settings));
  }, [settings]);

  const handleChange = (field) => (event) => {
    setSettings((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettings((prev) => ({
          ...prev,
          storeLogo: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSaveStore = () => {
    if (!settings.storeName.trim()) {
      setErrors((prev) => ({ ...prev, storeName: 'Store name is required' }));
      return;
    }
    setSaved((prev) => ({ ...prev, store: true }));
    setTimeout(() => setSaved((prev) => ({ ...prev, store: false })), 2000);
  };

  const handleSaveContact = () => {
    if (!settings.email.trim()) {
      setErrors((prev) => ({ ...prev, email: 'Email is required' }));
      return;
    }
    if (!/\S+@\S+\.\S+/.test(settings.email)) {
      setErrors((prev) => ({ ...prev, email: 'Email is invalid' }));
      return;
    }
    setSaved((prev) => ({ ...prev, contact: true }));
    setTimeout(() => setSaved((prev) => ({ ...prev, contact: false })), 2000);
  };

  const handleChangePassword = () => {
    const newErrors = {};
    if (!settings.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    if (!settings.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (settings.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }
    if (!settings.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (settings.newPassword !== settings.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Password change logic here
    setSettings((prev) => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }));
    setErrors({});
    setSaved((prev) => ({ ...prev, password: true }));
    setTimeout(() => setSaved((prev) => ({ ...prev, password: false })), 2000);
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100%',
        p: { xs: 2, sm: 3, md: 3 },
        mt: { xs: 7, sm: 8 },
        pb: 4,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: { xs: 3, md: 4 },
          fontWeight: 700,
          color: theme.palette.text.dark,
          fontSize: { xs: '24px', sm: '28px', md: '32px' },
        }}
      >
        Settings
      </Typography>

      <Grid container spacing={3}>
        {/* Store Name & Logo Section */}
        <Grid item xs={12}>
          <Paper
            sx={{
              p: { xs: 2, sm: 3, md: 4 },
              backgroundColor: theme.palette.background.paper,
              borderRadius: 3,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <StoreIcon sx={{ color: theme.palette.primary.main, fontSize: 28 }} />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.text.dark,
                }}
              >
                Store Name & Logo
              </Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Store Name"
                  value={settings.storeName}
                  onChange={handleChange('storeName')}
                  error={!!errors.storeName}
                  helperText={errors.storeName}
                  sx={{
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
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar
                    src={settings.storeLogo}
                    variant="rounded"
                    sx={{
                      width: 80,
                      height: 80,
                      backgroundColor: theme.palette.background.default,
                      border: `2px solid ${theme.palette.custom?.lightGreyBorder || theme.palette.custom?.lightGrey}`,
                    }}
                  >
                    <StoreIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
                  </Avatar>
                  <Box>
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="logo-upload"
                      type="file"
                      onChange={handleLogoUpload}
                    />
                    <label htmlFor="logo-upload">
                      <Button
                        component="span"
                        variant="outlined"
                        startIcon={<CloudUploadIcon />}
                        sx={{
                          color: theme.palette.primary.main,
                          borderColor: theme.palette.primary.main,
                          textTransform: 'none',
                          '&:hover': {
                            borderColor: theme.palette.primary.dark,
                            backgroundColor: `${theme.palette.primary.main}08`,
                          },
                        }}
                      >
                        Upload Logo
                      </Button>
                    </label>
                    <Typography
                      variant="caption"
                      sx={{
                        display: 'block',
                        mt: 1,
                        color: theme.palette.text.secondary,
                      }}
                    >
                      Recommended: 200x200px
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleSaveStore}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.text.white,
                    textTransform: 'none',
                    px: 4,
                    py: 1.5,
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.dark,
                    },
                  }}
                >
                  {saved.store ? 'Saved!' : 'Save Store Settings'}
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Contact Info Section */}
        <Grid item xs={12}>
          <Paper
            sx={{
              p: { xs: 2, sm: 3, md: 4 },
              backgroundColor: theme.palette.background.paper,
              borderRadius: 3,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <ContactMailIcon sx={{ color: theme.palette.primary.main, fontSize: 28 }} />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.text.dark,
                }}
              >
                Contact Information
              </Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={settings.email}
                  onChange={handleChange('email')}
                  error={!!errors.email}
                  helperText={errors.email}
                  sx={{
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
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={settings.phone}
                  onChange={handleChange('phone')}
                  sx={{
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  multiline
                  rows={3}
                  value={settings.address}
                  onChange={handleChange('address')}
                  sx={{
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
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Website"
                  value={settings.website}
                  onChange={handleChange('website')}
                  sx={{
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
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleSaveContact}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.text.white,
                    textTransform: 'none',
                    px: 4,
                    py: 1.5,
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.dark,
                    },
                  }}
                >
                  {saved.contact ? 'Saved!' : 'Save Contact Info'}
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Admin Password Change Section */}
        <Grid item xs={12}>
          <Paper
            sx={{
              p: { xs: 2, sm: 3, md: 4 },
              backgroundColor: theme.palette.background.paper,
              borderRadius: 3,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <LockIcon sx={{ color: theme.palette.primary.main, fontSize: 28 }} />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.text.dark,
                }}
              >
                Admin Password Change
              </Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Current Password"
                  type={showPasswords.current ? 'text' : 'password'}
                  value={settings.currentPassword}
                  onChange={handleChange('currentPassword')}
                  error={!!errors.currentPassword}
                  helperText={errors.currentPassword}
                  sx={{
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
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => togglePasswordVisibility('current')}
                          edge="end"
                          sx={{
                            color: theme.palette.text.secondary,
                          }}
                        >
                          {showPasswords.current ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="New Password"
                  type={showPasswords.new ? 'text' : 'password'}
                  value={settings.newPassword}
                  onChange={handleChange('newPassword')}
                  error={!!errors.newPassword}
                  helperText={errors.newPassword}
                  sx={{
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
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => togglePasswordVisibility('new')}
                          edge="end"
                          sx={{
                            color: theme.palette.text.secondary,
                          }}
                        >
                          {showPasswords.new ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Confirm New Password"
                  type={showPasswords.confirm ? 'text' : 'password'}
                  value={settings.confirmPassword}
                  onChange={handleChange('confirmPassword')}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  sx={{
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
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => togglePasswordVisibility('confirm')}
                          edge="end"
                          sx={{
                            color: theme.palette.text.secondary,
                          }}
                        >
                          {showPasswords.confirm ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleChangePassword}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.text.white,
                    textTransform: 'none',
                    px: 4,
                    py: 1.5,
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.dark,
                    },
                  }}
                >
                  {saved.password ? 'Password Changed!' : 'Change Password'}
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;
