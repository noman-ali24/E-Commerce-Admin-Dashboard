import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  useTheme,
  FormHelperText,
  IconButton,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';

const BannerForm = ({ onSubmit, onCancel, initialData = null, type = 'slider' }) => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    subtitle: initialData?.subtitle || '',
    image: initialData?.image || '',
    link: initialData?.link || '',
    isActive: initialData?.isActive !== undefined ? initialData.isActive : true,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        subtitle: initialData.subtitle || '',
        image: initialData.image || '',
        link: initialData.link || '',
        isActive: initialData.isActive !== undefined ? initialData.isActive : true,
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

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: '',
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (type === 'offer' && !formData.title.trim()) {
      newErrors.title = 'Banner title is required';
    }
    if (!formData.image) {
      newErrors.image = 'Banner image is required';
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
        {/* Title (for Offer Banners) */}
        {type === 'offer' && (
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Banner Title"
              placeholder="e.g., Winter Sale 50% Off"
              value={formData.title}
              onChange={handleChange('title')}
              error={!!errors.title}
              helperText={errors.title}
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
        )}

        {/* Subtitle (Optional) */}
        {type === 'offer' && (
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Subtitle (Optional)"
              placeholder="e.g., Shop now and save big!"
              value={formData.subtitle}
              onChange={handleChange('subtitle')}
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
        )}

        {/* Link (Optional) */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Link URL (Optional)"
            placeholder="https://example.com"
            value={formData.link}
            onChange={handleChange('link')}
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

        {/* Image Upload */}
        <Grid item xs={12}>
          <Typography
            variant="body2"
            sx={{
              mb: 1.5,
              color: theme.palette.text.dark,
              fontWeight: 500,
            }}
          >
            Banner Image {errors.image && <span style={{ color: theme.palette.error.main }}>*</span>}
          </Typography>
          {formData.image ? (
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                maxWidth: 600,
                borderRadius: 2,
                overflow: 'hidden',
                border: `2px solid ${theme.palette.custom?.lightGreyBorder || theme.palette.custom?.lightGrey}`,
                mb: 2,
              }}
            >
              <img
                src={formData.image}
                alt="Banner preview"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
              <IconButton
                onClick={handleRemoveImage}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  backgroundColor: theme.palette.error.main,
                  color: theme.palette.text.white,
                  '&:hover': {
                    backgroundColor: theme.palette.error.dark,
                  },
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ) : (
            <Box
              sx={{
                border: `2px dashed ${theme.palette.custom?.lightGreyBorder || theme.palette.custom?.lightGrey}`,
                borderRadius: 2,
                p: 4,
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
                id="banner-image-upload"
                type="file"
                onChange={handleImageUpload}
              />
              <label htmlFor="banner-image-upload">
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
                  Upload Banner Image
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
                {type === 'slider'
                  ? 'Recommended: 1920x600px (Homepage Slider)'
                  : 'Recommended: 800x400px (Offer Banner)'}
              </Typography>
            </Box>
          )}
          {errors.image && (
            <FormHelperText error sx={{ mt: 0.5 }}>
              {errors.image}
            </FormHelperText>
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
              {initialData ? 'Update Banner' : 'Add Banner'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BannerForm;
