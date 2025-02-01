// src/edit_expense_form.jsx
/**
 * Component for editing an existing cost entry.
 * Provides a form to select and update an expense from the database.
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

const db = new IDBWrapper('CostManagerDB', 1);

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
 * @returns {JSX.Element} A form to edit an existing cost entry.
 */
function EditExpenseForm() {
  const [form, setForm] = useState({
    id: '',
    sum: '',
    category: '',
    description: '',
    date: ''
  });

  const [expenses, setExpenses] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  /**
   * Fetches all expenses from the database on component mount.
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
   */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /**
   * Submits the updated expense to the database.
   */
  const handleEdit = async () => {
    if (!form.id || !form.sum || !form.category) {
      alert('יש לבחור הוצאה ולמלא סכום וקטגוריה לפני עריכה.');
      return;
    }

    const updatedExpense = { ...form, date: new Date(form.date) };
    await db.updateCost(updatedExpense);
    alert('הוצאה נערכה בהצלחה!');
    setForm({ id: '', sum: '', category: '', description: '', date: '' });
  };

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
                    שמור שינויים
                  </Button>
                </Box>
              </>
            )}
          </form>
        </Paper>
      </Container>
    </Box>
  );
}

export default EditExpenseForm;