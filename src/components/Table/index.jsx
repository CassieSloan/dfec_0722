import React from 'react';
import Section from '../Section/index.jsx';

const Table = ({ categories, merchants, transactions }) => {
  console.log('TRANSACTIONS', transactions);
  console.log('MERCHANTS', merchants);
  console.log('CATEGORIES', categories);

  const columns = [
    'Status',
    'Date',
    'Merchant Name',
    'Team Member',
    'Category (dropdown)',
    'Amount',
    'GST',
    'Budget',
    'Receipt (read-only checkbox)',
    'Billable (checkbox)',
  ];

  return (
    <Section>
      <table>
        <tbody>
          <tr>
            {columns.map((item) => {
              return <th key={item}>{item}</th>;
            })}
          </tr>
          {transactions.map((item) => {
            const { status, date, merchant, teamMember, category, amount, budget, receipt, billable } = item;
            return (
              <tr key={item}>
                <td>{status}</td>
                <td>{date}</td>
                <td>{merchant}</td>
                <td>{teamMember}</td>
                <td>{category}</td>
                <td>{amount}</td>
                <td>{budget}</td>
                <td>{receipt}</td>
                <td>{billable}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Section>
  );
};
export default Table;
