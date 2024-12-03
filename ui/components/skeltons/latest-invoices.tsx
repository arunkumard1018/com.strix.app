import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Skeleton } from '../ui/skeleton'
import clsx from 'clsx'

function LatestInvoiceSkelton() {
    return (
        <Table className='table-auto'>
            <TableCaption>Loading recent invoices...</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">
                        <Skeleton className={clsx('w-24 h-5 px-0', 'bg-gray-300 rounded-none px-2')} />
                    </TableHead>
                    <TableHead>
                        <Skeleton className={clsx('w-36 h-full', 'bg-gray-300 rounded-none px-2')} />
                    </TableHead>
                    <TableHead>
                        <Skeleton className={clsx('w-20  h-full', 'bg-gray-300 rounded-none px-2')} />
                    </TableHead>
                    <TableHead className="text-right">
                        <Skeleton className={clsx('w-32 h-full', 'bg-gray-300 rounded-none px-2')} />
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={index}>
                        <TableCell className="font-medium px-2">
                            <Skeleton className={clsx('w-24 h-5 ', 'bg-gray-300 rounded-none px-2')} />
                        </TableCell>
                        <TableCell className='px-2'>
                            <Skeleton className={clsx('w-36 h-5 px-2', 'bg-gray-300 rounded-none px-2')} />
                        </TableCell>
                        <TableCell className='px-2'>
                            <Skeleton className={clsx('w-20 h-5', 'bg-gray-300 rounded-none px-2')} />
                        </TableCell>
                        <TableCell className="text-right px-2">
                            <Skeleton className={clsx('w-32 h-5', 'bg-gray-300 rounded-none px-2')} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export { LatestInvoiceSkelton }