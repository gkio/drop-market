import React, {Fragment} from 'react'
import styled, {css} from 'styled-components'

const Border = styled.div`
  border-top: 1px solid rgba(90,102,142,.5);
  ${({reversed}) => reversed
  ? css`padding-left: 5%`
  : css`padding-right: 5%`
  };
`


const Wr = styled.div`
  height: 35px;
  line-height: 35px;
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding: 0 5px;
  position:relative;
`;

const Line = styled.div`
  transition: all .37s ease-in-out;
  height: 36px;
  position: absolute;
  top: -1px;
  ${({reversed}) => reversed 
    ? css`left: -3%`
    : css`right: -3%`
  };
  background: ${({reversed}) => reversed ?  'linear-gradient(#295cff, #4f79ff);' : 'linear-gradient(#2fd840, #00ff1a);'};
  width: ${props => props.line}%;
  opacity: 0.7;
  z-index: 2;
`;

const Label = styled.span`
  color: #a5b1db;
  display: inline-block;
  width: auto;
  background-color: rgba(23,28,48, .33);
  padding: 0 5px;
  margin: 0 5px;
  position:relative;
  z-index: 9999;
`

const Sep = styled.div`
  flex: 0 0 60%;
  width: 60%;
  display: flex;
  justify-content: space-between;
`;



export const Row = ({reverse = false, price, coin1, coin2, line}) => (
  <Border reverse>
    <Wr>
      {!reverse ? (
      <Fragment>
        <Label>{price}</Label>
        <Sep>
          <Label>{coin1}</Label>
          <Label>{coin2}</Label>
        </Sep>
        <Line line={line}/>
      </Fragment>
      ) : (
      <Fragment>
        <Sep>
          <Label>{coin2}</Label>
          <Label>{coin1}</Label>
        </Sep>
        <Label>{price}</Label>
        <Line reversed line={line} />
      </Fragment>
      )}
    </Wr>
  </Border>
)

