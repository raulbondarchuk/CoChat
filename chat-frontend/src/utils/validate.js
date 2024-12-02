// eslint-disable-next-line
export default ({isAuth, values, errors}) => {

    

    const rules = {
        email: (value) => {
            if (!value) {
                errors.email = 'Requerido';
            }  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                errors.email = 'Email introducido no es correcto';
            }
        },
        password: (value) => {
            if (!value) {
                errors.password = 'Requerido';
            } else if (value.length < 5) {
                errors.password = isAuth ? 'La contraseña es incorrecta' : 'La contraseña debe tener al menos 5 caracteres';
            } else if (!/(?=.*[A-Z])(?=.*\d)/.test(value)) {
                errors.password = isAuth ? 'La contraseña es incorrecta' : 'La contraseña debe contener al menos una letra mayúscula y un dígito';
            }
        },
        password2: (value) => {
            if (!value) {
                errors.password2 = 'Requerido';
            } else if (values.password2 !== values.password) {
                errors.password2 = 'Las contraseñas no coinciden';
            }
        },
        username: (value) => {
            if (!value) {
                errors.username = 'Requerido';
            } else if (!/^[a-zA-Z ]*$/i.test(value)) {
                errors.username = 'El nombre de usuario debe contener solo letras o un espacio';
            } else if (value.trim().length === 0) {
                errors.username = 'El nombre de usuario no puede contener solo espacios';
            } else if (value.length > 20) {
                errors.username = 'El nombre de usuario no puede tener más de 20 caracteres';
            }
        },
    };

    Object.keys(values).forEach(key => rules[key] && rules[key](values[key]));

};

