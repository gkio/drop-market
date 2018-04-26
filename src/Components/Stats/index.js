import React, { Component } from 'react'
import styled from 'styled-components'
import {Row} from './Row';

const Wr = styled.div`
  margin-top: 10px;
  padding: 0 30px;
  height: ${props => props.visible ? 250 : 0}px;
  transition: height .5s ease-in-out;
  margin-bottom: 10px;
`

const Separator = styled.div``
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  width: 45%;
`

const Header = styled.div`
  width: 100%;
  padding: 10px 15px;
  display: flex;  
  justify-content: space-between;
  &:hover{
    cursor:pointer;
  }
  
`

const Label = styled.span`
  margin: 0 ${({noMargin}) => !noMargin ? 10 : 0}px;
  color: #5a668e;
  font-size: 18px;
`

const StatsWr = styled.div`
  display: flex;
  justify-content: space-between;
  overflow-y: scroll;
  height: 85%;
`;

const RowWr = styled.div`
  width: 50%;
  flex: 0 0 50%;
`

export default class Stats extends Component {

  state = {
    loading: false
  }

  getLineRange = (maxValue, value) => {
    return parseFloat(100 / maxValue * value).toFixed(2)
  }

  fetchNewData = () => {
    const {loading} = this.state;
    if(!loading) {
      this.setState(
        ({loading}) => ({loading: !loading}),
        () => this.props.fetchData(),
        ({loading}) => ({loading: !loading}),
      );
    }
  }

  render () {
    const {visible, asks, bids, maxRange : {btcMaxAsks, btcMaxBids}} = this.props;
    const {loading} = this.state;
    return (
      <Wr visible={visible}>
        <Header>
          <Wrapper>
            <Label noMargin> price </Label>
            <Separator>
              <Label> BTC </Label>
              <Label> ETH </Label>
            </Separator>
          </Wrapper>
          <Wrapper>
            <Separator>
              <Label> ETH </Label>
              <Label> BTC </Label>
            </Separator>
            <Label noMargin> price </Label>
          </Wrapper>
        </Header>
        <StatsWr
          onScroll={this.fetchNewData}
        >
          <RowWr>
            {asks && asks.map((ask,index) => (
              <Row
                key={index}
                price={ask.price}
                coin1={ask.altcoin}
                coin2={ask.btcValue}
                line={() => this.getLineRange(btcMaxAsks, ask.btcValue)} />
            ))}
          </RowWr>
          <RowWr>
            {bids && bids.map((bids,index) => (
              <Row
                key={index}
                price={bids.price}
                coin1={bids.altcoin}
                coin2={bids.btcValue}
                line={() => this.getLineRange(btcMaxBids, bids.btcValue)}
                reverse />
            ))}
          </RowWr>
        </StatsWr>
      </Wr>
    )
  }
}