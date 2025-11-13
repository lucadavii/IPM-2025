import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuContent,
    NavigationMenuTrigger,
    NavigationMenuViewport
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { HeartIcon } from "lucide-react";

export function NavMenu() {
    return (
        <NavigationMenu viewport={false}>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link href="/" className="px-3 py-2">
                            <Image src="/favicon.ico" alt="Grow&Care Logo" width={24} height={24} />
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link href="/tips" className="px-3 py-2">
                            Tips
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem >
                    <NavigationMenuTrigger> Activities </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[200px] gap-2">
                            <li>
                                <NavigationMenuLink asChild>
                                    <Link href="/myactivities" className="flex-row items-center block rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground">
                                        My Activities
                                        <HeartIcon className="inline-block ml-1 mb-1 w-4 h-4 text-red-500 fill-red-500" />
                                    </Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild>
                                    <Link href="/activities" className="block rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground">
                                        Browse Activities
                                    </Link>
                                </NavigationMenuLink>
                            </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger> Events </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[200px] gap-2">
                            <li>
                                <NavigationMenuLink asChild>
                                    <Link href="/myevents" className="flex-row items-center gap-2 rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground">
                                        My Events
                                        <HeartIcon className="inline-block ml-1 mb-1 w-4 h-4 text-red-500 fill-red-500" />
                                    </Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild>
                                    <Link href="/events" className="block rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground">
                                        Browse Events
                                    </Link>
                                </NavigationMenuLink>
                            </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link href="/childmode" className="px-3 py-2">
                            <p className=" text-purple-500">Child Mode</p>
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link href="/about" className="px-3 py-2">
                            About
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link href="/profile" className="px-3 py-2">
                            <Image src="/developer.png" alt="Developers" width={24} height={24} />
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}