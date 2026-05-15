const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('d:/My pojects/NestKnot WebApp/FullStack_Intern_Assessment_GlobalTNA (14 May 2026).pdf');

pdf(dataBuffer).then(function(data) {
    console.log(data.text);
}).catch(function(err) {
    console.error(err);
});
