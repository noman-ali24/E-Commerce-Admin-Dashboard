import { useState } from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  useTheme,
  Divider,
  Chip,
  IconButton,
  InputAdornment,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SaveIcon from '@mui/icons-material/Save';

const PaymentGatewayCard = ({ gateway, onSave }) => {
  const theme = useTheme();
  const [isEnabled, setIsEnabled] = useState(gateway.enabled || false);
  const [isTestMode, setIsTestMode] = useState(gateway.testMode || false);
  const [credentials, setCredentials] = useState(gateway.credentials || {});
  const [showCredentials, setShowCredentials] = useState({});
  const [saved, setSaved] = useState(false);

  const handleToggle = (field) => (event) => {
    if (field === 'enabled') {
      setIsEnabled(event.target.checked);
    } else if (field === 'testMode') {
      setIsTestMode(event.target.checked);
    }
  };

  const handleCredentialChange = (key) => (event) => {
    setCredentials((prev) => ({
      ...prev,
      [key]: event.target.value,
    }));
  };

  const toggleShowCredential = (key) => {
    setShowCredentials((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    const updatedGateway = {
      ...gateway,
      enabled: isEnabled,
      testMode: isTestMode,
      credentials: credentials,
    };
    onSave(updatedGateway);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const getGatewayIcon = () => {
    switch (gateway.name.toLowerCase()) {
      case 'stripe':
        return '💳';
      case 'jazzcash':
        return '📱';
      case 'easypaisa':
        return '💸';
      default:
        return '💳';
    }
  };

  const getGatewayColor = () => {
    switch (gateway.name.toLowerCase()) {
      case 'stripe':
        return theme.palette.custom?.gatewayStripe || theme.palette.primary.main;
      case 'jazzcash':
        return theme.palette.custom?.gatewayJazzCash || theme.palette.primary.main;
      case 'easypaisa':
        return theme.palette.custom?.gatewayEasypaisa || theme.palette.primary.main;
      default:
        return theme.palette.primary.main;
    }
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        height: '100%',
        border: `2px solid ${isEnabled ? getGatewayColor() : theme.palette.custom?.lightGreyBorder || theme.palette.custom?.lightGrey}`,
        opacity: isEnabled ? 1 : 0.7,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h4" sx={{ fontSize: '2rem' }}>
              {getGatewayIcon()}
            </Typography>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.text.dark,
                }}
              >
                {gateway.name}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: theme.palette.text.secondary,
                }}
              >
                {gateway.description}
              </Typography>
            </Box>
          </Box>
          <FormControlLabel
            control={
              <Switch
                checked={isEnabled}
                onChange={handleToggle('enabled')}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: getGatewayColor(),
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: getGatewayColor(),
                  },
                }}
              />
            }
            label={
              <Chip
                label={isEnabled ? 'Enabled' : 'Disabled'}
                size="small"
                sx={{
                  backgroundColor: isEnabled ? theme.palette.success.light : theme.palette.error.light,
                  color: theme.palette.text.white,
                  fontWeight: 600,
                }}
              />
            }
          />
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Test Mode Toggle */}
        {isEnabled && (
          <>
            <Box sx={{ mb: 3 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={isTestMode}
                    onChange={handleToggle('testMode')}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: theme.palette.warning.main,
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: theme.palette.warning.main,
                      },
                    }}
                  />
                }
                label={
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.text.dark,
                      }}
                    >
                      Test Mode
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: theme.palette.text.secondary,
                      }}
                    >
                      {isTestMode ? 'Using test credentials' : 'Using live credentials'}
                    </Typography>
                  </Box>
                }
              />
            </Box>

            {/* Credentials */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="body2"
                sx={{
                  mb: 2,
                  fontWeight: 600,
                  color: theme.palette.text.dark,
                }}
              >
                API Credentials
              </Typography>
              {gateway.credentialFields?.map((field) => (
                <TextField
                  key={field.key}
                  fullWidth
                  label={field.label}
                  type={showCredentials[field.key] ? 'text' : 'password'}
                  value={credentials[field.key] || ''}
                  onChange={handleCredentialChange(field.key)}
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
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => toggleShowCredential(field.key)}
                          edge="end"
                          sx={{
                            color: theme.palette.text.secondary,
                          }}
                        >
                          {showCredentials[field.key] ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              ))}
            </Box>

            {/* Save Button */}
            <Button
              fullWidth
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.text.white,
                py: 1.5,
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              {saved ? 'Saved!' : 'Save Settings'}
            </Button>
          </>
        )}

        {!isEnabled && (
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.disabled,
              fontStyle: 'italic',
              textAlign: 'center',
              py: 2,
            }}
          >
            Enable this gateway to configure settings
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentGatewayCard;
