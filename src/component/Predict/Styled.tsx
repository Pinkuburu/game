import styled from 'styled-components';
import panelBg from '../../assets/bg_jryc.svg';
import constants from '../../constant';

export const Container = styled.div`
  width: 700px;
  .panel-header {
    display: flex;
    height: 70px;
    background: url(${panelBg}) no-repeat center / cover;
    text-align: center;
    color: ${constants.nav_font};
    padding-top: 10px;
    p {
      margin: 0;
    }
    .panel-text {
      flex: 1 1 200px;
      font-size: 30px;
      color: white;
    }
    .time {
      flex: 1 1 160px;
    }
    .win-rate {
      flex: 1 1 140px;
    }
    .bene-rate {
      flex: 1 1 200px;
    }
    .time,
    .win-rate,
    .bene-rate {
      .strong {
        color: ${constants.hover_font};
        font-size: 28px;
      }
      .normal {
        color: ${constants.nav_font_gray};
        font-size: 13px;
      }
    }
  }
`;

export const TableContainer = styled.div`
  padding: 0 20px 25px 20px;
`;
