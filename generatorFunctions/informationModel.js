const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect('mongodb://localhost/localhost');

const informationSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  title: {
    type: String,
    unique: true,
  },
  location: Object,
  minimumDelivery: Number,
  price: {
    type: String,
    enum: ['$', '$$', '$$$', '$$$$'],
  },
  text: String,
  hours: Object,
});

const Information = mongoose.model('Information', informationSchema);

const getData = (callback) => {
  Information.find().sort({ id: 1 }).exec(callback);
};

const end = (sendConnectionState) => {
  let connected;
  mongoose.connection.close(() => {
    connected = mongoose.connection.readyState;
    sendConnectionState(connected);
  });
};

exports.Information = Information;
exports.getData = getData;
exports.end = end;
