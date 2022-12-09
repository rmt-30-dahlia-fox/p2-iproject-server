const priceFormat = (value) => {
    return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'EUR' }).format(value)
}

const heightFormat = (value) => {
    return value + " cm"
}

module.exports = { priceFormat, heightFormat }