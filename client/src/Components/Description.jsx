import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

const Description = (props =>
  <div>
    <div className="kev_h1Description">
      <h1>From The Business</h1>
    </div>
    <div className="kev_containerDescription">
      <p>{props.description}</p>
    </div>
  </div>
);

export default Description;
