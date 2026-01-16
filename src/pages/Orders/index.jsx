import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  useTheme,
} from '@mui/material';
import OrderTable from '../../component/OrderTable';

// Sample orders data
const initialOrders = [
  {
    id: 'ORD-001',
    customerName: 'John Doe',
    items: [
      { name: 'Classic White Shirt', quantity: 2 },
      { name: 'Denim Jeans', quantity: 1 },
    ],
    totalPrice: 109.97,
    paymentStatus: 'Paid',
    orderStatus: 'Pending',
  },
  {
    id: 'ORD-002',
    customerName: 'Jane Smith',
    items: [
      { name: 'Floral Summer Dress', quantity: 1 },
      { name: 'Women\'s Handbag', quantity: 1 },
    ],
    totalPrice: 99.98,
    paymentStatus: 'Paid',
    orderStatus: 'Shipped',
  },
  {
    id: 'ORD-003',
    customerName: 'Mike Johnson',
    items: [
      { name: 'Running Shoes', quantity: 1 },
    ],
    totalPrice: 79.99,
    paymentStatus: 'Pending',
    orderStatus: 'Pending',
  },
  {
    id: 'ORD-004',
    customerName: 'Sarah Williams',
    items: [
      { name: 'Kids T-Shirt', quantity: 3 },
      { name: 'Kids Sneakers', quantity: 2 },
    ],
    totalPrice: 144.95,
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
  },
  {
    id: 'ORD-005',
    customerName: 'David Brown',
    items: [
      { name: 'Men\'s Watch', quantity: 1 },
      { name: 'Classic White Shirt', quantity: 1 },
    ],
    totalPrice: 129.98,
    paymentStatus: 'Failed',
    orderStatus: 'Pending',
  },
  {
    id: 'ORD-006',
    customerName: 'Emily Davis',
    items: [
      { name: 'Floral Summer Dress', quantity: 2 },
    ],
    totalPrice: 119.98,
    paymentStatus: 'Paid',
    orderStatus: 'Shipped',
  },
  {
    id: 'ORD-007',
    customerName: 'Robert Wilson',
    items: [
      { name: 'Denim Jeans', quantity: 2 },
      { name: 'Running Shoes', quantity: 1 },
    ],
    totalPrice: 179.97,
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
  },
  {
    id: 'ORD-008',
    customerName: 'Lisa Anderson',
    items: [
      { name: 'Women\'s Handbag', quantity: 1 },
    ],
    totalPrice: 39.99,
    paymentStatus: 'Paid',
    orderStatus: 'Pending',
  },
];

const Orders = () => {
  const theme = useTheme();
  const [orders, setOrders] = useState(() => {
    // Load from localStorage or use initial data
    const stored = localStorage.getItem('orders');
    if (stored) {
      return JSON.parse(stored);
    }
    // Initialize localStorage with initial orders
    localStorage.setItem('orders', JSON.stringify(initialOrders));
    return initialOrders;
  });

  useEffect(() => {
    // Save to localStorage whenever orders change
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const handleStatusUpdate = (orderId, newStatus) => {
    setOrders((prevOrders) => {
      const updatedOrders = prevOrders.map((order) =>
        order.id === orderId
          ? { ...order, orderStatus: newStatus }
          : order
      );
      // Save to localStorage immediately
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      return updatedOrders;
    });
    console.log(`Order ${orderId} status updated to ${newStatus}`);
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
          Orders Management
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
          All Orders
        </Typography>
        <OrderTable orders={orders} onStatusUpdate={handleStatusUpdate} />
      </Paper>
    </Box>
  );
};

export default Orders;
