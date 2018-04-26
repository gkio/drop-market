import React, { Component } from 'react';
import styled, {injectGlobal} from 'styled-components';
import Drop from './Components/Drop';


const dataAPI = 'https://poloniex.com/public?command=returnOrderBook&currencyPair=BTC_ETH&depth=';

injectGlobal`
  *{
    box-sizing: border-box;
  }
  
  body{
    font-family: 'Roboto', sans-serif;
  }
`;

const Wrapper = styled.div``;

class App extends Component {

  state = {
    btcValue : 0,
    filteredData : {
      asks: [],
      bids: [],
    },
    maxRange: [],
    page: 0,
  }


  filterMarket = list => list.map((data) => this.getDataFromMarketData(data))

  getDataFromMarketData = data => {
    let {0:price, 1: altcoin} = data;
    const btcValue = parseFloat(this.state.btcValue + altcoin);
    this.setState({btcValue})

    price = parseFloat(price).toFixed(2);
    altcoin = parseFloat(altcoin).toFixed(2);

    return {
      price,
      altcoin,
      btcValue
    }
  }


  getMaxRangeValue = () => {
    const {filteredData: {asks, bids}} = this.state;
    const btcMaxAsks = Math.max(...asks.map(o => o.btcValue));
    const btcMaxBids = Math.max(...bids.map(o => o.btcValue));

    const maxRange = {btcMaxAsks, btcMaxBids};

    this.setState({maxRange});
  }

  fetchData = () => {
    const {page, filteredData} = this.state;


    fetch(dataAPI + (page + 10))
      .then(response => response.json())
      .then((data) => {



      const asks = this.filterMarket(data.asks.splice(-1*10));
      const bids = this.filterMarket(data.bids.splice(-1*10));

        const tmpFilteredData = {
          asks: [...filteredData.asks, ...asks],
          bids: [...filteredData.bids, ...bids],
        };

        this.setState(
          () => ({filteredData: tmpFilteredData}),
          () => this.getMaxRangeValue()
        );

      })
    this.setState(({page}) => ({page: page + 10}))
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const {filteredData: {asks, bids}, maxRange} = this.state;
    return (
      <Wrapper>
        <Drop asks={asks} bids={bids} maxRange={maxRange} fetchData={this.fetchData}/>
      </Wrapper>
    );
  }
}

export default App;
