const { Information, getData, end } = require('./informationModel.js');

test('database should hold 100 restaurant objects ', (done) => {
  function callback(err, data) {
    if (err) {
      throw err;
    }
    expect(data.length).toBe(100);
    done();
  }
  getData(callback);
});

test('database should not overwrite restaurant objects when same restaurant/restaurants is seeded', (done) => {
  function callback(err, data) {
    if (err) {
      throw err;
    }
    expect(data[0]).toBeDefined();
    expect(data[99]).toBeDefined();
    expect(data.length).toBe(100);
    expect(data[1]).not.toBe(data[0]);
    end(isConnected => isConnected);
    done();
  }

  getData((err, data) => {
    if (err) {
      throw err;
    }
    Information.create(data, () => {
      getData(callback);
    });
  });
});

test('database should lose connection after end() is invoked', (done) => {
  jest.setTimeout(8000);
  function callback(data) {
    // 0 = disconnected
    expect(data).toEqual(0);
    done();
  }
  end(callback);
});

