import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Moment from 'react-moment';
import moment from 'moment';
import getInformation from '../requests.js';
import TiWine from 'react-icons/lib/ti/wine';
import TiStopWatch from 'react-icons/lib/ti/stopwatch';
import TiEdit from 'react-icons/lib/ti/edit';

class Hours extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sunday: 'Loading hours',
      restOfTheWeek: 'Loading hours',
      saturday: 'Loading hours',
      possibleHours: {
        sunday: [11, 2],
        restOfDays: [9, 10],
        saturday: [9, 11],
      },
      status: 'open',
      currentDay: 'Sunday',
      price: '11-30',
      priceRange: '$$',
    };
    this.displayTime = this.displayTime.bind(this);
    this.setHours = this.setHours.bind(this);
    this.setDay = this.setDay.bind(this);
    this.processOpenTimes = this.processOpenTimes.bind(this);
    this.findPrice = this.findPrice.bind(this);
  }
  componentDidMount() {
    getInformation(this.props.id, this.setHours);
  }
  setDay() {
    const currentDate = moment();
    const day = currentDate.format('dddd');
    this.setState({
      currentDay: day,
    }, () => {
      this.displayTime();
    });
  }
  setHours(data) {
    this.setState({
      possibleHours: data.possibleHours,
      priceRange: data.price,
    }, () => {
      this.setDay();
      this.findPrice();
    });
  }
  findPrice() {
    if (this.state.priceRange.length === 1) {
      this.setState({
        price: '5-20',
      });
    }
    if (this.state.priceRange.length === 2) {
      this.setState({
        price: '11-30',
      });
    }
    if (this.state.priceRange.length === 3) {
      this.setState({
        price: '12-50',
      });
    }
    if (this.state.priceRange.length === 4) {
      this.setState({
        price: '15-100',
      });
    }
  }
  processOpenTimes(open, close) {
    const currentTime = moment();
    const openMoment = moment(`${open}:00am`, 'hh:mm A');
    const closeMoment = moment(`${close}:00pm`, 'hh:mm A');
    if (currentTime.isAfter(openMoment) && currentTime.isBefore(closeMoment) && open !== 0) {
      this.setState({
        status: 'open',
      });
    } else {
      this.setState({
        status: 'closed now',
      });
    }
  }
  displayTime() {
    const open = 0;
    const close = 1;
    const sunOpen = this.state.possibleHours.sunday[open];
    const sunClosed = this.state.possibleHours.sunday[close];
    const restOpen = this.state.possibleHours.restOfDays[open];
    const restClosed = this.state.possibleHours.restOfDays[close];
    const satOpen = this.state.possibleHours.saturday[open];
    const satClosed = this.state.possibleHours.saturday[close];
    if (sunOpen === 0 && sunClosed === 0) {
      this.setState({
        sunday: 'closed',
        restOfTheWeek: [restOpen, restClosed],
        saturday: [satOpen, satClosed],
      });
    }
    if (sunOpen !== 0) {
      this.setState({
        sunday: [sunOpen, sunClosed],
        restOfTheWeek: [restOpen, restClosed],
        saturday: [satOpen, satClosed],
      });
    }

    if (this.state.currentDay === 'Sunday') {
      this.processOpenTimes(sunOpen, sunClosed);
    }
    if (this.state.currentDay === 'Sunday') {
      this.processOpenTimes(sunOpen, sunClosed);
    }
    if (this.state.currentDay === 'Monday') {
      this.processOpenTimes(restOpen, restClosed);
    }
    if (this.state.currentDay === 'Tuesday') {
      this.processOpenTimes(restOpen, restClosed);
    }
    if (this.state.currentDay === 'Wednesday') {
      this.processOpenTimes(restOpen, restClosed);
    }
    if (this.state.currentDay === 'Thursday') {
      this.processOpenTimes(restOpen, restClosed);
    }
    if (this.state.currentDay === 'Friday') {
      this.processOpenTimes(restOpen, restClosed);
    }
    if (this.state.currentDay === 'Saturday') {
      this.processOpenTimes(satOpen, satClosed);
    }
  }

  render() {
    let sunStatus = <td className="kev_space" />;
    let monStatus = <td className="kev_space" />;
    let tuesStatus = <td className="kev_space" />;
    let wedStatus = <td className="kev_space" />;
    let thursStatus = <td className="kev_space" />;
    let friStatus = <td className="kev_space" />;
    let satStatus = <td className="kev_space" />;
    let today = 'Loading Info';
    if (this.state.currentDay === 'Sunday' && this.state.sunday !== 'closed') {
      today = <li className="kev_todayTime"><TiStopWatch color="red" size={25} />{`Today ${this.state.sunday[0]}:00 am - ${this.state.sunday[1]}:00pm ${this.state.status}`}</li>;
      sunStatus = <td className="kev_space">{this.state.status}</td>;
    }
    if (this.state.currentDay === 'Sunday' && this.state.sunday === 'closed') {
      today = <li className="kev_todayTime"><TiStopWatch color="red" size={25} />{'Today Closed'}</li>;
      sunStatus = <td className="kev_space">{this.state.status}</td>;
    }
    if (this.state.currentDay === 'Monday') {
      today = <li className="kev_todayTime"><TiStopWatch color="red" size={25} />{`Today ${this.state.restOfTheWeek[0]}:00 am - ${this.state.restOfTheWeek[1]}:00pm ${this.state.status}`}</li>;
      monStatus = <td className="kev_space">{this.state.status}</td>;
    }
    if (this.state.currentDay === 'Tuesday') {
      today = <li className="kev_todayTime"><TiStopWatch color="red" size={25} />{`Today ${this.state.restOfTheWeek[0]}:00 am - ${this.state.restOfTheWeek[1]}:00pm ${this.state.status}`}</li>;
      tuesStatus = <td className="kev_space">{this.state.status}</td>;
    }
    if (this.state.currentDay === 'Wednesday') {
      today = <li className="kev_todayTime"><TiStopWatch color="red" size={25} />{`Today ${this.state.restOfTheWeek[0]}:00 am - ${this.state.restOfTheWeek[1]}:00pm ${this.state.status}`}</li>;
      wedStatus = <td className="kev_space">{this.state.status}</td>;
    }
    if (this.state.currentDay === 'Thursday') {
      today = <li className="kev_todayTime"><TiStopWatch color="red" size={25} />{`Today ${this.state.restOfTheWeek[0]}:00 am - ${this.state.restOfTheWeek[1]}:00pm ${this.state.status}`}</li>;
      thursStatus = <td className="kev_space">{this.state.status}</td>;
    }
    if (this.state.currentDay === 'Friday') {
      today = <li className="kev_todayTime"><TiStopWatch color="red" size={25} />{`Today ${this.state.restOfTheWeek[0]}:00 am - ${this.state.restOfTheWeek[1]}:00pm ${this.state.status}`}</li>;
      friStatus = <td className="kev_space">{this.state.status}</td>;
    }
    if (this.state.currentDay === 'Saturday') {
      today = <li className="kev_todayTime"><TiStopWatch color="red" size={25} />{`Today ${this.state.saturday[0]}:00 am - ${this.state.saturday[1]}:00pm ${this.state.status}`}</li>;
      satStatus = <td className="kev_space">{this.state.status}</td>;
    }

    return (
      <div className="kev_containerHours">
        <div className="kev_todayBox">
          <ul className="kev_todayList">
            {today}
            <li>
              <TiWine size={30} />
              <a href="#"> Full Menu </a>
            </li>
            <li>
              <div className="kev_priceRange">{this.state.priceRange}</div>
              <div className="kev_price"> { `Price range $${this.state.price}` }</div>
            </li>
          </ul>
        </div>
        <h1 className="kev_hoursTitle">Hours</h1>
        <table className="kev_theTable">
          <tbody>
            <tr>
              <th scope="row">Mon</th>
              <td>
                <span>{`${this.state.restOfTheWeek[0]}:00 am - ${this.state.restOfTheWeek[1]}:00pm`}</span>
              </td>
              {monStatus}
            </tr>
            <tr>
              <th scope="row">Tue</th>
              <td>
                <span>{`${this.state.restOfTheWeek[0]}:00 am - ${this.state.restOfTheWeek[1]}:00pm`}</span>
              </td>
              {tuesStatus}
            </tr>
            <tr>
              <th scope="row">Wed</th>
              <td>
                <span>{`${this.state.restOfTheWeek[0]}:00 am - ${this.state.restOfTheWeek[1]}:00pm`}</span>
              </td>
              {wedStatus}
            </tr>
            <tr>
              <th scope="row">Thu</th>
              <td>
                <span>{`${this.state.restOfTheWeek[0]}:00 am - ${this.state.restOfTheWeek[1]}:00pm`}</span>
              </td>
              {thursStatus}
            </tr>
            <tr>
              <th scope="row">Fri</th>
              <td>
                <span>{`${this.state.restOfTheWeek[0]}:00 am - ${this.state.restOfTheWeek[1]}:00pm`}</span>
              </td>
              {friStatus}
            </tr>
            <tr>
              <th scope="row">Sat</th>
              <td>
                <span>{`${this.state.saturday[0]}:00 am - ${this.state.saturday[1]}:00pm`}</span>
              </td>
              {satStatus}
            </tr>
            <tr>
              <th scope="row">Sun</th>
              <td>
                <span>{this.state.sunday[0] === 'c' ? 'Closed' : `${this.state.sunday[0]}:00 am - ${this.state.sunday[1]}:00pm`}</span>
              </td>
              {sunStatus}
            </tr>

          </tbody>

        </table>
        <a href="#"><TiEdit size={20} />Edit business info</a>
      </div>
    );
  }
}

export default Hours;
