const { Type } = require('../../db');

const typeNameController = async (typeName) => {
    try {
        // Busca el type en la base de datos por el nombre proporcionado
        const foundType = await Type.findOne({ where: { name: typeName } });

        if (!foundType) {
            // Si el type no se encuentra en la base de datos, puedes manejarlo según tus necesidades.
            console.log(`Type con nombre ${typeName} no encontrado en la base de datos.`);
            return null; // Puedes devolver null o algún valor indicativo de que no se encontró el type.
        }

        // Devuelve el type encontrado en la base de datos
        return foundType;

    } catch (error) {
        console.log(error);
        console.error(`Error al obtener el type con nombre ${typeName} de la base de datos:`, error);
        throw error;
    }
};

module.exports = {
    typeNameController
};