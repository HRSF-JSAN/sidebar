import $ from 'jquery';

const getInformation = (id, callback) => {
  $.ajax({
    url: `/information/${id}`,
    type: 'GET',
  }).done((data) => {
    console.log(data)
    callback(data);
  });
};

export default getInformation;
