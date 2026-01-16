import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  useTheme,
} from '@mui/material';
import CustomerTable from '../../component/CustomerTable';

// Sample customers data
const initialCustomers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    totalOrders: 5,
    isBlocked: false,
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    totalOrders: 12,
    isBlocked: false,
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    totalOrders: 3,
    isBlocked: true,
  },
  {
    id: 4,
    name: 'Sarah Williams',
    email: 'sarah.williams@example.com',
    totalOrders: 8,
    isBlocked: false,
  },
  {
    id: 5,
    name: 'David Brown',
    email: 'david.brown@example.com',
    totalOrders: 15,
    isBlocked: false,
  },
  {
    id: 6,
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    totalOrders: 7,
    isBlocked: false,
  },
  {
    id: 7,
    name: 'Robert Wilson',
    email: 'robert.wilson@example.com',
    totalOrders: 4,
    isBlocked: true,
  },
  {
    id: 8,
    name: 'Lisa Anderson',
    email: 'lisa.anderson@example.com',
    totalOrders: 9,
    isBlocked: false,
  },
  {
    id: 9,
    name: 'Michael Taylor',
    email: 'michael.taylor@example.com',
    totalOrders: 6,
    isBlocked: false,
  },
  {
    id: 10,
    name: 'Jessica Martinez',
    email: 'jessica.martinez@example.com',
    totalOrders: 11,
    isBlocked: false,
  },
];

const Customers = () => {
  const theme = useTheme();
  const [customers, setCustomers] = useState(() => {
    // Load from localStorage or use initial data
    const stored = localStorage.getItem('customers');
    if (stored) {
      return JSON.parse(stored);
    }
    // Initialize localStorage with initial customers
    localStorage.setItem('customers', JSON.stringify(initialCustomers));
    return initialCustomers;
  });

  useEffect(() => {
    // Save to localStorage whenever customers change
    localStorage.setItem('customers', JSON.stringify(customers));
  }, [customers]);

  const handleBlockToggle = (customerId, newStatus) => {
    setCustomers((prevCustomers) => {
      const updatedCustomers = prevCustomers.map((customer) =>
        customer.id === customerId
          ? { ...customer, isBlocked: !newStatus }
          : customer
      );
      // Save to localStorage immediately
      localStorage.setItem('customers', JSON.stringify(updatedCustomers));
      return updatedCustomers;
    });
    const customer = customers.find((c) => c.id === customerId);
    console.log(`Customer ${customer?.name} ${!newStatus ? 'blocked' : 'unblocked'}`);
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
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: { xs: 3, md: 4 },
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: theme.palette.text.dark,
            fontSize: { xs: '24px', sm: '28px', md: '32px' },
          }}
        >
          Customers Management
        </Typography>
      </Box>

      <Paper
        sx={{
          p: { xs: 2, sm: 3 },
          backgroundColor: theme.palette.background.paper,
          borderRadius: 3,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            mb: 3,
            color: theme.palette.primary.main,
            fontWeight: 600,
          }}
        >
          All Customers
        </Typography>
        <CustomerTable customers={customers} onBlockToggle={handleBlockToggle} />
      </Paper>
    </Box>
  );
};

export default Customers;
