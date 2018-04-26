import React, { Component } from 'react';
import styled, {injectGlobal} from 'styled-components';
import Drop from './Components/Drop';


const dataAPI = 'https://poloniex.com/public?command=returnOrderBook&currencyPair=BTC_ETH&depth=10';

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
    filteredData : {},
    maxRange: [],
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

  componentDidMount() {
    fetch(dataAPI)
      .then(response => response.json())
      .then((data) => {
        const asks = this.filterMarket(data.asks);
        const bids = this.filterMarket(data.bids);


        const filteredData = {asks,bids};
        this.setState(
          () => ({filteredData}),
          () => this.getMaxRangeValue()
          );

      })

  }

  render() {
    const {filteredData: {asks, bids}, maxRange} = this.state;
    return (
      <Wrapper>
        <Drop asks={asks} bids={bids} maxRange={maxRange}/>
      </Wrapper>
    );
  }
}

export default App;
