import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  useTheme,
} from '@mui/material';
import PaymentGatewayCard from '../../component/PaymentGatewayCard';

// Initial payment gateways configuration
const initialGateways = [
  {
    id: 1,
    name: 'Stripe',
    description: 'Accept payments via credit/debit cards',
    enabled: false,
    testMode: true,
    credentials: {
      publishableKey: '',
      secretKey: '',
    },
    credentialFields: [
      { key: 'publishableKey', label: 'Publishable Key' },
      { key: 'secretKey', label: 'Secret Key' },
    ],
  },
  {
    id: 2,
    name: 'JazzCash',
    description: 'Mobile wallet payment gateway',
    enabled: false,
    testMode: true,
    credentials: {
      merchantId: '',
      password: '',
      integritySalt: '',
    },
    credentialFields: [
      { key: 'merchantId', label: 'Merchant ID' },
      { key: 'password', label: 'Password' },
      { key: 'integritySalt', label: 'Integrity Salt' },
    ],
  },
  {
    id: 3,
    name: 'Easypaisa',
    description: 'Mobile wallet and bank transfer payments',
    enabled: false,
    testMode: true,
    credentials: {
      storeId: '',
      username: '',
      password: '',
    },
    credentialFields: [
      { key: 'storeId', label: 'Store ID' },
      { key: 'username', label: 'Username' },
      { key: 'password', label: 'Password' },
    ],
  },
];

const Payments = () => {
  const theme = useTheme();
  const [gateways, setGateways] = useState(() => {
    // Load from localStorage or use initial data
    const stored = localStorage.getItem('paymentGateways');
    if (stored) {
      return JSON.parse(stored);
    }
    // Initialize localStorage with initial gateways
    localStorage.setItem('paymentGateways', JSON.stringify(initialGateways));
    return initialGateways;
  });

  useEffect(() => {
    // Save to localStorage whenever gateways change
    localStorage.setItem('paymentGateways', JSON.stringify(gateways));
  }, [gateways]);

  const handleSave = (updatedGateway) => {
    setGateways((prevGateways) => {
      const updatedGateways = prevGateways.map((gw) =>
        gw.id === updatedGateway.id ? updatedGateway : gw
      );
      // Save to localStorage immediately
      localStorage.setItem('paymentGateways', JSON.stringify(updatedGateways));
      return updatedGateways;
    });
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
      <Box
        sx={{
          mb: { xs: 3, md: 4 },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: theme.palette.text.dark,
            fontSize: { xs: '24px', sm: '28px', md: '32px' },
            mb: 1,
          }}
        >
          Payment Gateway Settings
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.secondary,
          }}
        >
          Configure and manage your payment gateway integrations
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {gateways.map((gateway) => (
          <Grid item xs={12} md={4} key={gateway.id}>
            <PaymentGatewayCard gateway={gateway} onSave={handleSave} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Payments;
