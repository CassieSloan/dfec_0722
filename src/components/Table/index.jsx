import React from 'react';
import Moment from 'react-moment';
import Section from '../Section/index.jsx';
import * as styles from './styles.module.scss';

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
    'Receipt',
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
            const activeMerchant = merchants.find((m) => m.id === merchant)?.name || 'No merhant found';
            const activeCategory = categories.find((m) => m.id === category)?.name || 'No category found';

            return (
              <tr key={item}>
                <td>{status}</td>
                <td>
                  <Moment format="DD MMM YYYY">{date}</Moment>
                </td>
                <td>{activeMerchant}</td>
                <td>{teamMember}</td>
                <td>{activeCategory}</td>
                <td>${amount}</td>
                <td>{budget}</td>
                <td className={styles.readOnlyChecked}>
                  {receipt ? <input type="checkbox" checked /> : <input type="checkbox" />}
                </td>
                <td>{billable ? <input type="checkbox" checked /> : <input type="checkbox" />}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Section>
  );
};
export default Table;
