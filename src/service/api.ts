import { extend } from 'umi-request';


const index = 'https://api.hawkeye.esportseyes.com/';
const test = 'http://rh.hawkeye.fishiny.com/';

const token = localStorage.getItem('token') || '';

const commonRequest = extend({
  prefix: index,
  headers: {
    token,
  },
})

const request = extend({
  prefix: test,
  headers: {
    token
  },
});


export const getSlider = () => commonRequest('hawkeyepc/v1/banner');
export const todayPredict = () => request('hawkeyepc/v1/guess/today_guess');
export const liveList = () => commonRequest('hawkeyepc/v1/match/lives_list');
export const upcommingList = () => commonRequest('hawkeyepc/v1/match/upcoming_leagues_list');
export const resultList = () => commonRequest('hawkeyepc/v1/match/result_list');
