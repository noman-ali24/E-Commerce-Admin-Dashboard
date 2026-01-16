import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  useTheme,
} from '@mui/material';
import AddProductForm from '../../component/AddProductForm';

const AddProduct = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleSubmit = (formData) => {
    // Load existing products from localStorage
    const storedProducts = localStorage.getItem('products');
    const products = storedProducts ? JSON.parse(storedProducts) : [];
    
    // Generate new ID
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    
    // Create new product
    const newProduct = {
      id: newId,
      name: formData.name,
      category: formData.category,
      subCategory: formData.subCategory,
      price: parseFloat(formData.price),
      discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice) : null,
      sizes: formData.sizes,
      colors: formData.colors,
      stock: parseInt(formData.stock),
      images: formData.images,
      image: formData.images[0] || 'https://via.placeholder.com/60', // Use first image as main image
    };
    
    // Save to localStorage
    const updatedProducts = [...products, newProduct];
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    
    alert('Product added successfully!');
    navigate('/products');
  };

  const handleCancel = () => {
    navigate('/products');
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
        Add Product
      </Typography>

      <Paper
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          backgroundColor: theme.palette.background.paper,
          borderRadius: 3,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <AddProductForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </Paper>
    </Box>
  );
};

export default AddProduct;
