"use client";

import {useState} from "react";
import { useRouter } from "next/navigation";
import { usePlayMode } from "@/components/play-mode-provider";
import { Button } from "@/components/ui/button";

export default function PlayEntryPage() {
    const [pin, setPin] = useState<string>("");
    const {startPlayMode} = usePlayMode();
    const router = useRouter();

    const handleStart = () => {
        if (pin.trim().length < 4 ) {
            alert("Please enter a valid PIN to start Play Mode.");
            return;
        }
        startPlayMode(pin.trim());
        router.push("/play/lander");
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-4">
            <h1 className="text-3xl font-bold mb-6">Enter Play Mode</h1>
            <div className="mb-4 w-full border-2 max-w-xs border-blue-900 rounded-md p-4 bg-white shadow-md">
                <label htmlFor="pin" className="block text-sm font-medium text-gray-700 mb-2">
                    Create a PIN to lock Play Mode:
                </label>
                <input
                    type="password"
                    id="pin"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="4-digit PIN"
                />
                <label htmlFor="pin" className="block text-sm font-light text-gray-700 mb-2 mt-2">
                    This PIN will be required to exit Play Mode.
                </label>
            </div>
            <Button
                onClick={handleStart}
                variant="default"
                className="bg-green-600"
                >
                Start Play Mode
            </Button>
            <Button 
                onClick={() => router.push("/")}
                variant="ghost"
                className="mt-4 hover:bg-green-100"
            >
                Go Back to Home Page
            </Button>
        </main>
    );
}