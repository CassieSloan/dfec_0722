import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
    max-width: 1200px;
    padding: 24px;
    margin: 0 auto;
`;

const Title = styled.h1`
    font-family: sans-serif;
    font-size: 32px;
    font-weight: 600;
    text-align: center;
`;

const App = ({ categories, merchants, transactions }) => (
    <PageContainer>
        <Title>Transactions</Title>

        <table>
            <tbody>
                <tr>
                    <td>Complete</td>
                </tr>
            </tbody>
        </table>
    </PageContainer>
)

export default App;