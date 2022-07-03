import React from 'react';
import { Heading, Table } from './components';
import './styles.css';

const App = ({ categories, merchants, transactions }) => {
  return (
    <div>
      <Heading />
      <Table categories={categories} merchants={merchants} transactions={transactions} />
    </div>
  );
};

export default App;
