
import { withFormik } from 'formik';

import LoginForm from '../components/LoginForm';
import validateForm from 'utils/validate'


import { userActions } from '../../../redux/actions';

import store from '../../../redux/store';


const LoginFormContainer = withFormik({
    enableReinitialize: true,

    mapPropsToValues: () => ({
        email: "",
        password: ""
    }),

    validate: values => {
        let errors = {};
        
        validateForm({isAuth: true, values, errors})

        return errors;
    },

    handleSubmit: (values, { setSubmitting, props }) => {
        // eslint-disable-next-line no-useless-computed-key
        const { ['repite-password']: repitePassword, ...valuesWithoutRepitePassword } = values;

        // Eliminar campos 'repite-password' del objeto values
        delete valuesWithoutRepitePassword['repite-password'];
        //console.log(JSON.stringify(valuesWithoutRepitePassword, null, 2));
        store.dispatch(userActions.fetchUserLogin(valuesWithoutRepitePassword)).then(({ status, data }) => {
            //console.log(status);
            //console.log(data);
            
            if (data && data.confirmed === false) {
                window.localStorage.clear();
                window.location.href = '/register/confirm-user';
                
            } 

            setSubmitting(false);
        }).catch(() => {
            setSubmitting(false);
        });
        
    },

    displayName: 'LoginForm',
})(LoginForm);

export default LoginFormContainer;

