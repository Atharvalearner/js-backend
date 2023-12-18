require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send(`Hello port ${port} is listening.... `)
})

app.get('/instagram',(req,res) => {
    res.send('instagram is here')
})

app.get('/whatsapp',(req,res) => {
    res.send("i am whatsapp")
})
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${port}`)
})