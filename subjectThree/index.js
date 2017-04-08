import React from 'react';
import ReactDOM from 'react-dom';
import { DatePicker } from 'antd';
import moment from 'moment';

// const now = new Date();
// const curYear = now.getFullYear();
// const curMonth = now.getMonth();
// const curDate = now.getDate();

class DateRange extends React.Component {
  state = {
    startValue: null,
    endValue: null,
    endOpen: false,
  };
  
  setChooseRange = () =>{
  	const now = new Date();
    const beginArr = [now.getFullYear(),now.getMonth()+1,now.getDate()];
    const beginDate = beginArr.join('/');
  	return {
  		begin : moment(beginDate,'YYYY/MM/DD'),
  		end : moment('2017/9/1','YYYY/MM/DD')
  	}
  }
  disabledStartDate = (startValue) => {
    // const endValue = this.state.endValue;
    const endValue = this.setChooseRange()['begin'];
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() < endValue.valueOf();
  }

  disabledEndDate = (endValue) => {
    // const startValue = this.state.startValue;
    const startValue = this.setChooseRange()['end'];
    console.log(startValue);
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() >= startValue.valueOf();
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  }

  onStartChange = (value) => {
    this.onChange('startValue', value);
  }

  onEndChange = (value) => {
    this.onChange('endValue', value);
  }

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  }

  handleEndOpenChange = (open) => {
    this.setState({ endOpen: open });
  }
  render() {
    const { startValue, endValue, endOpen } = this.state;
    return (
      <div>
        <DatePicker
          disabledDate={this.disabledStartDate}
          showTime
          format="YYYY-MM-DD"
          value={startValue}
          placeholder="Start"
          onChange={this.onStartChange}
          onOpenChange={this.handleStartOpenChange}
        />
        <em/>
        <DatePicker
          disabledDate={this.disabledEndDate}
          showTime
          format="YYYY-MM-DD"
          value={endValue}
          placeholder="End"
          onChange={this.onEndChange}
          open={endOpen}
          onOpenChange={this.handleEndOpenChange}
        />
        <br />
        <span>日期选择范围从当日截止到2017/8/31</span>
      </div>
    );
  }
}

ReactDOM.render(<DateRange />, mountNode);