import React from 'react'
import PropTypes from 'prop-types';

function Textfield({ id, onChange }) {

    const onHandleChange = (e) => {
        let value = e.target.value;
        onChange(e, value)
    }
    return (
        <input
            id={id}
            onChange={onHandleChange}
            placeholder='textfield'
            type="text"
            className='text-sm form-input rounded-md border border-slate-400 py-1 px-2 bg-white placeholder-gray-400 text-gray-500 appearance-none w-full block focus:outline-none focus:border-slate-500' />
    )
}

Textfield.propTypes = {
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string
}

export default Textfield