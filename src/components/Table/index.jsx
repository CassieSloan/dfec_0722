import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import Section from '../Section/index.jsx';
import OnVisible from '../OnVisible/index.jsx';
import * as styles from './styles.module.scss';

const Table = ({ categories, merchants, transactions }) => {
  const [resultData, setResultData] = useState(null);
  const [searchValue, setSearchValue] = useState(null);

  const columns = [
    'Status',
    'Date',
    'Merchant Name',
    'Team Member',
    'Category',
    'Amount',
    'GST',
    'Budget',
    'Receipt',
    'Billable',
  ];

  const statusClasses = {
    incomplete: styles.pinkOpt,
    complete: styles.greenOpt,
    exported: styles.yellowOpt,
  };

  // format table data
  const formattedTransations = transactions.map((item) => {
    const { status, date, merchant, team_member: teamMember, category, amount, gst, budget, receipt, billable } = item;
    const activeMerchant = merchants.find((m) => m.id === merchant)?.name || 'No merhant found';
    const activeCategory = categories.find((m) => m.id === category)?.name || 'No category found';
    const formattedCategories = categories.map((cat) => cat.name);

    const categoryDropDown = (
      <>
        <select className={`${styles.categorySelect} ${styles.blueOpt} `}>
          {formattedCategories.map((cat) => (
            <option defaultValue={cat === activeCategory && 'selected'}>{cat}</option>
          ))}
        </select>
      </>
    );

    const activeStatus = <span className={`${statusClasses[status]} ${styles.status}`}>{status}</span>;

    return {
      status: activeStatus,
      date,
      merchant: activeMerchant,
      teamMember,
      category: categoryDropDown,
      amount,
      gst,
      budget,
      receipt,
      billable,
    };
  });

  // init table data on mount
  useEffect(() => {
    setResultData(formattedTransations);
  }, []);

  // search
  const SearchBar = () => {
    const handleSearchChange = (e) => {
      const searchTerm = e.target.value.toLowerCase() || e.target.value;

      const search = (key) => {
        const filteredTransactions = formattedTransations.filter((item) => {
          const value = item[key];
          const type = typeof value;
          // find value regardless of casing or datatype
          const formattedValue = type === 'string' ? value.toLowerCase() : value.toSt;
          const match = formattedValue?.includes(searchTerm);
          if (match) {
            return item;
          }
          return null;
        });
        return filteredTransactions;
      };

      // raw results
      const allResults = [
        ...search('merchant'),
        ...search('teamMember'),
        ...search('category'),
        ...search('budget'),
        ...search('amount'),
        ...search('gst'),
      ];

      // stripped results
      const formatedResults = [...new Set(allResults)];
      // limit re-renders for performance
      setSearchValue(searchTerm);
      setTimeout(setResultData(formatedResults), 150);
    };

    return (
      <div>
        <input autoFocus type="text" name="search" value={searchValue || ''} onChange={handleSearchChange} />
      </div>
    );
  };

  // re-render after value in input is updated
  // add debounce to reduce num of re-renders

  // paginate allResults
  // on visible

  const dataToUse = resultData || formattedTransations;

  return (
    <Section className={styles.section} containerClassName={styles.container}>
      <SearchBar />
      <table className={styles.table}>
        <tbody>
          <tr>
            {columns.map((item) => {
              return <th key={item}>{item}</th>;
            })}
          </tr>
          {dataToUse.map((item) => {
            const { status, date, merchant, teamMember, category, amount, gst, budget, receipt, billable } = item;

            return (
              <OnVisible key={item} as="tr" className={styles.tableRow} visibleClassName={styles.visibleTableRow}>
                <td>{status}</td>
                <td>
                  <Moment format="DD MMM YYYY">{date}</Moment>
                </td>
                <td>{merchant}</td>
                <td>{teamMember}</td>
                <td>{category}</td>
                <td>${amount}</td>
                <td>${gst}</td>
                <td>{budget}</td>
                <td className={styles.readOnlyChecked}>
                  {receipt ? <input type="checkbox" checked readOnlyChecked /> : <input type="checkbox" />}
                </td>
                <td>{billable ? <input type="checkbox" defaultChecked /> : <input type="checkbox" />}</td>
              </OnVisible>
            );
          })}
        </tbody>
      </table>
      {dataToUse?.length === 0 && <span>{`No matching transations for ${searchValue}`}</span>}
    </Section>
  );
};
export default Table;
