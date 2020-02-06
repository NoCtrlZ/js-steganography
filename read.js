const fs = require('fs');
const Buffer = require('buffer').Buffer;

const parse = () => {
    fs.readFile('sample.png', (err, data) => {
        if (err) throw err;
        let raw_data = Buffer.from(data)
        let prefix = raw_data.slice(0, 8)
        let raw_length = raw_data.slice(8, 12)
        let ihdr = raw_data.slice(12, 16)
        let raw_width = raw_data.slice(16, 20)
        let raw_height = raw_data.slice(20, 24)
        let depth = raw_data.slice(24, 25)
        if (prefix.toString() != Buffer.from('\x89PNG\r\n\x1a\n', 'binary').toString()) {
            throw 'This file is not png'
        }
        if (ihdr.toString() != "IHDR") {
            throw 'This file is invalid with no IHDR'
        }
        let length = to_int([...raw_length])
        let width = to_int([...raw_width])
        let height = to_int([...raw_height])
        console.log(length, width, height)
    })
}

const to_int = (bytes) => {
    let [n, number] = [3, 0]
    for (i = 0; i < bytes.length; i ++) {
        number += bytes[i] * (256 ** (n))
        n--
    }
    return number
}

parse()
