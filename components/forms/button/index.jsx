import React from 'react';
import PropTypes from 'prop-types';

function index({ onClick, children }) {
    return (
        <button
            onClick={onClick}
            type='button'
            className='flex items-center text-sm rounded-md py-2 px-6 mb-5 text-white bg-green-500 hover:bg-green-600 transition-colors ease-in duration-200'
        >
            {children}
        </button>
    );
}

index.propTypes = {
    onClick: PropTypes.func,
}

export default index;