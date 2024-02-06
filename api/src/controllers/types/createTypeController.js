const { Type } = require('../../db');

const createTypeController = async (name) => {
  try {
    // Verificar si el tipo ya existe
    const existingType = await Type.findOne({
      where: { name }
    });

    if (existingType) {
      throw new Error('Type already exists');
    }

    // Crear el nuevo tipo
    const newType = await Type.create({
      name
    });

    return newType;
  } catch (error) {
    console.error('Error creating type:', error);
    throw new Error(error.message);
  }
};

module.exports = {createTypeController};