const fs = require('fs');
const Buffer = require('buffer').Buffer;

const write = (file_name) => {
    fs.readFile(file_name, (err, data) => {
        if (err) throw err;
        let raw_data = Buffer.from(data)
        let text = ""
        let k = 0
        let n = 34  // IHDR chunk
        let m = 4   // 4バイトごとにスライス

        // IDATのヘッダー場所の特定
        while (text != "IDAT") {
            data = raw_data.slice(n + (k * 4), n + (k * 4) + m)
            text = data.toString()
            k ++
        }

        console.log([...raw_data.slice(n + (k * 4) + m, 100)])

        // 画像に埋め込む文字列
        let secret = Buffer.from('Hello world')
        for (i = 0; i < secret.length; i++) {
            raw_data[n + (k * 4) + m] = secret[i]
            m++
        }

        // 文字が埋め込まれた画像を出力
        fs.writeFile('after.png', raw_data, 'binary', (err) => {
            console.log(err)
        })
    })
}

write('sample.png')
