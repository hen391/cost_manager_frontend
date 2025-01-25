import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  MenuItem,
  Container,
  Paper,
  Typography,
  Box
} from '@mui/material';
import IDBWrapper from '../idb';

const db = new IDBWrapper('CostManagerDB', 1);

function AddCostForm() {
  const [form, setForm] = useState({
    sum: '',
    category: '',
    description: '',
    date: ''
  });

  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0];
    setForm((prevForm) => ({ ...prevForm, date: currentDate }));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
    <Box 
      sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
        py: 4
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={8}
          sx={{
            p: 4,
            borderRadius: 4,
            bgcolor: 'white'
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            הוספת הוצאה חדשה
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary" gutterBottom>
            מלא/י את הפרטים הבאים כדי להוסיף הוצאה
          </Typography>

          <form>
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
              <Button variant="contained" size="large" onClick={handleSubmit}>
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
