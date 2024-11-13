import React from 'react'

const TextAreaComp = ({ value = null, name, onChange = null, onBlur, label = null, id, cols = 10, rows = 5, placeholder = null, ...props }) => {
    return (
        <>   <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="bulkText">
            {label}
        </label>
            <textarea

                id={id}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                cols={cols}
                rows={rows}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black focus:ring-2 focus:ring-black focus:ring-opacity-50 resize-none"
                placeholder={placeholder}
                {...props}
            /></>
    )
}

export default TextAreaComp