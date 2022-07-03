## Installation

1) Clone this repo to your machine
2) Run `npm install` to install the dependencies
3) Run `npm start` to run the app in development mode
4) Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Objective
Finance managers use DiviPay to stay on top of their team's expenses. Your challenge is to implement DiviPay's new transaction table to make it easy for finance managers to see what’s happening at a simple glance.

## Requirements
- Please implement a transaction table that displays the provided data. You should have the following columns in your table:
    - Status
    - Date
    - Merchant Name
    - Team Member
    - Category (dropdown list of category names)
    - Amount
    - GST
    - Budget
    - Receipt (read-only checkbox)
    - Billable (checkbox)

- Please implement a search feature that can take any input in the search bar and display any matching transactions in the table. Fields that should be searched are:
    - Merchant Name
    - Team Member
    - Category Name
    - Budget
    - Amount
    - GST   

- Approach this app like it would be used in production by customers and worked on by other developers.
- It should be well structured, fully tested, work according to the requirements and have no bugs.
- Feel free to re-organise the folders, make new modules, and refactor as you see fit.
- The app should look appealing and be easy to use for finance managers.
- We ask that you don't use any libraries not already provided in the package.json to implement the functionality as we want to see your raw coding ability.

## Required effort
You should spend about 4 hours on this challenge. We are interested in seeing your problem solving ability, the structure and robustness of your code and design skills. Your solution does not need to look perfect, but it must be fully tested and work according to the requirements without any bugs.

## Resources
- Here is the documentation for [React Testing Library](https://testing-library.com/docs/react-testing-library/intro), which is the testing library used for this challenge.
- All sample data has been provided for you.
