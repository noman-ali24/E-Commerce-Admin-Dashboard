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
  IconButton,
  Switch,
  FormControlLabel,
  useTheme,
  Avatar,
  Typography,
} from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const CustomerTable = ({ customers, onBlockToggle }) => {
  const theme = useTheme();

  const handleToggle = (customerId, currentStatus) => {
    if (onBlockToggle) {
      onBlockToggle(customerId, !currentStatus);
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
              Email
            </TableCell>
            <TableCell
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 700,
                fontSize: '0.9rem',
                letterSpacing: '0.5px',
              }}
            >
              Total Orders
            </TableCell>
            <TableCell
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 700,
                fontSize: '0.9rem',
                letterSpacing: '0.5px',
              }}
              align="center"
            >
              Status
            </TableCell>
            <TableCell
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 700,
                fontSize: '0.9rem',
                letterSpacing: '0.5px',
              }}
              align="center"
            >
              Block / Unblock
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((customer) => (
            <TableRow
              key={customer.id}
              sx={{
                '&:nth-of-type(even)': {
                  backgroundColor: theme.palette.background.default,
                },
                '&:hover': {
                  backgroundColor: `${theme.palette.primary.main}08`,
                },
                borderBottom: `1px solid ${theme.palette.custom?.lightGreyBorder || theme.palette.custom?.lightGrey}`,
                opacity: customer.isBlocked ? 0.6 : 1,
              }}
            >
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      backgroundColor: customer.isBlocked
                        ? theme.palette.error.light
                        : theme.palette.primary.main,
                      color: theme.palette.text.white,
                    }}
                  >
                    {customer.name.charAt(0).toUpperCase()}
                  </Avatar>
                  <Typography
                    sx={{
                      color: theme.palette.text.dark,
                      fontWeight: 500,
                    }}
                  >
                    {customer.name}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell
                sx={{
                  color: theme.palette.text.secondary,
                }}
              >
                {customer.email}
              </TableCell>
              <TableCell>
                <Chip
                  label={customer.totalOrders}
                  size="small"
                  sx={{
                    backgroundColor: theme.palette.primary.light,
                    color: theme.palette.text.white,
                    fontWeight: 600,
                    minWidth: 60,
                  }}
                />
              </TableCell>
              <TableCell align="center">
                <Chip
                  icon={customer.isBlocked ? <BlockIcon /> : <CheckCircleIcon />}
                  label={customer.isBlocked ? 'Blocked' : 'Active'}
                  size="small"
                  sx={{
                    backgroundColor: customer.isBlocked
                      ? theme.palette.error.light
                      : theme.palette.success.light,
                    color: theme.palette.text.white,
                    fontWeight: 600,
                    '& .MuiChip-icon': {
                      color: theme.palette.text.white,
                    },
                  }}
                />
              </TableCell>
              <TableCell align="center">
                <FormControlLabel
                  control={
                    <Switch
                      checked={!customer.isBlocked}
                      onChange={() => handleToggle(customer.id, customer.isBlocked)}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: theme.palette.success.main,
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: theme.palette.success.main,
                        },
                        '& .MuiSwitch-switchBase': {
                          color: theme.palette.error.main,
                        },
                        '& .MuiSwitch-track': {
                          backgroundColor: theme.palette.error.main,
                        },
                      }}
                    />
                  }
                  label=""
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomerTable;
