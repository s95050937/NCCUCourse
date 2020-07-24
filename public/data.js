const fs = require('fs');
fs.readFile('./data.json',(err, data) => {
  if(err){
    console.log(err);
  }
  let data2 = JSON.parse(data.toString());
  for (let index = 0; index < data2.length; index++) {
    if (data2[index].course.length == 6) {
      data2[index].course = '000' + data2[index].course
    } else if (data2[index].course.length == 7) {
      data2[index].course = '00' + data2[index].course
    } else if (data2[index].course.length == 8) {
      data2[index].course = '0' + data2[index].course
    }
  }
  // console.log(data2);
  for (let index = 0; index < data2.length; index++) {
    if (data2[index].course.length <= 8) {
      console.log(data2[index].course);
    }
  }
  data2 = JSON.stringify(data2)
  fs.writeFile('./data2.json', data2, (err, data) => {
    if(err) {
      console.log('wrong');
    } else {
      console.log('success');
    }

  })
})




