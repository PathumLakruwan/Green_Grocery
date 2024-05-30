

const displayLKR = (num) =>{
    const formatter = new Intl.NumberFormat('en-SL',{
        style: 'currency',
        currency: 'LKR',
        minimumFractionDigits: 2
    })

    return formatter.format(num)
}

export default displayLKR