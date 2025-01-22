import React from 'react';
import AddCostForm from './components/AddCostForm';
import PieChart from './components/PieChart';

function App() {
    return (
        <div>
            <h1>Cost Manager Frontend</h1>
            <AddCostForm />
            <PieChart/>
        </div>
    );
}

export default App;
