"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode
} from "react";

type PlayModeContextType = {
    isLocked:boolean,
    startPlayMode: (pin:string)=>void,
    tryExit: (pin:string)=>boolean,
};

const PlayModeContext = createContext<PlayModeContextType | null>(null);

export function PlayModeProvider({ children }: { children: ReactNode }) {
    const [isLocked, setIsLocked] = useState<boolean>(false);
    const [pin, setPin] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const storedLocked  = window.localStorage.getItem("playModeLocked");
        const storedPin = window.localStorage.getItem("playModePin");
        if (storedLocked === "1" && storedPin) {
            setIsLocked(true);
            setPin(storedPin);
        }
    }, []);

    const startPlayMode = (newPin:string) => {
        setPin(newPin);
        setIsLocked(true);
        if (typeof window !== "undefined") {
            window.localStorage.setItem("playModeLocked", "1");
            window.localStorage.setItem("playModePin", newPin);
        }
    };

    const tryExit = (attempt: string) =>{
        if(!pin || attempt !== pin) return false;
        setIsLocked(false);
        setPin(null);
        if (typeof window !== "undefined") {
            window.localStorage.removeItem("playModeLocked");
            window.localStorage.removeItem("playModePin");
        }
        return true;
    };

    return (
        <PlayModeContext.Provider value={{ isLocked, startPlayMode, tryExit }}>
            {children}
        </PlayModeContext.Provider>
    );
}

export function usePlayMode() {
    const context = useContext(PlayModeContext);
    if (!context) {
        throw new Error("usePlayMode must be used within a PlayModeProvider");
    }
    return context;
}