import React from 'react'
import PropTypes from 'prop-types';

function Empty({ coloumnCount, message }) {
    return (
        <tr>
            <td colSpan={coloumnCount} className='text-center py-4 text-gray-500 whitespace-nowrap'>{message}</td>
        </tr>
    )
}

Empty.defaultProps = {
    coloumnCount: 0,
    message: 'No Record Found'
}

Empty.propTypes = {
    coloumnCount: PropTypes.number.isRequired,
    message: PropTypes.string
}
export default Empty