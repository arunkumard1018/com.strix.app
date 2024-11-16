import React from 'react';
import { FieldProps, ErrorMessage } from 'formik';
import classNames from 'classnames';
import { cn } from '@/lib/utils';

interface CustomInputProps extends FieldProps {
    placeholder: string;
    label : string;
    additionalInfo?: string;
    className?:string;
}

const CustomInput: React.FC<CustomInputProps> = ({ field, form, placeholder, additionalInfo, label, className}) => {
    const hasError = form.touched[field.name] && form.errors[field.name];
    const isFieldActive = form.values[field.name] !== ''; // Field is active if it has a value

    return (
        <div className={cn("flex flex-col items-start justify-center w-[320px]  space-y-1 bg-background",className)}>
            <label className="font-medium capitalize" htmlFor={field.name}>
                {label}
            </label>
            {additionalInfo &&
                <p className='text-[0.6rem] text-left text-gray-500'>{additionalInfo}</p>
            }
            <input
                id={field.name}
                type={field.name === "password" ? "password" : "text"}
                placeholder={placeholder}
                {...field}
                className={classNames(
                    'w-full py-2 px-2  border-[0.1px] outline-none', // Base styles
                    {
                        // Default state styles
                        'bg-background  border-gray-800': !hasError || isFieldActive,
                        // Focus state styles
                        'focus:border-blue-500 focus:bg-background ': true,
                        // Error state styles
                        'bg-background border-[#5e1f1d] text-[#7d141b]': hasError && !isFieldActive,
                    }
                )}
            />
            <ErrorMessage name={field.name} component="span" className="text-[#fdafa8]" />
        </div>
    );
};

export default CustomInput;
