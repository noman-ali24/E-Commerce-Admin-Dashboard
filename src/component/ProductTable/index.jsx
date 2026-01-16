import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Avatar,
  Chip,
  Box,
  useTheme,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductTable = ({ products, onEdit, onDelete }) => {
  const theme = useTheme();

  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case 'men':
        return theme.palette.primary.main;
      case 'women':
        return theme.palette.primary.light;
      case 'kids':
        return theme.palette.custom?.lightGarishPurple || theme.palette.primary.light;
      default:
        return theme.palette.primary.main;
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
              Product Image
            </TableCell>
            <TableCell
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 700,
                fontSize: '0.9rem',
                letterSpacing: '0.5px',
              }}
            >
              Name
            </TableCell>
            <TableCell
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 700,
                fontSize: '0.9rem',
                letterSpacing: '0.5px',
              }}
            >
              Category
            </TableCell>
            <TableCell
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 700,
                fontSize: '0.9rem',
                letterSpacing: '0.5px',
              }}
            >
              Sub-Category
            </TableCell>
            <TableCell
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 700,
                fontSize: '0.9rem',
                letterSpacing: '0.5px',
              }}
            >
              Price
            </TableCell>
            <TableCell
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 700,
                fontSize: '0.9rem',
                letterSpacing: '0.5px',
              }}
            >
              Stock
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
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product.id}
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
              <TableCell>
                <Avatar
                  src={product.image}
                  alt={product.name}
                  variant="rounded"
                  sx={{
                    width: 60,
                    height: 60,
                    backgroundColor: theme.palette.background.default,
                  }}
                >
                  {product.name.charAt(0)}
                </Avatar>
              </TableCell>
              <TableCell
                sx={{
                  color: theme.palette.text.dark,
                  fontWeight: 500,
                }}
              >
                {product.name}
              </TableCell>
              <TableCell>
                <Chip
                  label={product.category}
                  size="small"
                  sx={{
                    backgroundColor: getCategoryColor(product.category),
                    color: theme.palette.text.white,
                    fontWeight: 600,
                    minWidth: 70,
                  }}
                />
              </TableCell>
              <TableCell
                sx={{
                  color: theme.palette.text.secondary,
                }}
              >
                {product.subCategory}
              </TableCell>
              <TableCell
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                }}
              >
                ${product.price}
              </TableCell>
              <TableCell>
                <Chip
                  label={product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                  size="small"
                  sx={{
                    backgroundColor: product.stock > 0 
                      ? theme.palette.success.light
                      : theme.palette.error.light,
                    color: theme.palette.text.white,
                    fontWeight: 500,
                  }}
                />
              </TableCell>
              <TableCell align="center">
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                  <IconButton
                    onClick={() => onEdit(product)}
                    sx={{
                      color: theme.palette.primary.main,
                      '&:hover': {
                        backgroundColor: `${theme.palette.primary.main}15`,
                      },
                    }}
                    size="small"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => onDelete(product.id)}
                    sx={{
                      color: theme.palette.error.main,
                      '&:hover': {
                        backgroundColor: `${theme.palette.error.main}15`,
                      },
                    }}
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
