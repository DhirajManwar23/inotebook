const connectToMongo= require('./db');
const express = require('express')

connectToMongo();
const app = express()
const port = 3000

app.use(express.json());
app.use('/api/auth/', require('./routes/auth')); // auth routes
app.use('/api/notes/', require('./routes/notes')) // Corrected path


// app.get('/', (req, res) => {
//   res.send('Hello from localhost')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

