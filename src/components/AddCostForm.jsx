import React, { useState, useEffect } from 'react';
import { Button, TextField, MenuItem } from '@mui/material';
import IDBWrapper from '../idb';

const db = new IDBWrapper('CostManagerDB', 1);

function AddCostForm() {
    const [form, setForm] = useState({ sum: '', category: '', description: '', date: '' });

    // Set the default date to today
    useEffect(() => {
        const currentDate = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD
        setForm((prevForm) => ({ ...prevForm, date: currentDate }));
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        await db.addCost({ ...form, date: new Date(form.date) });
        alert('Cost added!');
        setForm({ sum: '', category: '', description: '', date: form.date }); // Keep current date
    };

    return (
        <form>
            <TextField
                label="Sum"
                name="sum"
                value={form.sum}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Category"
                name="category"
                value={form.category}
                onChange={handleChange}
                select
                fullWidth
                margin="normal"
            >
                <MenuItem value="Food">Food</MenuItem>
                <MenuItem value="Transportation">Transportation</MenuItem>
                <MenuItem value="Entertainment">Entertainment</MenuItem>
            </TextField>
            <TextField
                label="Description"
                name="description"
                value={form.description}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Date"
                name="date"
                value={form.date}
                fullWidth
                margin="normal"
                InputProps={{
                    readOnly: true, // Make the field non-editable
                }}
            />
            <Button variant="contained" onClick={handleSubmit}>
                Add Cost
            </Button>
        </form>
    );
}

export default AddCostForm;
