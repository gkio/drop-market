import React, {Component} from 'react';
import styled from 'styled-components';
import Drag from '../Drag';
import image from './images/arrow.png';
import Stats from '../Stats';

const Block = styled.div`
  background-color: #252d47;
  border-radius: 15px;
  width: 480px;
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
  
  &:hover{
    cursor:pointer;
  }
`

export default class Drop extends Component {

  state = {
    visible: true
  }

  toggleStatsVisibility = () => {
    console.log(this.state.visible)
    this.setState(({visible}) => ({visible: !visible}))
  }


  render() {
    const {visible} = this.state;
    return (
      <Drag>
        <Block>
          <Header>
            <Title> Test Block </Title>
            <ArrowIcon onClick={this.toggleStatsVisibility} src={image} />
          </Header>
          <Stats visible={visible}/>
        </Block>
      </Drag>
    )
  }
}