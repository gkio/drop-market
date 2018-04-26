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

  componentDidMount() {
    // fetch(dataAPI)
    //   .then(response => response.json())
    //   .then((data) => {
    //   console.log(data);
    //     this.setState({data})
    //   })

  }

  render() {
    return (
      <Wrapper>
        <Drop/>
      </Wrapper>
    );
  }
}

export default App;
