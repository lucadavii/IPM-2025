"use client";



import { Card, CardAction, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { HeartIcon } from "lucide-react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import {Activity, ActivityWithTagsAndSaved } from "@/types/activities";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

export function ActivityCard({ activity }: { activity: ActivityWithTagsAndSaved }) {
    const router = useRouter();
    const [saved,setSaved] = useState(activity.saved);
    const [loading, setLoading] = useState(false);
    const supabaseBrowser = createSupabaseBrowserClient();
    const toggleSaved = async () => {
        if (loading) return; // Prevent multiple clicks
        setLoading(true);
        const { data:{user}, error } = await supabaseBrowser.auth.getUser();
        if (error ) {
            console.error("Error fetching user:", error);
            setLoading(false);
            return;
        }
        if(!user){
            console.error("No user logged in");
            setLoading(false);
            router.push("/login");
            return;
        }
        try{
            if (saved) {
                const { error } = await supabaseBrowser
                    .from('saved_activities')
                    .delete()
                    .match({p_id:user.id, a_id: activity.id });
                if (error) {
                    console.error("Error removing saved activity:", error);
                } else {
                    setSaved(false);
                }
            } else {
                const { error } = await supabaseBrowser
                    .from('saved_activities')
                    .upsert({p_id: user.id, a_id: activity.id });
                if (error) {
                    console.error("Error saving activity:", error);
                } else {
                    setSaved(true);
                }
            }
        } finally {
            setLoading(false);
        }
    };
    if (activity.img_url === null) {
        activity.img_url = "/developer.png";
    }
    return (
        <Card className="w-full mt-2 mb-2" key={activity.title}>
                        <div className="flex flex-row items-start">
                            <div className="flex flex-col">
                                <Image src={activity.img_url} alt={activity.title} width={100} height={100} className=" mt-0 ml-6 m-3 rounded-md object-scale-down border-2 border-accent-foreground"/>
                                <p className="ml-6 font-semibold text-sm">Age Range:</p>
                                <p className="ml-6 mb-2 text-sm">{activity.age_min} - {activity.age_max}</p>
                            </div>
                            <div className="w-5/6 ">
                                <CardTitle className="ml-3 text-left text-xl ">{activity.title}</CardTitle>
                                <CardDescription className="m-3 pr-3 text-justify">
                                        <Label className=" text-left">{activity.description}</Label>    
                                </CardDescription>
                            </div>
                            <button onClick={toggleSaved} disabled={loading}>
                            {saved? (
                                <HeartIcon className="inline-block ml-1 mt-0 mr-6 w-6 h-6 text-red-500 fill-red-500 cursor-pointer" />
                            ) : (
                                <HeartIcon className="inline-block ml-1 mt-0 mr-6 w-6 h-6 text-red-500 cursor-pointer" />
                            )}
                            </button>
                        </div>
                        <CardFooter className ="justify-between items-center m-3 px-0">
                            <div className="flex space-x-2 mb-2 flex-wrap max-w-[75%]">
                                {activity.tags.map((tag) => (
                                    <Badge key={tag} variant={"secondary"}>{tag}</Badge>
                                ))}
                            </div>
                            <CardAction>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button asChild className="ml-0">
                                            {/* <a href={activity.link}>Read More</a> */}
                                            <span>Read More</span>
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className=" min-w-5/6 h-[80vh] flex flex-col">
                                        <div className="flex flex-row items-start gap-4 flex-1 min-h-0">
                                            <div className="flex flex-col items-start max-w-[250px]">
                                                <Image src={activity.img_url} alt={activity.title} width={200} height={200} className=" mb-4 mt-0 ml-6 m-3 rounded-md object-scale-down border-2 border-accent-foreground"/>
                                                <div className="ml-6 mb-2">
                                                    <p className="font-semibold">Age Range: {activity.age_min} - {activity.age_max}</p>
                                                </div>
                                                <ScrollArea>
                                                    <div className="max-h-[30vh] flex flex-row flex-wrap m-3 ml-0">
                                                        {activity.tags.map((tag) => (
                                                            <Badge key={tag} variant={"secondary"} className="ml-6 mb-2">{tag}</Badge>
                                                        ))}
                                                    </div>
                                                    <ScrollBar orientation="vertical" />
                                                </ScrollArea>
                                            </div>
                                            <div className="flex flex-col flex-1 min-h-0">
                                                <DialogHeader>
                                                    <div className="flex flex-row justify-between mr-6 items-center">
                                                        <DialogTitle className="mb-3 text-2xl">{activity.title}</DialogTitle>
                                                        <button onClick={toggleSaved} disabled={loading}>
                                                        {saved ? (
                                                            <HeartIcon className="inline-block ml-1 mb-1 w-6 h-6 text-red-500 fill-red-500" />
                                                        ) : (
                                                            <HeartIcon className="inline-block ml-1 mb-1 w-6 h-6 text-red-500" />
                                                        )}
                                                        </button>
                                                    </div>
                                                </DialogHeader>
                                                <div className="flex-1 min-h-0 px-3 pb-3">
                                                    <ScrollArea>
                                                        <div className="whitespace-pre-wrap text-justify max-h-[55vh] m-3 ml-0">
                                                            {activity.text}
                                                        </div>
                                                        <ScrollBar orientation="vertical" />
                                                    </ScrollArea>
                                                </div>
                                            </div>
                                        </div>                                  
                                    </DialogContent>
                                </Dialog>
                            </CardAction>
                        </CardFooter>
                    </Card>
    );
}
