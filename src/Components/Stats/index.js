import React, { Component } from 'react'
import styled from 'styled-components'
import {Row} from './Row';

const Wr = styled.div`
  margin-top: 10px;
  padding: 0 30px;
  height: ${props => props.visible ? 250 : 0}px;
  transition: height .5s ease-in-out;
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
`;

const RowWr = styled.div`
  width: 50%;
  flex: 0 0 50%;
`

export default class Stats extends Component {
  render () {
    const {visible} = this.props;
    return (
      <Wr visible={visible}>
        <Header>
          <Wrapper>
            <Label noMargin> price </Label>
            <Separator>
              <Label> BTC </Label>
              <Label> USD </Label>
            </Separator>
          </Wrapper>
          <Wrapper>
            <Separator>
              <Label> USD </Label>
              <Label> BTC </Label>
            </Separator>
            <Label noMargin> price </Label>
          </Wrapper>
        </Header>
        <StatsWr>
          <RowWr>
            <Row price={500} coin1={500} coin2={500} line={15} />
            <Row price={500} coin1={500} coin2={500} line={18} />
            <Row price={500} coin1={500} coin2={500} line={21} />
            <Row price={500} coin1={500} coin2={500} line={26} />
            <Row price={500} coin1={500} coin2={500} line={37} />
          </RowWr>
          <RowWr>
            <Row price={500} coin1={500} coin2={500} line={15} reverse/>
            <Row price={500} coin1={500} coin2={500} line={18} reverse/>
            <Row price={500} coin1={500} coin2={500} line={21} reverse/>
            <Row price={500} coin1={500} coin2={500} line={26} reverse/>
            <Row price={500} coin1={500} coin2={500} line={37} reverse/>
          </RowWr>
        </StatsWr>
      </Wr>
    )
  }
}