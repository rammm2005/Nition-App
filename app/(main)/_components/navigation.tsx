import { ChevronsLeft, MenuIcon , PlusCircle ,Search ,Settings} from "lucide-react";
import { usePathname } from "next/navigation";
import { useRef, ElementRef, useState, useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
import {api} from '@/convex/_generated/api';
import { cn } from "@/lib/utils";
import { UserItem } from "./user-item";
import { useMutation} from "convex/react";
import { Item } from "./Item";
import { toast } from "sonner";
import { DocumentList } from "./document-list";

export const Navigation = () => {
    const pathname = usePathname();
    const isMobile = useMediaQuery("(max-width:768px)");
    const create = useMutation(api.documents.create);




    const isResizingRef = useRef(false);
    const sideBarRef = useRef<ElementRef<"aside">>(null);
    const navbarRef = useRef<ElementRef<"div">>(null);
    const [isResetting, setIsResetting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(isMobile);

    useEffect(() => {
        if(isMobile){
            collapse();
        }else{
            resetWidth();
        }
    }, [isMobile]);

    useEffect(() => {
        if(isMobile){
            collapse();
        }
    } , [pathname , isMobile]);

    const handleMouseDown = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.preventDefault();
        event.stopPropagation();

        isResizingRef.current = true;
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

    }

    const handleMouseMove = (event: MouseEvent) => {
        if (!isResizingRef.current) return;
        let newWidth = event.clientX;

        if (newWidth < 240) newWidth = 240;
        if (newWidth > 480) newWidth = 480;

        if (sideBarRef.current && navbarRef.current) {
            sideBarRef.current.style.width = `${newWidth}px`;
            navbarRef.current.style.setProperty("left", `${newWidth}px`);
            navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth})`);
        }
    }

    const handleMouseUp = () => {
        isResizingRef.current = false;
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    }

    const resetWidth = () => {
        if (sideBarRef.current && navbarRef.current) {
            setIsCollapsed(false);
            setIsResetting(true);

            sideBarRef.current.style.width = isMobile ? "100%" : "240px";
            navbarRef.current.style.setProperty(
                "width",
                isMobile ? "0" : "calc(100% - 240px)"
            );
            navbarRef.current.style.setProperty(
                "left",
                isMobile ? "100%" : "240px"
            );
            setTimeout(() => setIsResetting(false), 300);
        }
    }

    const collapse = () => {
        if (sideBarRef.current && navbarRef.current) {
            setIsCollapsed(true);
            setIsResetting(true);

            sideBarRef.current.style.width = "0";
            navbarRef.current.style.setProperty("width", "100%");
            navbarRef.current.style.setProperty("left", "0");
            setTimeout(() => setIsResetting(false), 300);

        }
    }


    const handleCreate = () => {
        const promise = create({
            title : "Untitled",
        });

        toast.promise(promise, {
            loading : "Cretaing a new note...",
            success : "New note created!",
            error : "Failed to make a note."
        })
    }


    return (
        <>
            <aside ref={sideBarRef} className={cn(
                "group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]",
                isResetting && "transtion-all ease-in-out duration-300", isMobile && "w-0"
            )}>
                <div role="button" onClick={collapse} className={cn(
                    "w-6 h-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
                    isMobile && "opacity-100"
                )}>
                    <ChevronsLeft className="h-6 w-6" />
                </div>



                <div>
                    <UserItem/>
                    <Item
                        label="Search"
                        icon={Search}
                        isSearch
                    />
                    <Item
                        label="Settings"
                        icon={Settings}
                        onClick={() => {}}
                    />
                    <Item 
                    onClick={handleCreate}
                    label="New page" 
                    icon={PlusCircle}
                    />
                </div>

                <div className="mt-4">
                    <DocumentList/>
                </div>

                <div
                    onMouseDown={handleMouseDown}
                    onClick={resetWidth}
                    className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
                />

            </aside>

            <div ref={navbarRef}
                className={cn("absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
                    isResetting && "transition-all ease-in-out duration-300",
                    isMobile && "w-full left-0"
                )}
            >
                <nav className="bg-transparent px-3 py-2 w-full">
                    {isCollapsed && <MenuIcon onClick={resetWidth} role="button" className="h-6 w-6 text-muted-foreground" />}
                </nav>
            </div>
        </>
    );
}
