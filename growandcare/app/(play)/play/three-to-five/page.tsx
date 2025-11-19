import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function ThreeToFivePage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-start bg-background px-6 py-24">
            <h1 className="scroll-m-20 text-center text-3xl lg:text-5xl font-extrabold tracking-tight text-balance">
                Let's Play Together! Choose an Activity
            </h1>
            <h2 className="mt-6 text-center text-lg max-w-2xl text-muted-foreground">
                Age 3-5 Activities
            </h2>
            <div className=" w-11/12 h-11/12 mt-10 flex items-center justify-center border border-blue-500 rounded-md p-6">
                <Link href="/play/three-to-five/colors" className="w-1/3 h-40 m-2">
                    <Button variant="outline" className="w-full h-full m-2 flex flex-col rounded-full border-blue-400 bg-blue-100 hover:bg-blue-200">
                        <Label className="text-2xl"> Colors and Shapes </Label>
                        <Image src="/developer.png" alt="Kids Playing" width={100} height={100} className="mt-2"/>
                    </Button>
                </Link>
                <Link href="/play/three-to-five/count" className="w-1/3 h-40 m-2">
                    <Button variant="outline" className="w-full h-full m-2 flex flex-col rounded-full border-green-400 bg-green-100 hover:bg-green-200">
                        <Label className="text-2xl"> Counting Fun </Label>
                        <Image src="/developer.png" alt="Kids Playing" width={100} height={100} className="mt-2"/>
                    </Button>
                </Link>
                    <Link href="/play/three-to-five/seasons" className="w-1/3 h-40 m-2">
                    <Button variant="outline" className="w-full h-full m-2 flex flex-col rounded-full border-purple-400 bg-purple-100 hover:bg-purple-200">
                        <Label className="text-2xl"> Seasons and Weather </Label>
                        <Image src="/developer.png" alt="Kids Playing" width={100} height={100} className="mt-2"/>
                    </Button>
                </Link>
            </div>
        </div>
    )
}