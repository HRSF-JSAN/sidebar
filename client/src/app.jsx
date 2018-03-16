import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import Delivery from './Components/Delivery.jsx';
import Description from './Components/Description.jsx';
import Hours from './Components/Hours.jsx';
import getInformation from './requests.js';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: {
        location: { lat: 29, lng: 30 },
        hours: {
          sunday: [11, 2],
          restOfDays: [9, 10],
          saturday: [9, 11],
        },
        price: '$$',
      },
      location: { lat: 29.6648274, lng: -79.5157535 },
    };
    this.setData = this.setData.bind(this);
  }
  componentDidMount() {
    getInformation(this.props.id, this.setData);
  }
  setData(data) {
    this.props.location.getCurrentPosition((position) => {
      this.setState({
        location: { lat: position.coords.latitude, lng: position.coords.longitude },
        restaurant: data,
      });
    });
  }

  render() {
    return (
      <div className="kev_container">
        <div className="kev_delivery">
          <Delivery
            id={this.props.id}
            minimumFee={this.state.restaurant.minimumDelivery}
            lat={this.state.restaurant.location.lat}
            long={this.state.restaurant.location.lng}
            currentLocation={this.state.location}
          />
        </div>
        <div className="kev_hours">
          <Hours id={this.props.id} price={this.state.restaurant.price} />
        </div>
        <div className="kev_description">
          <Description description={this.state.restaurant.text} />
        </div>
      </div>
    );
  }
}

export default Sidebar;
