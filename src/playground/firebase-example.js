
database.ref('expenses').on('value', (dataSnapshot) => {
  const expenses = [];
  dataSnapshot.forEach(childSnapshot => {
    expenses.push({
      id: childSnapshot.key,
      ...childSnapshot.val()
    });
  });
  console.log(expenses);
})

database.ref('expenses').once('value')
.then((datatSnapshot) => {
  const expenses = [];
  datatSnapshot.forEach(childSnapshot => {
    expenses.push({
      id: childSnapshot.key,
      ...childSnapshot.val()
    });
  });
  console.log(expenses)
})

database.ref('expenses').push({
  description: 'descripton3',
  note: 'note3',
  amount: 300,
  createdAt: 3
})

database.ref().on('value', (dataSnapshot) => {
  const info = dataSnapshot.val();
  console.log(`${info.name} is a ${info.job.title} at ${info.job.company}`)
})

database.ref().once('value')
.then((dataSnapshot) => {
  const val = dataSnapshot.val();
  console.log(val);
}).catch((e) => {
  console.log('Error fetching data: ', e);
})


database.ref().set({
  name: 'Alejandro Mejía',
  age: 26,
  stressLevel: 6,
  job: {
    title: 'Software developer', 
    company: 'Google'
  },
  location: {
    city: 'Medellín',
    country: 'Colombia'
  }
}).then(() => {
  console.log('Data is saved!');
}).catch((error) => {
  console.log('Something went wrong: ', error)
});

database.ref().update({
  stressLevel: 9,
  'job/company': 'Amazon',
  'location/city': 'Seatle'
})
database.ref().remove()
.then(() => {
  console.log('Removed succeeded');
})
.catch((error) => {
  console.log('Remove failed: ', error.message);
});