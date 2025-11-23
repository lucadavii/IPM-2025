"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePlayMode } from "@/components/play-mode-provider";
import { Button } from "@/components/ui/button";
import { DoorOpenIcon } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ExitPlayModeButton() {
    const [open, setOpen] = useState(false);
    const [pin, setPin] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const { tryExit } = usePlayMode();
    const router = useRouter();

    const handleConfirm = () => {
        const ok = tryExit(pin.trim());
        if (!ok) {
            setError("Incorrect PIN. Please try again.");
            return;
        }
        setError(null);
        setOpen(false);
        setPin("");
        router.push("/");
    };

    return (
        <>
        <Button variant="outline" className="mr-2 rounded-md bg-transparent border-transparent hover:bg-green-100"
            onClick={() => {
                setOpen(true);
                setPin("");
                setError(null);
            }}
        >
            <DoorOpenIcon className="inline-block w-4 h-4" />
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Exit Play Mode</DialogTitle>
                    <DialogDescription>
                        Please enter your PIN to exit Play Mode.
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                    <Label htmlFor="exit-pin" className="mb-2 block">PIN:</Label>
                    <Input
                        type="password"
                        id="exit-pin"
                        inputMode="numeric"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        className="w-full"
                        placeholder="Enter your PIN"
                    />
                    {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                </div>
                <DialogFooter className="mt-4">
                    <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleConfirm} variant="default">Confirm</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        </>)};