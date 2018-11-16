const promise = new Promise((resolve, reject) => {
  setTimeout(()=>{
    // resolve({
    //   name: 'Alejandro',
    //   lastName: 'Mejìa'
    // });
    reject('something went wrong')
  }, 2000)
});

console.log('before');

promise.then((data) => {
  console.log(data);
}).catch((error) => {
  console.log('error: ', error);
})

console.log('after');