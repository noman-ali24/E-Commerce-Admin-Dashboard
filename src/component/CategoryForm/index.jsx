import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Chip,
  Typography,
  Grid,
  useTheme,
  FormHelperText,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const CategoryForm = ({ onSubmit, onCancel, initialData = null }) => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    subcategories: initialData?.subcategories || [],
  });
  const [newSubcategory, setNewSubcategory] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        subcategories: initialData.subcategories || [],
      });
    }
  }, [initialData]);

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleAddSubcategory = () => {
    if (newSubcategory.trim() && !formData.subcategories.includes(newSubcategory.trim())) {
      setFormData((prev) => ({
        ...prev,
        subcategories: [...prev.subcategories, newSubcategory.trim()],
      }));
      setNewSubcategory('');
      if (errors.subcategories) {
        setErrors((prev) => ({
          ...prev,
          subcategories: '',
        }));
      }
    }
  };

  const handleRemoveSubcategory = (index) => {
    setFormData((prev) => ({
      ...prev,
      subcategories: prev.subcategories.filter((_, i) => i !== index),
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSubcategory();
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Category name is required';
    }
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
        {/* Category Name */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Category Name"
            value={formData.name}
            onChange={handleChange('name')}
            error={!!errors.name}
            helperText={errors.name}
            placeholder="e.g., Men, Women, Kids"
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

        {/* Subcategories */}
        <Grid item xs={12}>
          <Typography
            variant="body2"
            sx={{
              mb: 1.5,
              color: theme.palette.text.dark,
              fontWeight: 500,
            }}
          >
            Subcategories
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              fullWidth
              placeholder="Enter subcategory name (e.g., Shirts, Pants, Shoes)"
              value={newSubcategory}
              onChange={(e) => setNewSubcategory(e.target.value)}
              onKeyPress={handleKeyPress}
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
              }}
            />
            <Button
              type="button"
              variant="contained"
              onClick={handleAddSubcategory}
              startIcon={<AddIcon />}
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.text.white,
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                },
                textTransform: 'none',
                px: 3,
              }}
            >
              Add
            </Button>
          </Box>

          {/* Subcategories List */}
          {formData.subcategories.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {formData.subcategories.map((sub, index) => (
                <Chip
                  key={index}
                  label={sub}
                  onDelete={() => handleRemoveSubcategory(index)}
                  deleteIcon={
                    <IconButton
                      size="small"
                      sx={{
                        color: theme.palette.text.white,
                        '&:hover': {
                          color: theme.palette.error.main,
                        },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  }
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.text.white,
                    '& .MuiChip-deleteIcon': {
                      color: theme.palette.text.white,
                      '&:hover': {
                        color: theme.palette.error.main,
                      },
                    },
                  }}
                />
              ))}
            </Box>
          )}

          {formData.subcategories.length === 0 && (
            <Typography
              variant="caption"
              sx={{
                color: theme.palette.text.disabled,
                fontStyle: 'italic',
              }}
            >
              No subcategories added yet. Add subcategories like Shirts, Pants, Shoes, Dresses, etc.
            </Typography>
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
              {initialData ? 'Update Category' : 'Add Category'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CategoryForm;
