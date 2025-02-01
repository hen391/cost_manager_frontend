// src/edit_expense_form.jsx
/**
 * Component for editing an existing cost entry.
 * Provides a form to select and update an expense from the database.
 * @module EditExpenseForm
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
  Select,
  FormControl,
  InputLabel,
  InputAdornment,
  Card,
  CardContent
} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CategoryIcon from '@mui/icons-material/Category';
import DescriptionIcon from '@mui/icons-material/Description';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EditIcon from '@mui/icons-material/Edit';
import IDBWrapper from '../idb';

// Initialize the database with a specific name and version
const db = new IDBWrapper('CostManagerDB', 1);

/**
 * @typedef {Object} FormState
 * @property {string} id - The ID of the selected expense
 * @property {string} sum - The amount of the expense
 * @property {string} category - The category of the expense
 * @property {string} description - The description of the expense
 * @property {string} date - The date of the expense
 */

/**
 * @typedef {Object} ExpenseState
 * @property {Array} expenses - List of all expenses
 * @property {number} selectedMonth - Currently selected month (1-12)
 * @property {number} selectedYear - Currently selected year
 */

// Define category colors for different expense categories
const categoryColors = {
  Food: '#4CAF50',
  Transportation: '#2196F3',
  Entertainment: '#FF9800',
  Health: '#E91E63',
  Education: '#9C27B0',
  Utilities: '#00BCD4'
};

/**
 * EditExpenseForm Component
 * Provides interface for selecting and editing existing expenses.
 * @returns {JSX.Element} A form to edit an existing cost entry.
 */
function EditExpenseForm() {
  /** @type {[FormState, Function]} Form state and setter */
  const [form, setForm] = useState({
    id: '',
    sum: '',
    category: '',
    description: '',
    date: ''
  });

  /** @type {[Array, Function]} Expenses list state and setter */
  const [expenses, setExpenses] = useState([]);
  /** @type {[number, Function]} Selected month state and setter */
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  /** @type {[number, Function]} Selected year state and setter */
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  /**
   * Fetches all expenses from the database for the selected month and year.
   * Updates the expenses state with the fetched data.
   * @async
   */
  useEffect(() => {
    const fetchExpenses = async () => {
      const allExpenses = await db.getCostsByMonthYear(selectedMonth, selectedYear);
      setExpenses(allExpenses);
    };
    fetchExpenses();
  }, [selectedMonth, selectedYear]);

  /**
   * Handles form field changes.
   * @param {Object} e - The event object.
   * @param {string} e.target.name - The name of the form field.
   * @param {string} e.target.value - The new value of the form field.
   */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /**
   * Submits the updated expense to the database.
   * Validates required fields before submission.
   * @async
   */
  const handleEdit = async () => {
    if (!form.id || !form.sum || !form.category) {
      alert('Please select an expense and fill in the amount and category before editing.');
      return;
    }

    const updatedExpense = { ...form, date: new Date(form.date) };
    await db.updateCost(updatedExpense);
    alert('Expense edited successfully!');
    setForm({ id: '', sum: '', category: '', description: '', date: '' });
  };

  /**
   * Handles the selection of an expense to edit.
   * Updates the form state with the selected expense's details.
   * @param {Object} event - The event object from the select component.
   */
  const handleExpenseSelect = (event) => {
    const selectedExpense = expenses.find(expense => expense.id === event.target.value);
    if (selectedExpense) {
      setForm({
        id: selectedExpense.id,
        sum: selectedExpense.sum,
        category: selectedExpense.category,
        description: selectedExpense.description,
        date: new Date(selectedExpense.date).toISOString().split('T')[0]
      });
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography 
        variant="h4" 
        align="center" 
        sx={{ 
          color: '#2c3e50',
          fontWeight: 700,
          mb: 4
        }}
      >
        Edit Expense
      </Typography>

      <Box sx={{ 
        display: 'flex', 
        gap: 2, 
        mb: 4,
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Month</InputLabel>
          <Select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            label="Month"
            sx={{
              borderRadius: '12px',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            {[...Array(12).keys()].map((month) => (
              <MenuItem key={month + 1} value={month + 1}>{month + 1}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Year</InputLabel>
          <Select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            label="Year"
            sx={{
              borderRadius: '12px',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            {[...Array(10).keys()].map((yearOffset) => {
              const year = new Date().getFullYear() - yearOffset;
              return <MenuItem key={year} value={year}>{year}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </Box>

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
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Select Expense</InputLabel>
              <Select
                name="id"
                value={form.id}
                onChange={handleExpenseSelect}
                label="Select Expense"
                sx={{
                  borderRadius: '12px',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                {expenses.map((expense) => (
                  <MenuItem key={expense.id} value={expense.id}>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      width: '100%',
                      gap: 2
                    }}>
                      <Typography sx={{ color: categoryColors[expense.category] }}>
                        {expense.category}
                      </Typography>
                      <Typography>₪{expense.sum}</Typography>
                      <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                        {expense.description}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {form.id && (
              <>
                <TextField
                  label="Amount"
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
                    onClick={handleEdit}
                    startIcon={<EditIcon />}
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
                    "Save Changes"
                  </Button>
                </Box>
              </>
            )}
          </form>
        </Paper>
      </Container>
    </Box>
  ); // Returns a form with expense selector and editable fields for sum, category, description, and date to modify existing expenses
}

export default EditExpenseForm;