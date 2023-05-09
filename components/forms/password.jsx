import React from 'react'
import PropTypes from 'prop-types';

function PasswordField({ id, value, onChange, placeholder, className }) {
    const onHandleChange = (e) => {
        onChange(e)
    }
    return (
        <input
            id={id}
            onChange={onHandleChange}
            placeholder={placeholder}
            type="password"
            value={value}
            className={`text-sm form-input rounded-md border border-slate-400 py-2 px-2.5 bg-white placeholder-gray-400 text-gray-500 appearance-none w-full block focus:outline-none focus:border-slate-500 ${className}`} />
    )
}

PasswordField.propTypes = {
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string,
    placeholder: PropTypes.string
}

export default PasswordField
