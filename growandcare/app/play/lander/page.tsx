import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {Shapes} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function PlayPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-start bg-background px-6 py-24">
            <h1 className="scroll-m-20 text-center text-3xl lg:text-5xl font-extrabold tracking-tight text-balance">
                Welcome to the Play Page!
            </h1>
            <h2 className="mt-6 text-center text-lg max-w-2xl text-muted-foreground">
                Please choose the age range.
            </h2>
            <div className=" w-11/12 h-11/12 mt-10 flex items-center justify-center border border-blue-500 rounded-md p-6">
                <Link href="/play/lander/three-to-five" className="w-1/3 h-40 m-2">
                    <Button variant="outline" className="w-full h-full m-2 flex flex-col">
                        <Label className="text-2xl"> Age 3-5 </Label>
                        <Image src="/developer.png" alt="Kids Playing" width={100} height={100} className="mt-2"/>
                    </Button>
                </Link>
                <Link href="/play/lander/six-to-eight" className="w-1/3 h-40 m-2">
                    <Button variant="outline" className="w-full h-full m-2 flex flex-col">
                        <Label className="text-2xl"> Age 6-8 </Label>
                        <Image src="/developer.png" alt="Kids Playing" width={100} height={100} className="mt-2"/>
                    </Button>
                </Link>
                    <Link href="/play/lander/nine-to-twelve" className="w-1/3 h-40 m-2">
                    <Button variant="outline" className="w-full h-full m-2 flex flex-col">
                        <Label className="text-2xl"> Age 9-12 </Label>
                        <Image src="/developer.png" alt="Kids Playing" width={100} height={100} className="mt-2"/>
                    </Button>
                </Link>
            </div>
        </div>
    );
    }
