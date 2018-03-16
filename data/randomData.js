const possibleHours = [
  {
    sunday: [10, 6],
    restOfDays: [10, 10],
    saturday: [10, 11],
  },
  {
    sunday: [9, 5],
    restOfDays: [9, 10],
    saturday: [9, 11],
  },
  {
    sunday: [0, 0],
    restOfDays: [5, 10],
    saturday: [5, 11],
  },
];

const descriptions = [
  'A great place for kids. Good atmosphere. At the heart of the city. Make a reservation!',
  'A brilliant culinary experience. Parties Welcome. At the heart of the city. Make a reservation!',
  'Casual dining with a twist. Our goal is to bring flavor and vibes together, and to top it off, with a view of the bay. Make a reservation!',
];

const mins = [9, 10, 15, 8];


exports.mins = mins;
exports.descriptions = descriptions;
exports.possibleHours = possibleHours;
