const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://HandyR:connect@cluster0.xgn9s.mongodb.net/snakepit', 
    {
       useNewUrlParser:true,
       useUnifiedTopology: true 
    }).then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
        console.log('Failed to connect to MongoDB', err)
})