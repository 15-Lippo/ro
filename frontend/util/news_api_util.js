// TODO: Diversify query results, obtain unique articles with images, and select important description
export const fetchNews = () => {
  // let url = 'http://newsapi.org/v2/everything?';
  // let sources = 'sources=cnbc,the-wall-street-journal';
  // let pageSize = '&pageSize=30';
  // url = url + sources + pageSize + `&apiKey=${window.newsAPIKey}`;
  return $.ajax('https://newsapi.org/v2/everything?sources=business-insider,cnbc,the-wall-street-journal&pageSize=30&apiKey=a8591a0bdd2945bea9a91fb46d21dfda');
};
