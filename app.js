let express = require('express')
let fs = require("fs")
let app = express()

let data = fs.readFileSync('data.json')

app.get('/cooke.json', function(req, res) {
    var result = {}
    var jsonContent = JSON.parse(data);
    result = jsonContent
    result.list.forEach(function(s) {
        var result = []
        s.ellipsis.forEach(function(j) {
            var random = (Math.random() * 35).toFixed(2)
            j = { 'food': `${j}`, 'price': `${random}`, 'isBought': 'false' }

            result.push(j)
        })
        s.isBought = true
        s.ellipsis = result
    })
    res.send(result)
})

app.use('/', express.static('public'))
    // app.use('/static', express.static(path.join(__dirname, 'public')))
app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
})
