// const csv = require('csvtojson');
//
// const csvFilePath='./sample.csv';
//
// const json = { en: {}, es:{} };
//
// csv({noheader:true})
//   .fromFile(csvFilePath)
//   .on('json',(jsonObj)=>{
//   	// combine csv header row and csv line to a json object
//   	// jsonObj.a ==> 1 or 4
//     console.log(jsonObj.field1)
//     console.log(jsonObj.field2)
//     console.log(jsonObj.field3)
//   })
//
// console.log(json)

const fs = require('fs');
const csv = require('fast-csv');

const readStream = fs.createReadStream('sample.csv');

const output = { en: {}, es:{} };

readStream
  .pipe(csv({
    objectMode: true,
    headers: true,
    ignoreEmpty: true,
  }))
  .on('data', (data) => {
    if (data.Keys !== '###' &&  data.Keys !== '') {
      output.en[data.Keys] = data.English;
      output.es[data.Keys] = data.Spanish;
    }
    console.log(data)
    console.log('_________')
  })
  .on('end', (data) => {
    console.log('Read Finished')
    console.log(output)

    const json = "export default const json = " + JSON.stringify(output) + "\n "

    fs.writeFile("output.js", json, function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("The file was saved!");
    }
});


  })
  // .pipe(writeStream)
