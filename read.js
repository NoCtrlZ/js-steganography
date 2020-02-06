const fs = require('fs');
const Buffer = require('buffer').Buffer;

const parse = () => {
    fs.readFile('sample.png', (err, data) => {
        if (err) throw err;
        let img = Buffer.from(data)
        console.log(img)
    })
}

parse()
