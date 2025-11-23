"use client";

import { Card, CardAction, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle, 
  SheetTrigger,
} from "@/components/ui/sheet"
import { HeartIcon, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import { EventWithTagsSavedBooked } from "@/types/events";
    // title:"Parenting Workshop",
    // description:"Join us for an interactive workshop on effective parenting techniques and strategies.",
    // text:lorem,
    // img:"/developer.png",
    // link:"#",
    // tags:["parenting","workshop","family","kids","education","health" ,"wellness","support","community","skills","development", "tips","advice","resources","activities","events","seminar","training","outdoor","fun","long description","test"],
    // booked: true,
    // saved: true


export function EventCard({ event }: { event: EventWithTagsSavedBooked }) {
    const router = useRouter();
    const [saved,setSaved] = useState(event.saved);
    const [loading, setLoading] = useState(false);

    const [booked, setBooked] = useState(event.booked);
    const [nChildren, setNChildren] = useState<number>(event.n_children ?? 1);
    const [bookingLoading, setBookingLoading] = useState(false);
    const [notes, setNotes] = useState<string>(event.notes ?? "");

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
                    .from('saved_events')
                    .delete()
                    .match({p_id:user.id, e_id: event.id });
                if (error) {
                    console.error("Error removing saved event:", error);
                } else {
                    setSaved(false);
                }
            } else {
                const { error } = await supabaseBrowser
                    .from('saved_events')
                    .insert({p_id:user.id, e_id: event.id });
                if (error) {
                    console.error("Error saving event:", error);
                } else {
                    setSaved(true);
                }
            }
        } catch (error) {
            console.error("Error toggling saved event:", error);
        } finally {
        setLoading(false);
        }
    };

    const handleBooking = async (desiredChildren: number) => {
        if (bookingLoading) return;
        setBookingLoading(true);

        const { data:{user}, error } = await supabaseBrowser.auth.getUser();
        if (error ) {
            console.error("Error fetching user:", error);
            setBookingLoading(false);
            return;
        }
        if(!user){
            console.error("No user logged in");
            setBookingLoading(false);
            router.push("/login");
            return;
        }
        try {
            if (desiredChildren <=0 ) {
                const { error } = await supabaseBrowser
                    .from('bookings')
                    .delete()
                    .match({p_id:user.id, e_id: event.id });
                if (error) {
                    console.error("Error deleting booking:", error);
                } else {
                    setBooked(false);
                    setNChildren(1);
                    setNotes("");
                }
            } else {
                const { error } = await supabaseBrowser
                    .from('bookings')
                    .upsert({p_id:user.id, e_id: event.id, n_children: desiredChildren, notes: notes}, { onConflict: 'p_id,e_id' });
                if (error) {
                    console.error("Error creating/updating booking:", error);
                } else {
                    setBooked(true);
                    setNChildren(desiredChildren);
                }
            }
        } finally {
            setBookingLoading(false);
        }
    }

    if (event.img_url === null) {
        event.img_url = "/developer.png";
    }
    return (
        <Card className="w-full mt-2 mb-2" key={event.title}>
                        <div className="flex flex-row items-start">
                            <div className="flex flex-col">
                                <Image src={event.img_url} alt={event.title} width={100} height={100} className=" mt-0 ml-6 m-3 rounded-md object-scale-down border-2 border-accent-foreground"/>
                                <Label className="ml-6 font-semibold text-sm">Event Date:</Label>
                                <Badge className="ml-6 mb-2 text-sm" variant={'secondary'}>{event.date}</Badge>
                                <Label className="ml-6 font-semibold text-sm">Age Range:</Label>
                                <Badge className="ml-6 mb-2 text-sm" variant={'secondary'}>{event.age_min} - {event.age_max}</Badge>
                                <Label className="ml-6 font-semibold text-sm">Location:</Label>
                                <Badge className="ml-6 mb-2 text-sm" variant={'secondary'}>{event.location}</Badge>
                            </div>
                            <div className="w-5/6 ">
                                <CardTitle className="ml-3 text-left text-xl ">{event.title}</CardTitle>
                                <CardDescription className="m-3 pr-3 text-justify">
                                        <Label className=" text-left">{event.description}</Label>    
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
                                {event.tags.map((tag) => (
                                    <Badge key={tag} variant={"secondary"}>{tag}</Badge>
                                ))}
                            </div>
                            <CardAction>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button asChild className="ml-0">
                                            {/* <a href={event.link}>Read More</a> */}
                                            <span>Read More</span>
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className=" min-w-5/6 h-[80vh] flex flex-col">
                                        <div className="flex flex-row items-start gap-4 flex-1 min-h-0">
                                            <div className="flex flex-col items-start max-w-[250px]">
                                                <Image src={event.img_url} alt={event.title} width={200} height={200} className=" mb-4 mt-0 ml-6 m-3 rounded-md object-scale-down border-2 border-accent-foreground"/>
                                                <div className="ml-6 mb-2">
                                                    <Label className="font-semibold">Event Date: <Badge variant={'secondary'}>{event.date}</Badge></Label>
                                                    <Label className="font-semibold">Age Range: <Badge variant={'secondary'}>{event.age_min} - {event.age_max}</Badge></Label>
                                                    <Label className="font-semibold">Location: <Badge variant={'secondary'}>{event.location}</Badge></Label>
                                                </div>
                                                <ScrollArea>
                                                    <div className="max-h-[30vh] flex flex-row flex-wrap m-3 ml-0">
                                                        {event.tags.map((tag) => (
                                                            <Badge key={tag} variant={"secondary"} className="ml-6 mb-2">{tag}</Badge>
                                                        ))}
                                                    </div>
                                                    <ScrollBar orientation="vertical" />
                                                </ScrollArea>
                                            </div>
                                            <div className="flex flex-col flex-1 min-h-0">
                                                <DialogHeader>
                                                    <div className="flex flex-row justify-between mr-6 items-center">
                                                        <DialogTitle className="mb-3 text-2xl">{event.title}</DialogTitle>
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
                                                            {event.text}
                                                        </div>
                                                        <ScrollBar orientation="vertical" />
                                                    </ScrollArea>
                                                </div>
                                            </div>
                                        </div>
                                        <DialogFooter className="mt-4">
                                            <Sheet>
                                                <SheetTrigger asChild>
                                                    {booked? (<Button variant="secondary">View Booking</Button>) : (<Button>Book Event</Button>)}
                                                </SheetTrigger>
                                                <SheetContent>
                                                    <SheetHeader>
                                                        {booked? (<SheetTitle>Your Booking</SheetTitle>):(<SheetTitle>Book this event</SheetTitle>)}
                                                        <SheetDescription>
                                                            {booked? ("Review your booking details below.") : ("Please insert the required information")}
                                                        </SheetDescription>
                                                    </SheetHeader>
                                                    <div className="flex flex-col gap-4 m-3 items-center">
                                                        <Label className="text-center"> Number of children </Label>
                                                        <div className="flex gap-4">
                                                            <Button variant='outline' disabled={bookingLoading || booked || nChildren <= 1} onClick={() => {setNChildren((prev) => (prev > 1 ? prev - 1 : 0));}}>
                                                                 <Minus />
                                                            </Button>
                                                            <Label> {nChildren} </Label>
                                                            <Button variant='outline' disabled={bookingLoading || booked} onClick={() => {setNChildren((prev) => prev + 1);}}><Plus /></Button>
                                                        </div>
                                                        <Label className="text-center text-wrap"> Additional Notes </Label>
                                                        <Textarea placeholder="E.g., allergies, special needs, etc." className="w-full" value={notes} onChange={(e) => setNotes(e.target.value)} disabled={bookingLoading || booked}/>
                                                    </div>
                                                    <SheetFooter>
                                                        {booked? (<Button variant="destructive" disabled={bookingLoading} onClick={()=> handleBooking(0)}>Delete Booking</Button>) : (
                                                            <Button variant="secondary" disabled={bookingLoading || nChildren <= 0} onClick={() => handleBooking(nChildren)}>Book Event</Button>)}
                                                        <SheetClose asChild>
                                                            <Button>Close</Button>
                                                        </SheetClose>
                                                    </SheetFooter>
                                                </SheetContent>
                                            </Sheet>
                                        </DialogFooter>                                    
                                    </DialogContent>
                                </Dialog>
                            </CardAction>
                        </CardFooter>
                    </Card>
    );
}
