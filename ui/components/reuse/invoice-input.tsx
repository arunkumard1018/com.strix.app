import { cn } from '@/lib/utils';
import classNames from 'classnames';
import { ErrorMessage, FieldProps } from 'formik';
import React from 'react';

interface CustomInputProps extends FieldProps {
    placeholder: string;
    label: string;
    additionalInfo?: string;
    className?: string;
    inputClassName ? : string;
}

const CustomInput: React.FC<CustomInputProps> = ({ field, form, placeholder, additionalInfo,inputClassName, label, className }) => {
    const hasError = form.touched[field.name] && form.errors[field.name];
    const isFieldActive = form.values[field.name] !== ''; // Field is active if it has a value

    return (
        <div className={cn("flex flex-col items-start justify-center w-[320px]  space-y-1 bg-white", className)}>
            <label className="font-medium capitalize" htmlFor={field.name}>
                {label}
            </label>
            {additionalInfo &&
                <span className='text-[0.6rem] text-left text-gray-500'>{additionalInfo}</span>
            }
            <input
                id={field.name}
                type={field.name === "password" ? "password" : "text"}
                placeholder={placeholder}
                autoComplete="off"
                {...field}
                className={classNames(
                    'w-full py-2 px-2 border outline-none',inputClassName, // Base styles
                    {
                        // Default state styles
                        'bg-white': !hasError || isFieldActive,
                        // Focus state styles
                        'focus:border-blue-500 focus:bg-white': true,
                        // Error state styles
                        'bg-white border-[#5e1f1d] text-[#7d141b]': hasError && !isFieldActive,
                    }
                )}
            />
            <ErrorMessage name={field.name} component="span" className="text-[#fdafa8]" />
        </div>
    );
};

export default CustomInput;
