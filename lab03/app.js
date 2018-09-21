const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Lab03 server page'))

app.listen(port, () => console.log(`lab03 app listening on port ${port}!`))

app.use(express.static('public'))