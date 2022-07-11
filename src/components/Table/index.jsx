import React, { useState, useEffect, Fragment } from 'react';
import Moment from 'react-moment';
import Section from '../Section/index.jsx';
import OnVisible from '../OnVisible/index.jsx';
import * as styles from './styles.module.scss';

const Table = ({ categories, merchants, transactions }) => {
  const [resultData, setResultData] = useState([]);
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
  const formattedTransations = transactions?.map((item) => {
    // get values
    const { status, date, merchant, team_member: teamMember, category, amount, gst, budget, receipt, billable } = item;
    // format applicable items
    const activeMerchant = merchants?.find((m) => m.id === merchant)?.name || 'No merhant found';
    const activeCategory = categories?.find((m) => m.id === category)?.name || 'No category found';
    const formattedCategories = categories.map((cat) => cat.name);

    const categoryDropDown = (
      <select className={`${styles.categorySelect} ${styles.blueOpt} `}>
        {formattedCategories.map((cat, index) => {
          return (
            <option
              selected={cat === activeCategory && 'selected'}
              value={activeCategory}
              key={`option ${index}: ${cat}`}
            >
              {cat}
            </option>
          );
        })}
      </select>
    );

    const activeStatus = <span className={`${statusClasses[status]} ${styles.status}`}>{status}</span>;
    // return formatted data to use
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // search comp
  const SearchBar = () => {
    const handleSearchChange = (e) => {
      // search value
      const searchTerm = e.target.value.toLowerCase() || e.target.value;

      const search = (key) => {
        const filteredTransactions = formattedTransations.filter((item) => {
          const value = item[key];
          // find value regardless of casing or datatype
          const typeFormatter = (v) => {
            const type = typeof v;

            if (type === 'string') {
              return v.toLowerCase();
            }
            if (type === 'object') {
              return v.props.children.find((val) => val.props.selected).props.value;
            }
            if (type === 'number') {
              return v.toString();
            }
            return v.toString();
          };

          const formattedValue = typeFormatter(value);
          const match = formattedValue?.includes(searchTerm);

          // return matching items
          return match ? item : null;
        });
        return filteredTransactions;
      };

      // populate results
      const allResults = [
        ...search('merchant'),
        ...search('teamMember'),
        ...search('category'),
        ...search('budget'),
        ...search('amount'),
        ...search('gst'),
      ];

      // strip duplicate matches
      const formatedResults = [...new Set(allResults)];
      // limit re-renders for performance
      setTimeout(setResultData(formatedResults), 150);
      setSearchValue(searchTerm);
    };

    // search ui
    return (
      <div className={styles.searchBar}>
        <input
          className={styles.searchInput}
          autoFocus
          type="text"
          name="search"
          value={searchValue || ''}
          onChange={handleSearchChange}
          placeholder="Search"
        />
      </div>
    );
  };

  const dataToUse = resultData || formattedTransations;

  return (
    <Section className={styles.section} containerClassName={styles.container}>
      <SearchBar />
      <div className={styles.tableContainer}>
        {dataToUse?.length !== 0 && (
          <table className={styles.table}>
            <tbody>
              <tr>
                {columns.map((item) => {
                  return <th key={item}>{item}</th>;
                })}
              </tr>
              {dataToUse.map((item, index) => {
                const { status, date, merchant, teamMember, category, amount, gst, budget, receipt, billable } = item;
                return (
                  <Fragment key={`row item: ${index}`}>
                    <OnVisible as="tr" className={styles.tableRow} visibleClassName={styles.visibleTableRow}>
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
                        {receipt ? (
                          <input type="checkbox" defaultChecked readonlychecked="true" />
                        ) : (
                          <input type="checkbox" />
                        )}
                      </td>
                      <td>{billable ? <input type="checkbox" defaultChecked /> : <input type="checkbox" />}</td>
                    </OnVisible>
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        )}
        {dataToUse?.length === 0 && (
          <span className={styles.downState}>{`No matching transations for '${searchValue}'`}</span>
        )}
      </div>
    </Section>
  );
};
export default Table;
