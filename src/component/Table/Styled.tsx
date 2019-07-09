import styled from 'styled-components';
import constants from '../../constant';

export const Container = styled.div`
  .ant-table-thead tr > th {
    text-align: center;
    padding: 0;
    line-height: 30px;
    color: ${constants.nav_font};
    background: ${constants.card_header};
  }
  .ant-table-tbody > tr {
    text-align: center;
    &:nth-child(odd) {
      background: ${constants.item_first};
    }
    &:nth-child(even) {
      background: ${constants.item_second};
    }
    & > td {
      min-height: 50px;
      color: ${constants.main_font};
    }
  }
`;
// 防止超长字段
// .ant-table-thead tr {
//   display: flex;
// }
// .ant-table-thead th {
//   flex: 1;
// }
// .ant-table-row {
//   display: flex;
// }
// .ant-table-row td {
//   flex: 1;
//   overflow: auto;
// }
// .ant-table-row td::-webkit-scrollbar {
//   display: none;
// }
// .columns {
//   display: flex;
//   align-items: center;
//   width: 0;
// }
