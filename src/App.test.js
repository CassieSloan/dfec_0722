import React from 'react';
import App from './App';
import { render, within, screen } from "@testing-library/react";
import categoriesData from './data/categories.json';
import merchantsData from './data/merchants.json';
import transactionsData from './data/transactions.json';

const renderApp = ({
  categories = categoriesData,
  merchants = merchantsData,
  transactions = transactionsData
} = {}) => render(
  <App
    categories={categories}
    merchants={merchants}
    transactions={transactions}
  />
);

const getRows = (screen) => screen.getAllByRole("row");
const getStatusCell = (row) => within(row).getAllByRole("cell")[0];
const getStatusCellInRow = (screen, rowNumber) => getStatusCell(getRows(screen)[rowNumber]);

it('should show title', () => {
  renderApp();
  
  screen.getByRole("heading", { name: "Transactions" });
});

describe("status", () => {
  it("should show transaction status when it is complete", () => {
    const completeTransaction = transactionsData.find(({ status }) => status === "complete");
    renderApp({ transactions: [completeTransaction] });
  
    const statusCell = getStatusCellInRow(screen, 0);
    within(statusCell).getByText("Complete");
  });
  
  it("should show transaction status when it is incomplete", () => {
    const incompleteTransaction = transactionsData.find(({ status }) => status === "incomplete");
    renderApp({ transactions: [incompleteTransaction] });
  
    const statusCell = getStatusCellInRow(screen, 0);
    within(statusCell).getByText("Incomplete");
  });
});
