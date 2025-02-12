// src/components/AddCostForm.jsx
/**
 * Component for adding a new cost entry.
 * Provides a form with fields for sum, category, description, and date.
 * @module AddCostForm
 */
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

/**
 * @typedef {Object} FormState
 * @property {string} sum - The amount of the expense
 * @property {string} category - The category of the expense
 * @property {string} description - The description of the expense
 * @property {string} date - The date of the expense
 */

/**
 * AddCostForm Component
 * Provides interface for adding new expenses to the database.
 * @returns {JSX.Element} A form to add new costs.
 */
function AddCostForm() {
  /** @type {[FormState, Function]} Form state and setter */
  const [form, setForm] = useState({
    sum: '',
    category: '',
    description: '',
    date: ''
  });

  /**
   * Sets the current date when the component is mounted.
   * @type {React.EffectCallback}
   */
  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0];
    setForm((prevForm) => ({ ...prevForm, date: currentDate }));
  }, []);

  /**
   * Handles input field changes.
   * @param {Object} e - The event object.
   * @param {string} e.target.name - The name of the form field.
   * @param {string} e.target.value - The new value of the form field.
   */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /**
   * Submits the form and adds a new cost entry to the database.
   * Validates required fields before submission.
   * @async
   */
  const handleSubmit = async () => {
    if (!form.sum) {
      alert('Please fill in the sum before adding.');
      return;
    }
    if(form.sum<=0){
      alert('Sum must be greater than 0.');
      return;
    }
    if (isNaN(form.sum) || form.sum.trim() === '') {
      alert('Sum must be a valid number.');
      return;
    }
    if(!form.category){
      alert('Please select a category before adding.');
      return;
    }
    if(!form.description){
      alert('Please fill in the description before adding.');
      return;
    }

    await db.addCost({ ...form, date: new Date(form.date) });
    alert('Expense added successfully!');
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
              label="Sum"
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
              label="Category"
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
              <MenuItem value="Food">Food</MenuItem>
              <MenuItem value="Transportation">Transportation</MenuItem>
              <MenuItem value="Entertainment">Entertainment</MenuItem>
              <MenuItem value="Health">Health</MenuItem>
              <MenuItem value="Education">Education</MenuItem>
              <MenuItem value="Utilities">Utilities</MenuItem>
            </TextField>

            <TextField
              label="Description"
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
              label="Date"
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
                Add Expense
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  ); // Returns a form with input fields for sum, category, description, and date to add new expenses
}

export default AddCostForm;
