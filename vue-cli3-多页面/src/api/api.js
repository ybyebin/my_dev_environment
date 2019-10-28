
import { get, post, put, deletes } from './request'
const base = process.env.NODE_ENV === 'production' ? "/kanghua/cloud" : 'http://192.168.1.6:9876/kanghua/cloud';

const url = {
    chart: "https://gw.alipayobjects.com/os/antvdemo/assets/data/f2/series-line.json"
}

const getChart = params => get(url.chart, params);




export {
    getChart
}