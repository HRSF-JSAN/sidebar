const express = require('express');
const { Information } = require('../generatorFunctions/informationModel.js');

const router = express.Router();

router.get('/information/:id', (req, res) => {
  const searchValue = req.params.id;
  Information.findOne({ id: searchValue }, (err, restaurant) => {
    if (err) {
      throw err;
    }
    res.json(restaurant);
  });
});


module.exports = router;
