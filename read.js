const fs = require('fs');
const Buffer = require('buffer').Buffer;

const parse = () => {
    fs.readFile('sample.png', (err, data) => {
        if (err) throw err;
        let raw_data = Buffer.from(data)
        let prefix = raw_data.slice(0, 8)
        if (prefix.toString() != Buffer.from('\x89PNG\r\n\x1a\n', 'binary').toString()) {
            throw 'This file is not png'
        }
        console.log(prefix)
        console.log(Buffer.from('\x89PNG\r\n\x1a\n', 'binary'))
    })
}

parse()
