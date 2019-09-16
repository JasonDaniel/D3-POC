import React from 'react';
import logo from './logo.svg';
import './App.css';
import Chart from './Chart'

const App = () => {
  const data = [
    {
      country: "India",
      value: 400
    },
    {
      country: "USA",
      value: 2420
    },
    {
      country: "China",
      value: 1270
    },
    {
      country: "UK",
      value: 553
    },
    {
      country: "Germany",
      value: 731
    },
    {
      country: "Sweden",
      value: 136
    },
    {
      country: "France",
      value: 682
    },
    {
      country: "Australia",
      value: 239
    },
    {
      country: "Canada",
      value: 367
    },
    {
      country: "Brazil",
      value: 442
    }
  ];

        return (
            <div>
              <Chart chartData = {data}/>
            </div>
          );
      
  }


export default App;
