import { useState } from 'react';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Chip,
  Typography,
  Grid,
  useTheme,
  FormHelperText,
  IconButton,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';

const subCategories = {
  Men: ['Shirts', 'Pants', 'Shoes', 'Accessories', 'Jackets', 'T-Shirts'],
  Women: ['Dresses', 'Tops', 'Pants', 'Shoes', 'Accessories', 'Handbags'],
  Kids: ['Shirts', 'Pants', 'Shoes', 'Dresses', 'Accessories', 'Toys'],
};

const sizes = ['S', 'M', 'L', 'XL'];
const colorOptions = ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Pink', 'Purple', 'Grey', 'Brown'];

const AddProductForm = ({ onSubmit, onCancel, initialData = null }) => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    category: initialData?.category || 'Men',
    subCategory: initialData?.subCategory || '',
    price: initialData?.price || '',
    discountPrice: initialData?.discountPrice || '',
    sizes: initialData?.sizes || [],
    colors: initialData?.colors || [],
    stock: initialData?.stock || '',
    images: initialData?.images || [],
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleSizeToggle = (size) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleColorToggle = (color) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter((c) => c !== color)
        : [...prev.colors, color],
    }));
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...imageUrls],
    }));
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.subCategory) newErrors.subCategory = 'Sub-category is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (formData.discountPrice && formData.discountPrice >= formData.price) {
      newErrors.discountPrice = 'Discount price must be less than regular price';
    }
    if (formData.sizes.length === 0) newErrors.sizes = 'At least one size is required';
    if (formData.colors.length === 0) newErrors.colors = 'At least one color is required';
    if (!formData.stock || formData.stock < 0) newErrors.stock = 'Valid stock quantity is required';
    if (formData.images.length === 0) newErrors.images = 'At least one image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        {/* Product Name */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Product Name"
            value={formData.name}
            onChange={handleChange('name')}
            error={!!errors.name}
            helperText={errors.name}
            sx={{
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
          />
        </Grid>

        {/* Category */}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth error={!!errors.category}>
            <InputLabel>Category</InputLabel>
            <Select
              value={formData.category}
              onChange={handleChange('category')}
              label="Category"
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.custom?.lightGreyBorder || theme.palette.custom?.lightGrey,
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.primary.light,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.primary.main,
                },
              }}
            >
              <MenuItem value="Men">Men</MenuItem>
              <MenuItem value="Women">Women</MenuItem>
              <MenuItem value="Kids">Kids</MenuItem>
            </Select>
            {errors.category && <FormHelperText>{errors.category}</FormHelperText>}
          </FormControl>
        </Grid>

        {/* Sub-Category */}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth error={!!errors.subCategory}>
            <InputLabel>Sub-Category</InputLabel>
            <Select
              value={formData.subCategory}
              onChange={handleChange('subCategory')}
              label="Sub-Category"
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.custom?.lightGreyBorder || theme.palette.custom?.lightGrey,
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.primary.light,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.primary.main,
                },
              }}
            >
              {subCategories[formData.category]?.map((subCat) => (
                <MenuItem key={subCat} value={subCat}>
                  {subCat}
                </MenuItem>
              ))}
            </Select>
            {errors.subCategory && <FormHelperText>{errors.subCategory}</FormHelperText>}
          </FormControl>
        </Grid>

        {/* Price */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="number"
            label="Price"
            value={formData.price}
            onChange={handleChange('price')}
            error={!!errors.price}
            helperText={errors.price}
            InputProps={{
              startAdornment: <Typography sx={{ mr: 1, color: theme.palette.text.secondary }}>$</Typography>,
            }}
            sx={{
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
          />
        </Grid>

        {/* Discount Price */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="number"
            label="Discount Price (Optional)"
            value={formData.discountPrice}
            onChange={handleChange('discountPrice')}
            error={!!errors.discountPrice}
            helperText={errors.discountPrice}
            InputProps={{
              startAdornment: <Typography sx={{ mr: 1, color: theme.palette.text.secondary }}>$</Typography>,
            }}
            sx={{
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
          />
        </Grid>

        {/* Sizes */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="body2"
            sx={{
              mb: 1.5,
              color: theme.palette.text.dark,
              fontWeight: 500,
            }}
          >
            Sizes {errors.sizes && <span style={{ color: theme.palette.error.main }}>*</span>}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {sizes.map((size) => (
              <Chip
                key={size}
                label={size}
                onClick={() => handleSizeToggle(size)}
                sx={{
                  backgroundColor: formData.sizes.includes(size)
                    ? theme.palette.primary.main
                    : theme.palette.background.default,
                  color: formData.sizes.includes(size)
                    ? theme.palette.text.white
                    : theme.palette.text.dark,
                  border: `1px solid ${formData.sizes.includes(size) ? theme.palette.primary.main : theme.palette.custom?.lightGreyBorder || theme.palette.custom?.lightGrey}`,
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: formData.sizes.includes(size)
                      ? theme.palette.primary.dark
                      : `${theme.palette.primary.main}15`,
                  },
                }}
              />
            ))}
          </Box>
          {errors.sizes && (
            <FormHelperText error sx={{ mt: 0.5 }}>
              {errors.sizes}
            </FormHelperText>
          )}
        </Grid>

        {/* Colors */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="body2"
            sx={{
              mb: 1.5,
              color: theme.palette.text.dark,
              fontWeight: 500,
            }}
          >
            Colors {errors.colors && <span style={{ color: theme.palette.error.main }}>*</span>}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {colorOptions.map((color) => (
              <Chip
                key={color}
                label={color}
                onClick={() => handleColorToggle(color)}
                sx={{
                  backgroundColor: formData.colors.includes(color)
                    ? theme.palette.primary.main
                    : theme.palette.background.default,
                  color: formData.colors.includes(color)
                    ? theme.palette.text.white
                    : theme.palette.text.dark,
                  border: `1px solid ${formData.colors.includes(color) ? theme.palette.primary.main : theme.palette.custom?.lightGreyBorder || theme.palette.custom?.lightGrey}`,
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: formData.colors.includes(color)
                      ? theme.palette.primary.dark
                      : `${theme.palette.primary.main}15`,
                  },
                }}
              />
            ))}
          </Box>
          {errors.colors && (
            <FormHelperText error sx={{ mt: 0.5 }}>
              {errors.colors}
            </FormHelperText>
          )}
        </Grid>

        {/* Stock Quantity */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="number"
            label="Stock Quantity"
            value={formData.stock}
            onChange={handleChange('stock')}
            error={!!errors.stock}
            helperText={errors.stock}
            sx={{
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
          />
        </Grid>

        {/* Upload Images */}
        <Grid item xs={12}>
          <Typography
            variant="body2"
            sx={{
              mb: 1.5,
              color: theme.palette.text.dark,
              fontWeight: 500,
            }}
          >
            Product Images {errors.images && <span style={{ color: theme.palette.error.main }}>*</span>}
          </Typography>
          <Box
            sx={{
              border: `2px dashed ${theme.palette.custom?.lightGreyBorder || theme.palette.custom?.lightGrey}`,
              borderRadius: 2,
              p: 3,
              textAlign: 'center',
              backgroundColor: theme.palette.background.default,
              cursor: 'pointer',
              '&:hover': {
                borderColor: theme.palette.primary.main,
                backgroundColor: `${theme.palette.primary.main}08`,
              },
            }}
          >
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="image-upload"
              multiple
              type="file"
              onChange={handleImageUpload}
            />
            <label htmlFor="image-upload">
              <Button
                component="span"
                startIcon={<CloudUploadIcon />}
                sx={{
                  color: theme.palette.primary.main,
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: `${theme.palette.primary.main}15`,
                  },
                }}
              >
                Upload Images
              </Button>
            </label>
            <Typography
              variant="caption"
              sx={{
                display: 'block',
                mt: 1,
                color: theme.palette.text.secondary,
              }}
            >
              Click to upload or drag and drop (Multiple images allowed)
            </Typography>
          </Box>
          {errors.images && (
            <FormHelperText error sx={{ mt: 0.5 }}>
              {errors.images}
            </FormHelperText>
          )}

          {/* Preview Images */}
          {formData.images.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
              {formData.images.map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    position: 'relative',
                    width: 120,
                    height: 120,
                    borderRadius: 2,
                    overflow: 'hidden',
                    border: `2px solid ${theme.palette.custom?.lightGreyBorder || theme.palette.custom?.lightGrey}`,
                  }}
                >
                  <img
                    src={image}
                    alt={`Preview ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveImage(index)}
                    sx={{
                      position: 'absolute',
                      top: 4,
                      right: 4,
                      backgroundColor: theme.palette.error.main,
                      color: theme.palette.text.white,
                      '&:hover': {
                        backgroundColor: theme.palette.error.dark,
                      },
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Box>
          )}
        </Grid>

        {/* Action Buttons */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
            <Button
              onClick={onCancel}
              sx={{
                color: theme.palette.text.dark,
                borderColor: theme.palette.custom?.lightGreyBorder || theme.palette.custom?.lightGrey,
                textTransform: 'none',
                px: 3,
                '&:hover': {
                  borderColor: theme.palette.primary.main,
                  backgroundColor: `${theme.palette.primary.main}08`,
                },
              }}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.text.white,
                textTransform: 'none',
                px: 4,
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              {initialData ? 'Update Product' : 'Add Product'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddProductForm;
