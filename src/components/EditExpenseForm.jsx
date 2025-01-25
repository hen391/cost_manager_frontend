import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  MenuItem,
  Container,
  Paper,
  Typography,
  Box,
  Select
} from '@mui/material';
import IDBWrapper from '../idb';

const db = new IDBWrapper('CostManagerDB', 1);

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

  useEffect(() => {
    const fetchExpenses = async () => {
      const allExpenses = await db.getCostsByMonthYear(selectedMonth, selectedYear);
      console.log('Fetched expenses:', allExpenses);
      setExpenses(allExpenses);
    };
    fetchExpenses();
  }, [selectedMonth, selectedYear]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
    <Box 
      sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
        py: 4
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Edit Expense
      </Typography>
      <Container maxWidth="sm">
        <Paper
          elevation={8}
          sx={{
            p: 4,
            borderRadius: 4,
            bgcolor: 'white'
          }}
        >
          <Typography variant="subtitle1" align="center" color="text.secondary" gutterBottom>
            בחר/י הוצאה לעריכה
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
            <Select value={selectedMonth} onChange={(e) => setSelectedMonth(parseInt(e.target.value))}>
              {[...Array(12).keys()].map((month) => (
                <MenuItem key={month + 1} value={month + 1}>{month + 1}</MenuItem>
              ))}
            </Select>
            <Select value={selectedYear} onChange={(e) => setSelectedYear(parseInt(e.target.value))}>
              {[...Array(10).keys()].map((yearOffset) => {
                const year = new Date().getFullYear() - yearOffset;
                return <MenuItem key={year} value={year}>{year}</MenuItem>;
              })}
            </Select>
          </Box>

          <form>
            <TextField
              label="בחר הוצאה"
              name="id"
              value={form.id}
              onChange={handleExpenseSelect}
              select
              fullWidth
              margin="normal"
              variant="outlined"
            >
              {expenses.map((expense) => (
                <MenuItem key={expense.id} value={expense.id}>
                  {expense.description} - {expense.sum}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="סכום"
              name="sum"
              value={form.sum}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
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
              InputLabelProps={{
                shrink: true, 
              }}
            />

            <Box display="flex" justifyContent="center" mt={3}>
              <Button variant="contained" size="large" onClick={handleEdit}>
                שמור שינויים
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}

export default EditExpenseForm; 