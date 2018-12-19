// TODO: Improve these queries (use more filters, like chartInterval)
// TODO: Clean up method names
export const fetchIntradayData = ticker => (
  $.ajax({
    url: `https://api.iextrading.com/1.0/stock/${ticker}/chart/1d` 
  })
);

export const fetchMonthData = ticker => (
  $.ajax({
    url: `https://api.iextrading.com/1.0/stock/${ticker}/chart/1m`
  })
);

export const fetchThreeMonthsData = ticker => (
  $.ajax({
    url: `https://api.iextrading.com/1.0/stock/${ticker}/chart/3m`
  })
);

export const fetchYearData = ticker => (
  $.ajax({
    url: `https://api.iextrading.com/1.0/stock/${ticker}/chart/1y`
  })
);

export const fetchFiveYearsData = ticker => (
  $.ajax({
    url: `https://api.iextrading.com/1.0/stock/${ticker}/chart/5y`
  })
);

export const fetchStockCompanyInfo = ticker => (
  $.ajax({
    url: `https://api.iextrading.com/1.0/stock/market/batch?symbols=${ticker}&types=quote,company,info`
  })
);
