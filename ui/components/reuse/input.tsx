import { cn } from '@/lib/utils';
import classNames from 'classnames';
import { ErrorMessage, FieldProps } from 'formik';
import React from 'react';

interface CustomInputProps extends FieldProps {
    placeholder: string;
    label: string;
    additionalInfo?: string;
    className?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({ field, form, placeholder, additionalInfo, label, className }) => {
    const hasError = form.touched[field.name] && form.errors[field.name];
    const isFieldActive = form.values[field.name] !== ''; // Field is active if it has a value

    return (
        <div className={cn("flex flex-col items-start justify-center w-[320px]  space-y-1 bg-background", className)}>
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


interface FormInputProps extends FieldProps {
    placeholder: string;
    label: string;
    errorMessageRequired?: boolean;
    additionalInfo?: string;
    className?: string;
}


const FormInput: React.FC<FormInputProps> = ({ field, form, placeholder, additionalInfo, label, className, errorMessageRequired = false }) => {
    const hasError = form.touched[field.name] && form.errors[field.name];
    // const isFieldActive = form.values[field.name] !== ''; // Field is active if it has a value

    return (
        <div className={classNames("flex flex-col  items-start justify-center bg-custome-sheet space-y-1", className)}>
            <label className="text-xs capitalize bg-custome-sheet" htmlFor={field.name}>
                {label}
            </label>
            {additionalInfo &&
                <p className="text-[0.6rem] text-left text-gray-500">{additionalInfo}</p>
            }
            <input
                id={field.name}
                type="text"
                placeholder={placeholder}
                {...field}
                className={classNames(
                    "w-full px-2 py-1 bg-custome-sheet border border-muted-foreground/30 outline-none  text-sm font-normal", // Base styles with background color
                    {
                        "border-red-500": hasError, // Error styles
                    }
                )}
            />
            {errorMessageRequired && <ErrorMessage name={field.name} component="span" className="text-red-500 text-sm" />}
        </div>
    );
};


export { FormInput };

