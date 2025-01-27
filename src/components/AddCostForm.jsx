import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  MenuItem,
  Container,
  Paper,
  Typography,
  Box,
  InputAdornment
} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CategoryIcon from '@mui/icons-material/Category';
import DescriptionIcon from '@mui/icons-material/Description';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import IDBWrapper from '../idb';

const db = new IDBWrapper('CostManagerDB', 1);

function AddCostForm() {
  const [form, setForm] = useState({
    sum: '',
    category: '',
    description: '',
    date: ''
  });

    // Automatically sets the current date when the component is loaded.
    useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0];
    setForm((prevForm) => ({ ...prevForm, date: currentDate }));
  }, []);

    // Updates the form state when the user modifies any input field.
    const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

// Handles form submission by adding a new cost entry to the database.
// Resets the form fields after successful addition.
    const handleSubmit = async () => {
    if (!form.sum || !form.category) {
      alert('יש למלא סכום וקטגוריה לפני הוספה.');
      return;
    }

    await db.addCost({ ...form, date: new Date(form.date) });
    alert('הוצאה נוספה בהצלחה!');
    setForm({ sum: '', category: '', description: '', date: form.date });
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          color: '#2c3e50',
          fontWeight: 700,
          mb: 4
        }}
      >
        Add New Expense
      </Typography>
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: '16px',
            bgcolor: 'white',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
          }}
        >
          <form>
            <TextField
              label="סכום"
              name="sum"
              value={form.sum}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoneyIcon sx={{ color: '#6b7280' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '&:hover fieldset': {
                    borderColor: '#3b82f6',
                  },
                },
                mb: 2
              }}
            />

            <TextField
              label="קטגוריה"
              name="category"
              value={form.category}
              onChange={handleChange}
              select
              fullWidth
              margin="normal"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CategoryIcon sx={{ color: '#6b7280' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '&:hover fieldset': {
                    borderColor: '#3b82f6',
                  },
                },
                mb: 2
              }}
            >
              <MenuItem value="Food">אוכל</MenuItem>
              <MenuItem value="Transportation">תחבורה</MenuItem>
              <MenuItem value="Entertainment">בידור</MenuItem>
              <MenuItem value="Health">בריאות</MenuItem>
              <MenuItem value="Education">חינוך</MenuItem>
              <MenuItem value="Utilities">שירותים</MenuItem>
            </TextField>

            <TextField
              label="תיאור"
              name="description"
              value={form.description}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DescriptionIcon sx={{ color: '#6b7280' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '&:hover fieldset': {
                    borderColor: '#3b82f6',
                  },
                },
                mb: 2
              }}
            />

            <TextField
              label="תאריך"
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarTodayIcon sx={{ color: '#6b7280' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '&:hover fieldset': {
                    borderColor: '#3b82f6',
                  },
                },
                mb: 3
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <Box display="flex" justifyContent="center">
              <Button
                variant="contained"
                size="large"
                onClick={handleSubmit}
                sx={{
                  borderRadius: '12px',
                  padding: '12px 48px',
                  fontSize: '1.1rem',
                  textTransform: 'none',
                  background: 'linear-gradient(45deg, #3b82f6 30%, #60a5fa 90%)',
                  boxShadow: '0 3px 15px rgba(59, 130, 246, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #2563eb 30%, #3b82f6 90%)',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 6px 20px rgba(59, 130, 246, 0.4)',
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                הוסף הוצאה
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}

export default AddCostForm;
