import { Loader2 } from "lucide-react";

const InvoiceSkeleton = () => {
    return (
        <div className="flex flex-col space-y-4 border p-8">
            {/* Note section skeleton */}
            <div className="px-4 mt-4">
                <div className="h-4 bg-muted-foreground/30 rounded w-2/3" />
            </div>

            <div className="space-y-8 py-8">
                {/* Header Skeleton */}
                <div className="animate-pulse p-4 space-y-4">
                    <div className="h-8 bg-muted-foreground/30 rounded w-1/3" />
                    <div className="h-4 bg-muted-foreground/30 rounded w-1/4" />
                </div>

                {/* Invoice Details and Secondary Header */}
                <div className="md:flex md:flex-row-reverse p-4 space-y-5">
                    <div className="w-full md:w-1/2 space-y-3">
                        <div className="h-4 bg-muted-foreground/30 rounded" />
                        <div className="h-4 bg-muted-foreground/30 rounded w-5/6" />
                        <div className="h-4 bg-muted-foreground/30 rounded w-3/4" />
                    </div>
                    <div className="w-full md:w-1/2 space-y-3">
                        <div className="h-4 bg-muted-foreground/30 rounded" />
                        <div className="h-4 bg-muted-foreground/30 rounded w-5/6" />
                        <div className="h-4 bg-muted-foreground/30 rounded w-3/4" />
                    </div>
                </div>

                {/* Products Table Skeleton */}
                <div className="px-4">
                    <div className="h-8 bg-muted-foreground/30 rounded mb-4" />
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-6 bg-muted-foreground/10 rounded mb-2" />
                    ))}
                </div>

                {/* Bank Details Skeleton */}
                <div className="px-4 my-10">
                    <div className="h-24 bg-muted-foreground/10 rounded" />
                </div>

                {/* Button Skeleton */}
                <div className="px-4">
                    <div className="h-10 bg-muted-foreground/30 rounded w-1/4" />
                </div>
            </div>

            {/* Loading Spinner */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                    <div className="absolute inset-0 -z-10 animate-pulse rounded-full blur-xl bg-blue-400/50" />
                </div>
            </div>
        </div>
    );
};

export default InvoiceSkeleton;