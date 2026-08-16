import React from 'react'

function FormUI(
    { htmlFor, value, id, type, placeholder, maxLength, name, lableText, onChange, inputAttribute, rows, className, requried }
) {
    return (
        <div className="mb-4">
            <div className="flex flex-col relative group">
                <label
                    htmlFor={htmlFor}
                    className="text-blue-500 text-[16px] font-semibold relative top-2 ml-3 px-1 bg-[#ffffff] w-fit rounded border shadow-md"
                >{lableText}</label>
                {
                    (inputAttribute === 'textArea') ? (
                        <textarea
                            maxLength={maxLength}
                            value={value}
                            onChange={onChange}
                            id={id}
                            type={type}
                            placeholder={placeholder}
                            name={name}
                            rows={rows}
                            required = {requried}
                            className={`border-gray-200 input px-2.5 py-2.75 text-[17px] bg-[#ffffff] border-2 rounded-[5px] shadow-md focus:border-transparent focus:ring-3 focus:ring-indigo-300 focus:outline-none transition-all duration-300 delay-200 capitalize ${className}`}></textarea>
                    ) :
                        (
                            <input
                                maxLength={maxLength}
                                value={value}
                                onChange={onChange}
                                id={id}
                                type={type}
                                placeholder={placeholder}
                                name={name}
                                required = {requried}
                                className={`border-gray-200 input px-2.5 py-2.75 text-[17px] bg-[#ffffff] border-2 rounded-[5px] shadow-md focus:border-transparent focus:ring-3 focus:ring-indigo-300 focus:outline-none transition-all duration-300 delay-200 capitalize ${className}`}
                            />
                        )
                }
            </div>
        </div>
    )
}

export default FormUI