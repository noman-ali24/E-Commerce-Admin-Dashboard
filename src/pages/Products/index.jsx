import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  useTheme,
  Paper,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ProductTable from '../../component/ProductTable';

// Sample products data
const initialProducts = [
  {
    id: 1,
    name: 'Classic White Shirt',
    category: 'Men',
    subCategory: 'Shirts',
    price: 29.99,
    stock: 50,
    image: 'https://via.placeholder.com/60',
    sizes: ['S', 'M', 'L'],
    colors: ['White', 'Black'],
    images: ['https://via.placeholder.com/60'],
  },
  {
    id: 2,
    name: 'Denim Jeans',
    category: 'Men',
    subCategory: 'Pants',
    price: 49.99,
    stock: 30,
    image: 'https://via.placeholder.com/60',
    sizes: ['M', 'L', 'XL'],
    colors: ['Blue'],
    images: ['https://via.placeholder.com/60'],
  },
  {
    id: 3,
    name: 'Floral Summer Dress',
    category: 'Women',
    subCategory: 'Dresses',
    price: 59.99,
    stock: 25,
    image: 'https://via.placeholder.com/60',
    sizes: ['S', 'M', 'L'],
    colors: ['Pink', 'Yellow'],
    images: ['https://via.placeholder.com/60'],
  },
  {
    id: 4,
    name: 'Running Shoes',
    category: 'Men',
    subCategory: 'Shoes',
    price: 79.99,
    stock: 0,
    image: 'https://via.placeholder.com/60',
    sizes: ['M', 'L'],
    colors: ['Black', 'White'],
    images: ['https://via.placeholder.com/60'],
  },
  {
    id: 5,
    name: 'Kids T-Shirt',
    category: 'Kids',
    subCategory: 'Shirts',
    price: 19.99,
    stock: 100,
    image: 'https://via.placeholder.com/60',
    sizes: ['S', 'M'],
    colors: ['Red', 'Blue'],
    images: ['https://via.placeholder.com/60'],
  },
  {
    id: 6,
    name: 'Women\'s Handbag',
    category: 'Women',
    subCategory: 'Accessories',
    price: 39.99,
    stock: 15,
    image: 'https://via.placeholder.com/60',
    sizes: [],
    colors: ['Brown', 'Black'],
    images: ['https://via.placeholder.com/60'],
  },
  {
    id: 7,
    name: 'Kids Sneakers',
    category: 'Kids',
    subCategory: 'Shoes',
    price: 34.99,
    stock: 40,
    image: 'https://via.placeholder.com/60',
    sizes: ['S', 'M'],
    colors: ['Blue', 'Red'],
    images: ['https://via.placeholder.com/60'],
  },
  {
    id: 8,
    name: 'Men\'s Watch',
    category: 'Men',
    subCategory: 'Accessories',
    price: 99.99,
    stock: 20,
    image: 'https://via.placeholder.com/60',
    sizes: [],
    colors: ['Black', 'Silver'],
    images: ['https://via.placeholder.com/60'],
  },
];

const Products = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [products, setProducts] = useState(() => {
    // Load from localStorage or use initial data
    const stored = localStorage.getItem('products');
    if (stored) {
      return JSON.parse(stored);
    }
    // Initialize localStorage with initial products
    localStorage.setItem('products', JSON.stringify(initialProducts));
    return initialProducts;
  });

  useEffect(() => {
    // Save to localStorage whenever products change
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const handleEdit = (product) => {
    // TODO: Navigate to edit page or open edit modal
    console.log('Edit product:', product);
    navigate(`/products/edit/${product.id}`);
  };

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = products.filter((p) => p.id !== productId);
      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
    }
  };

  const handleAdd = () => {
    navigate('/products/add');
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
          Products Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.text.white,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
            textTransform: 'none',
            px: 3,
            py: 1.5,
            borderRadius: 2,
            fontWeight: 600,
          }}
        >
          Add Product
        </Button>
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
          All Products
        </Typography>
        <ProductTable
          products={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Paper>
    </Box>
  );
};

export default Products;
