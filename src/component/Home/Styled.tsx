import styled from 'styled-components';
import constants from '../../constant';

export const MusicBar = styled.span`
  margin-right: 15px;
  min-width: 20px;
  .bar {
    display: inline-block;
    position: relative;
    margin-right: 2px;
    width: 2px;
    height: 1px;
    overflow: hidden;
    background: #3d475b;
    color: transparent;
    animation-name: pulse;
    animation-duration: 1s;
    animation-iteration-count: infinite;
  }
  .n1 {
    animation-delay: 0.5s;
  }
  .n2 {
    animation-delay: 0.3s;
  }
  .n3 {
    animation-delay: 1.2s;
  }
  .n4 {
    animation-delay: 0.9s;
  }
  .n5 {
    animation-delay: 1.3s;
  }
  @keyframes pulse {
    0% {
      height: 1px;
      margin-top: 0;
    }
    10% {
      height: 20px;
      margin-top: -40px;
    }
    50% {
      height: 10px;
      margin-top: -20px;
    }
    60% {
      height: 5px;
      margin-top: -30px;
    }
    80% {
      height: 25px;
      margin-top: -60px;
    }
    100% {
      height: 1px;
      margin-top: 0;
    }
  }
`;

export const StyleLiveContainer = styled.div`
  padding: 15px 20px 20px;
  margin-top: 15px;
  margin-bottom: 20px;
  background: ${constants.card_background};
  .select-game {
    padding-right: 10px;
    img {
      margin-right: 30px;
    }
  }
`;

export const TestContainer = styled.div``;

// export default { StyleLiveContainer };
