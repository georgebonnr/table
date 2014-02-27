db.dropDatabase();
var Frank = {
  firstName: 'Frank',
  lastName: 'Frankenson',
  phone: '5555555555',
  email: 'f@f.com',
  password: '123',
  roles: ['user','employee'],
  organization: [{
    username: '0',
    admin: 'false'
  }]
};
db.users.save(Fu);

var Greg = {
  firstName: 'Greg',
  lastName: 'Oden',
  phone: '6555555556',
  email: 'g@g.com',
  password: '123',
  roles: ['user','employee','front desk'],
  organization: [{
    username: '0',
    admin: 'true'
  }]
};
db.users.save(Greg);

var Carol = {
  firstName: 'Carol',
  lastName: 'Test',
  phone: '7777777777',
  email: 'carol@gmail.com',
  password: '123',
  roles: ['user']
};
db.users.save(Carol);

var Somebody = {
  firstName: 'Somebody',
  lastName: 'Else',
  phone: '1231231234',
  email: 'somebody@gmail.com',
  password: '123',
  roles: ['user']
};
db.users.save(Somebody);

var Italian = {
  username: '0',
  displayName: 'Italian Place',
  phone: '12345678910',
  email: 'italian@italian.com',
  hours: {
    open: '12:00pm',
    close: '11:00pm'
  },
  tables: [
    {
      name: 'a1',
      min: 2,
      max: 2
    },
    {
      name: 'a2',
      min: 2,
      max: 2
    },
    {
      name: 'a3',
      min: 2,
      max: 2
    },
    {
      name: 'b1',
      min: 2,
      max: 4
    },
    {
      name: 'b2',
      min: 2,
      max: 4
    },
    {
      name: 'b3',
      min: 2,
      max: 4
    },
    {
      name: 'c1',
      min: 4,
      max: 8
    },
    {
      name: 'c2',
      min: 4,
      max: 8
    }
  ]
};
db.organizations.save(Italian);

var reservation1 = {
  size: 2,
  time: new Date(),
  organization: '0',
  phone: '7777777777',
  email: 'carol@gmail.com',
  table: 'a1'
};
db.reservations.save(reservation1);

var reservation2 = {
  size: 4,
  time: new Date(),
  phone: '8888888888',
  email: 'somebody@gmail.com',
  organization: '0',
  table: 'b1'
};
db.reservations.save(reservation2);

var reservation3 = {
  size: 4,
  time: new Date(2014,02,24,12,30),
  phone: '8888888888',
  email: 'somebody@gmail.com',
  organization: '0',
  table: 'b1'
};
db.reservations.save(reservation3);

