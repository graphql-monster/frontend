const fs = require('fs')
const path = require('path')

const out = path.resolve(process.argv.pop())
const files = process.argv.slice(2).map(file=>path.resolve(file))

console.log(files, out)

async function processFile (file){
    return new Promise((resolve, reject)=> {        
        fs.readFile(file, (err, data)=>{
            if(err) return reject(err)
            const textData = data.toString().replace(/\`/g, '\\\`')
            const basename = `${path.basename(file)}.js`
            
            const output = path.join(out, basename)

            fs.writeFile(output, `
                export default \`
${textData}
            \``, (wfErr) => {
                if(wfErr) return reject(wrErr)
                resolve(1)
            })
        })
    })
}

Promise.all(files.map((file) => processFile(file)))