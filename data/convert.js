const fs= require('fs')



const raw = require('./cities500.json')

const final = raw.filter( el => {
    return el.pop > 500000
})

final.forEach(el => {
    delete el.id
    delete el.admin1
    delete el.lat
    delete el.lon
    delete el.pop
})

console.log(final.length)
fs.writeFileSync('./data/cities.json', JSON.stringify(final, null, 2))