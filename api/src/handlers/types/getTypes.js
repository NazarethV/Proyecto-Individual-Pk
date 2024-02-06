const { typeNameController } = require('../../controllers/types/typeNameController')
const { allTypesController } = require('../../controllers/types/allTypesController')

const getTypes = async (req, res) => {
    try{
        const { name } = req.query
        if(name){
            const nameType = await typeNameController(name)
            res.status(200).json(nameType)
        }else{
            const allTypes = await allTypesController()
            res.status(200).json(allTypes)
        }

    }catch(error){
        res.status(500).json({ error: error.message });
    }
}


module.exports = { getTypes }