import moment from 'moment';
export const getTableField = (obj) => ( obj ? (Object.keys(obj).map((item) => {return { title :item, field : item}})) : []);
export const formatTimestamp = (timeStamp) => {
    if ( !timeStamp) {
        return ""
    }
     let DATE_FORMAT='MMMM Do YYYY, h:mm:ss a';
    if (moment(timeStamp, DATE_FORMAT).format(DATE_FORMAT) !== timeStamp) {
        return moment(timeStamp).format('MMMM Do YYYY, h:mm:ss a') 
    }
    return timeStamp;
} 