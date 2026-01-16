import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Box,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  Typography,
} from '@mui/material';

const OrderTable = ({ orders, onStatusUpdate }) => {
  const theme = useTheme();

  const getPaymentStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return theme.palette.success.light;
      case 'pending':
        return theme.palette.warning.main;
      case 'failed':
        return theme.palette.error.light;
      default:
        return theme.palette.primary.main;
    }
  };

  const getOrderStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return theme.palette.success.light;
      case 'shipped':
        return theme.palette.primary.light;
      case 'pending':
        return theme.palette.warning.main;
      default:
        return theme.palette.primary.main;
    }
  };

  const handleStatusChange = (orderId, newStatus) => {
    if (onStatusUpdate) {
      onStatusUpdate(orderId, newStatus);
    }
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 3,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        backgroundColor: theme.palette.background.paper,
        overflowX: 'auto',
        '&::-webkit-scrollbar': {
          height: '8px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: theme.palette.background.default,
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: theme.palette.custom.lightGrey,
          borderRadius: '4px',
        },
      }}
    >
      <Table>
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: theme.palette.background.default,
            }}
          >
            <TableCell
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 700,
                fontSize: '0.9rem',
                letterSpacing: '0.5px',
              }}
            >
              Order ID
            </TableCell>
            <TableCell
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 700,
                fontSize: '0.9rem',
                letterSpacing: '0.5px',
              }}
            >
              Customer Name
            </TableCell>
            <TableCell
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 700,
                fontSize: '0.9rem',
                letterSpacing: '0.5px',
              }}
            >
              Items Ordered
            </TableCell>
            <TableCell
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 700,
                fontSize: '0.9rem',
                letterSpacing: '0.5px',
              }}
            >
              Total Price
            </TableCell>
            <TableCell
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 700,
                fontSize: '0.9rem',
                letterSpacing: '0.5px',
              }}
            >
              Payment Status
            </TableCell>
            <TableCell
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 700,
                fontSize: '0.9rem',
                letterSpacing: '0.5px',
              }}
            >
              Order Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order.id}
              sx={{
                '&:nth-of-type(even)': {
                  backgroundColor: theme.palette.background.default,
                },
                '&:hover': {
                  backgroundColor: `${theme.palette.primary.main}08`,
                },
                borderBottom: `1px solid ${theme.palette.custom?.lightGreyBorder || theme.palette.custom?.lightGrey}`,
              }}
            >
              <TableCell
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                }}
              >
                #{order.id}
              </TableCell>
              <TableCell
                sx={{
                  color: theme.palette.text.dark,
                  fontWeight: 500,
                }}
              >
                {order.customerName}
              </TableCell>
              <TableCell>
                <Box>
                  {order.items.map((item, index) => (
                    <Typography
                      key={index}
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        mb: index < order.items.length - 1 ? 0.5 : 0,
                      }}
                    >
                      {item.name} (x{item.quantity})
                    </Typography>
                  ))}
                  <Typography
                    variant="caption"
                    sx={{
                      color: theme.palette.text.disabled,
                      fontStyle: 'italic',
                    }}
                  >
                    {order.items.length} item{order.items.length > 1 ? 's' : ''}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                }}
              >
                ${order.totalPrice.toFixed(2)}
              </TableCell>
              <TableCell>
                <Chip
                  label={order.paymentStatus}
                  size="small"
                  sx={{
                    backgroundColor: getPaymentStatusColor(order.paymentStatus),
                    color: theme.palette.text.white,
                    fontWeight: 600,
                    textTransform: 'capitalize',
                  }}
                />
              </TableCell>
              <TableCell>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <Select
                    value={order.orderStatus}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    sx={{
                      backgroundColor: getOrderStatusColor(order.orderStatus),
                      color: theme.palette.text.white,
                      fontWeight: 600,
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'transparent',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.primary.main,
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.primary.main,
                      },
                      '& .MuiSelect-icon': {
                        color: theme.palette.text.white,
                      },
                    }}
                  >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Shipped">Shipped</MenuItem>
                    <MenuItem value="Delivered">Delivered</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderTable;
