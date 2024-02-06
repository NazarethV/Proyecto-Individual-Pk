const { createTypeController } = require('../../controllers/types/createTypeController')

const postType = async (req, res) => {
    try {
        const { name } = req.body;
    
        if (!name) {
          return res.status(400).json({ error: 'Name is required for creating a type' });
        }
    
        const newType = await createTypeController(name);
        return res.status(201).json(newType);

      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
};


module.exports = { postType }
