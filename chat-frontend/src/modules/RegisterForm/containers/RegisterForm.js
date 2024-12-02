import { withFormik } from 'formik';
import RegisterForm from '../components/RegisterForm';
import validateForm from 'utils/validate';

import { userActions } from '../../../redux/actions';
import store from '../../../redux/store';

export default withFormik({

    enableReinitialize: true,

    mapPropsToValues: () => ({
        email: "",
        username: "",
        password: "",
        password2: ""
    }),


    validate: values => {
        let errors = {};
        validateForm({isAuth: false, values, errors})
        return errors;
    },

    handleSubmit: (values, { setSubmitting, props }) => {
        
        
        // eslint-disable-next-line no-useless-computed-key
        const { ['repite-password']: repitePassword, ...valuesWithoutRepitePassword } = values;
        
        // Eliminar campos 'repite-password' del objeto values
        delete valuesWithoutRepitePassword['repite-password'];
        //console.log(JSON.stringify(valuesWithoutRepitePassword, null, 2));
        store.dispatch(userActions.fetchUserRegister(valuesWithoutRepitePassword)).then(data => {
            
            console.log(data);
            console.log(data.confirmed);
            if (data && data.confirmed === false) {
                window.location.href = '/register/confirm-user';
            } 

            setSubmitting(false);
        }).catch(() => {
            setSubmitting(false);
        });
        
    },

    displayName: 'RegisterForm',
})(RegisterForm);
