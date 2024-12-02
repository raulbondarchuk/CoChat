import React, { Fragment} from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import esLocale from "date-fns/locale/es";


const Time =  ({date}) => (
    <Fragment>
        {formatDistanceToNow(new Date(date), {addSuffix: true, locale: esLocale})}
    </Fragment>
);

Time.propTypes = {
    date: PropTypes.string
}

export default Time;