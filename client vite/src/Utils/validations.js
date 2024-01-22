const validations = (stateForm) => {
    const errors = {}

    if(stateForm.name.trim().length === 0){//No puede estar vacío
        errors.name = 'A name is requirerd'
    }else if(!/^[a-zA-Z ]+$/.test(stateForm.name)){//No pueden tener numeros o caracteres especiales
        errors.name = 'The name cannot contain special characters or numbers'   
    }else if(stateForm.name.length > 20){
        errors.name = 'Cannot contain more than 20 characters' //No mayor a 20 caracteres
    }

    //trim() = devuelve la cadena sin espacios en blanco al principio y al final.
    if (stateForm.image.trim().length === 0) {//Que sea formato para la imagen
        errors.image = "Image URL required";
    } else if (!/\.(jpg|jpeg|png|gif|bmp|svg|webp)$/i.test(stateForm.image)) {
        errors.image = "The URL entered is not a valid image URL";
    }


    // if(stateForm.defense.trim().length === 0){
    //     errors.defense = 'A defense is required'
    // }else if(stateForm.defense <= 0 || stateForm.defense > 500){
    //     errors.defense = 'Tiene que ser mayor a 0 y menor a 500'
    // }

    if (stateForm.defense.trim().length === 0) {
        errors.defense = 'A defense is required';
      } else if (isNaN(stateForm.defense)) { // verifica si el valor en stateForm.defense no es un número. Si isNaN devuelve true, significa que el valor no es un número y se establece el mensaje de error correspondiente
        errors.defense = 'Please enter a valid number for defense';
      } else if (stateForm.defense <= 0 || stateForm.defense > 500) {
        errors.defense = 'It must be greater than 0 and less than 500'; //Mayor que 0 y menor que 500
      }


    if(stateForm.attack.trim().length === 0){
        errors.attack = 'A atttack is required'
    }else if(stateForm.attack <= 0 || stateForm.attack > 500){
        errors.attack = 'It must be greater than 0 and less than 500'
    }


    if(stateForm.hp.trim().length === 0){
        errors.hp = 'A hp is required'
    }else if(stateForm.hp <= 0 || stateForm.hp > 500){
        errors.hp = 'It must be greater than 0 and less than 500'
    }

    if(stateForm.speed.trim().length === 0){
        errors.speed = 'A speed is required'
    }else if(stateForm.speed <= 0 || stateForm.speed > 500){
        errors.speed = 'It must be greater than 0 and less than 500'
    }


    if(stateForm.height.trim().length === 0){
        errors.height = 'A atttack is required'
    }else if(stateForm.height <= 0 || stateForm.height > 500){
        errors.height = 'It must be greater than 0 and less than 500'
    }


    if(stateForm.weight.trim().length === 0){ 
        errors.weight = 'A weight is required'
    }else if(stateForm.height <= 0 || stateForm.weight > 500){
        errors.weight = 'It must be greater than 0 and less than 500'
    }


    if(stateForm.types.length === 0){
        errors.types = 'At least one type is required'
    }
    

    return errors

}


export default validations;
