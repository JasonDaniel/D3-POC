import React from 'react';
import logo from './logo.svg';
import './App.css';
import Chart from './Chart'

const App = () => {

  const width = 1000;
  const height = 800;
  const margin = 80;
  const data = [
    {
      dimBranName: "Vogue",
      value: 400
    },
    {
      dimBranName: "Allure",
      value: 2420
    },
    {
      dimBranName: "Teen Vogue",
      value: 1270
    },
    {
      dimBranName: "CN Traveller",
      value: 553
    },
    {
      dimBranName: "Wired",
      value: 731
    },
    {
      dimBranName: "Bon Appetite",
      value: 136
    },
    {
      dimBranName: "Ars tech",
      value: 682
    },
    {
      dimBranName: "AD",
      value: 239
    },
    {
      dimBranName: "The New Yorker",
      value: 367
    },
    {
      dimBranName: "Vanity Fair",
      value: 442
    }
  ];

        return (
            <div>
              <Chart data = {data} width={width} height={height} margin={margin}/>
            </div>
          );
      
  }


export default App;
