const fs = require('fs')
const path = require('path')

const out = path.resolve(process.argv.pop())
const files = process.argv.slice(2).map(file=>path.resolve(file))

console.log(files, out)

async function processFile (file){
    const basename = `${path.basename(file)}.js`
    const output = path.join(out, basename)
    if (!fs.existsSync(file) && fs.existsSync(output)) {
        console.warn(`Source ${file} is unavailable; keeping ${output}`)
        return
    }
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
                if(wfErr) return reject(wfErr)
                resolve(1)
            })
        })
    })
}

Promise.all(files.map((file) => processFile(file))).catch((error) => {
    console.error(error)
    process.exitCode = 1
})