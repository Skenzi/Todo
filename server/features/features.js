const fs = require('fs')

const writeToFile = (path, data) => {
    const json = JSON.stringify(data);
    fs.writeFileSync(path, json);
}

module.exports = {
    writeToFile
}