import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  useTheme,
} from '@mui/material';
import AddProductForm from '../../component/AddProductForm';

const EditProduct = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load products from localStorage
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      const products = JSON.parse(storedProducts);
      const foundProduct = products.find((p) => p.id === parseInt(id));
      if (foundProduct) {
        // Convert product data to form format
        const formData = {
          name: foundProduct.name || '',
          category: foundProduct.category || 'Men',
          subCategory: foundProduct.subCategory || '',
          price: foundProduct.price || '',
          discountPrice: foundProduct.discountPrice || '',
          sizes: foundProduct.sizes || [],
          colors: foundProduct.colors || [],
          stock: foundProduct.stock || '',
          images: foundProduct.images || (foundProduct.image ? [foundProduct.image] : []),
        };
        setProduct(formData);
      } else {
        alert('Product not found!');
        navigate('/products');
      }
    } else {
      alert('Product not found!');
      navigate('/products');
    }
    setLoading(false);
  }, [id, navigate]);

  const handleSubmit = (formData) => {
    // Load products from localStorage
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      const products = JSON.parse(storedProducts);
      const updatedProducts = products.map((p) =>
        p.id === parseInt(id)
          ? {
              ...p,
              name: formData.name,
              category: formData.category,
              subCategory: formData.subCategory,
              price: parseFloat(formData.price),
              discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice) : null,
              sizes: formData.sizes,
              colors: formData.colors,
              stock: parseInt(formData.stock),
              images: formData.images,
              image: formData.images[0] || p.image, // Use first image as main image
            }
          : p
      );
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      alert('Product updated successfully!');
      navigate('/products');
    }
  };

  const handleCancel = () => {
    navigate('/products');
  };

  if (loading) {
    return (
      <Box
        sx={{
          width: '100%',
          minHeight: '100%',
          p: { xs: 2, sm: 3, md: 3 },
          mt: { xs: 7, sm: 8 },
          pb: 4,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ color: theme.palette.text.secondary }}>Loading...</Typography>
      </Box>
    );
  }

  if (!product) {
    return null;
  }

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
        Edit Product
      </Typography>

      <Paper
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          backgroundColor: theme.palette.background.paper,
          borderRadius: 3,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <AddProductForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          initialData={product}
        />
      </Paper>
    </Box>
  );
};

export default EditProduct;
