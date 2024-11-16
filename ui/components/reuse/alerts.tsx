import React from 'react'
import { Alert, AlertDescription } from '../ui/alert'
import { AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

function ErrorAlert({message,className}:{message:string,className?:string}) {
    return (
        <div>
            <Alert variant="destructive" className={cn("flex items-center space-x-2 mx-2",className)}>
                <div><AlertCircle className="h-4 w-4" /></div>
                <AlertDescription className=''>
                    {message}
                </AlertDescription>
            </Alert>
        </div>
    )
}

export {ErrorAlert}