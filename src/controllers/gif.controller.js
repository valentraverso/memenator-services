const gifController = {
    getAll: async (req, res) => {
        res.status(200).send({
            msg: 'Funcionma'
        })
    }
}

module.exports = gifController;