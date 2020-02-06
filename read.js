const fs = require('fs');
const Buffer = require('buffer').Buffer;

const parse = (file_name) => {
    fs.readFile(file_name, (err, data) => {
        if (err) throw err;
        let raw_data = Buffer.from(data)
        let prefix = raw_data.slice(0, 8)
        let length = to_int([...raw_data.slice(8, 12)])
        let ihdr = raw_data.slice(12, 16)
        let width = to_int([...raw_data.slice(16, 20)])
        let height = to_int([...raw_data.slice(20, 24)])
        let depth = to_int([...raw_data.slice(24, 25)])
        let color_type = to_int([...raw_data.slice(25, 26)])
        let compress_method = is_valid([...raw_data.slice(26, 27)])
        let filter_method = is_valid([...raw_data.slice(27, 28)])
        let interlace = is_true([...raw_data.slice(28, 29)])
        let crc = [...raw_data.slice(29, 34)]
        if (prefix.toString() != Buffer.from('\x89PNG\r\n\x1a\n', 'binary').toString()) {
            throw 'This file is not png'
        }
        if (ihdr.toString() != "IHDR") {
            throw 'This file is invalid with no IHDR'
        }
        emit_result(length, width, height, depth, color_type, compress_method, filter_method, interlace, crc)
        let text = ""
        let [i, n] = [0, 34]
        while (text != "IDAT") {
            data = raw_data.slice(n + (i * 4), n + (i * 4) + 4)
            text = data.toString()
            i ++
        }
        console.log(n + (i * 4) + 4)
        console.log(raw_data.slice(0, n + (i * 4) + 4))
        fs.writeFile('after.png', raw_data, 'binary', (err) => {
            console.log(err)
        })
    })
}

const to_int = (bytes) => {
    let [n, number] = [bytes.length - 1, 0]
    for (i = 0; i < bytes.length; i ++) {
        number += bytes[i] * (256 ** (n))
        n--
    }
    return number
}

const is_valid = (bytes) => (
    (bytes[0] == 0) ? "valid" : "invalid"
)

const is_true = (bytes) => (
    (bytes[0] == 1) ? true : false
)

const emit_result = (length, width, height, depth, color_type, compress_method, filter_method, interlace, crc) => {
    console.log('Length:', length)
    console.log('Width:', width)
    console.log('Height:', height)
    console.log('Depth:', depth)
    console.log('Color Type:', color_type)
    console.log('Compress Method:', compress_method)
    console.log('Filter Method:', filter_method)
    console.log('Interlace:', interlace)
    console.log('Crc:', crc)
}

parse('sample.png')
