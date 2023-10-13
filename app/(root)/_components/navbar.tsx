"use client";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import Logo from "./logo";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { ModeToggle } from "@/components/theme.-toggle";
import { useConvexAuth } from "convex/react";
import { Button } from "@/components/ui/button";
import { LogIn, MousePointerSquare, ExternalLink } from 'lucide-react';
import { Spinner } from "@/components/spinner";
import Link from "next/link";

export const Navbar = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();
    const scroll = useScrollTop();
    return (
        <>
            <div className={cn(
                "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6",
                scroll && "border-b shadow-sm"
            )}>
                <Logo />

                <div className="md:ml-auto md:justify-end justify-between items-center w-full flex gap-x-2">
                    {isLoading && (
                        <Spinner />
                    )}
                    {
                        !isAuthenticated && !isLoading && (
                            <>
                                <SignInButton mode="modal">
                                    <Button variant="ghost" size="sm">
                                        Log In  <LogIn className="w-6 h-6 ml-2 sm:w-4 sm:h-4" />
                                    </Button>
                                </SignInButton>

                                <SignInButton mode="modal">
                                    <Button size="sm">
                                        Get RaNotion Free  <MousePointerSquare className="w-6 h-6 ml-2 sm:w-4 sm:h-4" />
                                    </Button>
                                </SignInButton>

                            </>
                        )
                    }
                    {isAuthenticated && !isLoading && (
                        <>
                            <Button variant="ghost" size="sm" asChild>
                                <Link href="/documents">
                                    Enter RaNotion <ExternalLink className="w-6 h-6 ml-2 sm:w-4 sm:h-4" />
                                </Link>
                            </Button>
                            <UserButton
                                afterSignOutUrl="/"
                            />
                        </>
                    )}
                    <ModeToggle />
                </div>

            </div>
        </>
    );
}