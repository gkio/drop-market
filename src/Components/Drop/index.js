import React, {Component} from 'react';
import styled, {css} from 'styled-components';
import Drag from '../Drag';
import image from './images/arrow.png';
import Stats from '../Stats';

const Block = styled.div`
  background-color: #252d47;
  border-radius: 15px;
  max-width: 480px;
  overflow: hidden;
  box-shadow: 0 0 15px #333;
`;

const Header = styled.div`
  width: 100%;
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-content: center;
  
  &:hover{
    cursor:pointer;
  }
  
`

const Title = styled.span`
  color: #fff;
  font-size: 16px;
`

const ArrowIcon = styled.img`
  width: 20px;
  height: 20px;
  transition: all .17s linear;  
  transform: rotate(${props => props.visible ? 0 : 180}deg);
  
  &:hover{
    cursor:pointer;
  }
`

export default class Drop extends Component {

  state = {
    visible: true
  }

  toggleStatsVisibility = () => {
    this.setState(({visible}) => ({visible: !visible}))
  }


  render() {
    const {visible} = this.state;
    const {asks, bids, maxRange, fetchData} = this.props;
    return (
      <Drag>
        <Block>
          <Header>
            <Title> Test Block </Title>
            <ArrowIcon visible={visible} onClick={this.toggleStatsVisibility} src={image} />
          </Header>
          <Stats visible={visible} asks={asks} bids={bids} maxRange={maxRange} fetchData={fetchData}/>
        </Block>
      </Drag>
    )
  }
}