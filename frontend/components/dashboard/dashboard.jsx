import React from 'react';
import { Line, LineChart, Tooltip, YAxis, XAxis } from 'recharts';
import { PacmanLoader } from 'react-spinners';

import NewsfeedContainer from './newsfeed_container';
import SidebarContainer from './sidebar_container';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    
    this.customTooltip = this.customTooltip.bind(this);
    this.priceRef = React.createRef();
    this.hoverPriceRef = React.createRef();
    this.priceChangeRef = React.createRef();
    this.hoverPriceChangeRef = React.createRef();
  }

  customTooltip(data) {
    const price = this.priceRef.current;
    const hoverPrice = this.hoverPriceRef.current;
    // const priceChange = this.priceChangeRef.current;
    // const hoverPriceChangeRef = this.hoverPriceChangeRef.current;

    if (price && hoverPrice) {
      if (data.payload[0]) {
        price.classList.add("hide");
        hoverPrice.innerText = `$${(Math.round(data.payload[0].value * 100) / 100).toFixed(2)}`;
      } else {
        price.classList.remove("hide");
        hoverPrice.innerText = "";
      }
    }
  }

  componentDidMount() {
    if (this.props.currentUser) {
      this.props.fetchUserInfo(this.props.currentUser);
    }
  }

  graphHeader() {
    const formatMoney = (amount, showPlus = false) => {
      let sign = showPlus ? '+' : '';
      if (amount < 0) {
        amount *= -1;
        sign = '-';
      }
      return sign + '$' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    };

    if (this.props.currentUser.total_market_value) {
      return (
        <div>
          <h1 ref={this.priceRef} className="portfolio-value">
            {formatMoney(this.props.currentUser.total_market_value)}
          </h1>
          <h1 ref={this.hoverRef} className="potfolio-value"></h1>
        </div>
      );
    }
  }

  render() {
    let data = [];
    let graphData;
    let min = 9999999;
    let max = -9999999;

    if (this.props.currentUser.intraday_data) {
      graphData = this.props.currentUser.intraday_data;
      const times = Object.keys(graphData);
      for (let i = 0; i < times.length; i++) {
        let dataPoint = {};
        dataPoint["time"] = times[i];
        dataPoint["balance"] = graphData[times[i]];
        if (dataPoint["balance"] < min) {
          min = dataPoint["balance"];
        } else if (dataPoint["balance"] > max) {
          max = dataPoint["balance"];
        }
        data.push(dataPoint);
      }
    } else {
      return (
        <div className='loading'>
          <PacmanLoader
            sizeUnit={"px"}
            size={20}
            color={'#21ce99'}
            loading={true}
          />
        </div>
      );
    }

    const content = this.props.currentUser ? (
      <div className="dashboard-container">
        <div>
          { this.graphHeader() }

          <LineChart className="portfolio-chart" width={676} height={196} data={data}>
            <YAxis
              hide={true}
              domain={[min, max]}
            />
            <Tooltip
              isAnimationActive={false}
              position={{ y: -19 }}
              content={this.customTooltip} />

            <Line type="linear" dataKey="balance" stroke="#21ce99" dot={false} strokeWidth={2} />
          </LineChart>
          <ul className="portfolio-chart-tabs-container">
            <div className="chart-tabs">
              <li><a>1D</a></li>
              <li><a>1W</a></li>
              <li><a>1M</a></li>
              <li><a>3M</a></li>
              <li><a>1Y</a></li>
              <li><a>ALL</a></li>
            </div>
          </ul>

          <NewsfeedContainer ticker={"NOTATICKER"} />
        </div>
        <SidebarContainer />
      </div>
    ) : (
      <div className='loading'>
        <PacmanLoader
          sizeUnit={"px"}
          size={800}
          color={'#21ce99'}
          loading={true}
        />
      </div>
    );
    return (
      <div>
        {content}
      </div>
    );
  }
}

export default Dashboard;
