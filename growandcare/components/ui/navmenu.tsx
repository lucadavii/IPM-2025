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
                        <ul className="grid w-[320px] gap-2">
                            <li>
                                <NavigationMenuLink asChild>
                                    <Link href="/about" className="block rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground">
                                        My Activities
                                    </Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild>
                                    <Link href="/about" className="block rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground">
                                        Browse Activities
                                    </Link>
                                </NavigationMenuLink>
                            </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link href="/about" className="px-3 py-2">
                            Events
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link href="/about" className="px-3 py-2">
                            Child Mode
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