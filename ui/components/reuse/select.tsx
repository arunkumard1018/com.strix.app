import React from 'react';
import { FieldProps, ErrorMessage } from 'formik';
import classNames from 'classnames';

interface CustomInputProps extends FieldProps {
    placeholder: string;
    label: string;
    selectOptions: string[];
    additionalInfo?: string;
}

const CustomSelect: React.FC<CustomInputProps> = ({ field, form, placeholder, selectOptions, additionalInfo, label }) => {
    const hasError = form.touched[field.name] && form.errors[field.name];
    const isFieldActive = form.values[field.name] !== ''; // Field is active if it has a value

    return (
        <div className="flex flex-col items-start justify-center w-[320px]  space-y-1">
            <label className="font-medium capitalize" htmlFor={field.name}>
                {label}
            </label>
            {additionalInfo &&
                <p className='text-[0.6rem] text-left text-gray-500'>{additionalInfo}</p>
            }
            <select
                id={field.name}
                {...field}
                className={classNames(
                    'w-full py-2 px-2 border rounded-sm outline-none', // Base styles
                    {
                        // Default state styles
                        'bg-custome-dark text-white border-gray-800': !hasError || isFieldActive,
                        // Focus state styles
                        'focus:border-blue-500 focus:bg-custome-dark focus:text-white': true,
                        // Error state styles
                        'bg-[#24161b] border-[#5e1f1d] text-[#7d141b]': hasError && !isFieldActive,
                    }
                )}>
                <option value="" className='max-w-[320px]' >{placeholder}</option>
                {selectOptions.map((item) => (
                    <option key={item} value={item} className=''>
                        {item}
                    </option>
                ))}
            </select>
            <ErrorMessage name={field.name} component="span" className="text-[#fdafa8]" />
        </div>
    );
};

export default CustomSelect;
