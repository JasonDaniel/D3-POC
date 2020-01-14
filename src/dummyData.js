import * as d3 from "d3";
const brands = [
  "Vogue",
  "Allure",
  "CN Traveller",
  "AD",
  "Bon Appetite",
  "Wired",
  "Teen Vogue",
  "ARS Tech",
  "GQ"
];
const randomAroundMean = (mean, deviation) =>
  mean + boxMullerRandom() * deviation;
const boxMullerRandom = () =>
  Math.sqrt(-2.0 * Math.log(Math.random())) *
  Math.cos(2.0 * Math.PI * Math.random());

const today = new Date();
const formatDate = d3.timeFormat("%m/%d/%Y");
export const getTimelineData = (length = 365) => {
  let lastVisit = randomAroundMean(700, 200);
  const firstVisit = d3.timeDay.offset(today, -length);

  return new Array(length).fill(0).map((d, i) => {
    lastVisit += randomAroundMean(0, 2);
    var data = brands.map(brandName => {
      return {
        brand: brandName,
        visits: {
          date: formatDate(d3.timeDay.offset(firstVisit, i)),
          visitValue: lastVisit
        }
      };
    });
    return data;
  });
};

export const getScatterData = (count = 100) =>
  new Array(count).fill(0).map((d, i) => ({
    temperature: randomAroundMean(70, 20),
    humidity: randomAroundMean(0.5, 0.1)
  }));
