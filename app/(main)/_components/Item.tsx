"use client";

import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";

interface ItemProps {
    id?:Id<"documents">;
    documentIcon?:string;
    active?:boolean;
    expended?:boolean;
    isSearch:boolean;
    level?:number;
    onExpand?: () => void;
    label: string;
    icon: LucideIcon;
    onClick: () => void;
}


export const Item = ({
    id,
    label,
    onClick,
    icon: Icon,
    active,
    documentIcon,
    expended,
    isSearch,
    level = 0,
    onExpand,
}: ItemProps) => {
    const ChevronIcon = expended ? ChevronDown : ChevronRight; 
    return (
        <>
            <div
                onClick={onClick}
                role="button"
                style={{ paddingLeft: level ? `${(level * 12) + 12}px` :"12px"
             }}
                className={cn(
                    "group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
                    active && "bg-primary/5 text-primary"
                    )}
                >
                    {!!id &&(

                        <div
                            role="button"
                            className="h-full rounded-sm hover:bg-neutral-300 dark:bg-netual-600 mr-1"
                            onClick={() => {}}
                        >
                            <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50   "/>
                        </div>

                    )}
                <Icon className="shrink-0 h-[18px] text-muted-foreground mr-2" />
                <span className="truncate">
                    {label}
                </span>
            </div>
        </>
    )


} 