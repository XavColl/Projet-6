const mongoose = require('mongoose')

mongoose.connect(`mongodb+srv://${process.env.CONNECTION_STRINGS}@cluster0.xgn9s.mongodb.net/piiquante`, 
    {
       useNewUrlParser:true,
       useUnifiedTopology: true 
    }).then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
        console.log('Failed to connect to MongoDB', err)
})