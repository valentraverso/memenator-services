const mongoose = require("mongoose");

function connectDB(app, PORT, DB) {
    mongoose.connect(DB)
        .then(() => {
            app.listen(PORT, () => {
                console.log(`
            ,     ,
            (\____/)
             (_oo_)
               (O)
             __||__    \)  | MEMENATOR SERVER |
          []/______\[] /     PORT: ${PORT}
          / \______/ \/
         /    /__\
        (\   /____\
            `)
            })
        })
        .catch(err => console.log(err))
}

module.exports = connectDB;