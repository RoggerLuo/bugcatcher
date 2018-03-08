import { DatePicker } from 'antd';
import moment from 'moment';
const { MonthPicker, RangePicker } = DatePicker;

const dateFormat = 'YYYY-MM-DD';
const monthFormat = 'YYYY-MM';

function TimerPicker({chooseTime}){
    const onChange = (moment,string) => {
        if(moment.length!=0){
            chooseTime(moment,string)
        }
    }
    return (
        <div>
            <RangePicker
                onChange={onChange}
                format={dateFormat}
                defaultValue={[ moment(new Date(), dateFormat).subtract(3,'M'),moment(new Date(), dateFormat)]}
            />
        </div>
    )
}
    export default TimerPicker