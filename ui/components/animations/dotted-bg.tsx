"use client"
import { cn } from "@/lib/utils";
import DotPattern from "../ui/dot-pattern";

export function DotPatternLinearGradient({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative  size-full  overflow-hidden bg-background">
            {children}
            <DotPattern
                width={20}
                height={20}
                cx={1}
                cy={1}
                cr={1}
                className={cn(
                    "",
                )}
            />
        </div>
    );
}
