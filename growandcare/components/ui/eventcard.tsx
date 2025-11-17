import { Card, CardAction, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { HeartIcon } from "lucide-react";
import Image from "next/image";
import { Label } from "@/components/ui/label";


    // title:"Parenting Workshop",
    // description:"Join us for an interactive workshop on effective parenting techniques and strategies.",
    // text:lorem,
    // img:"/developer.png",
    // link:"#",
    // tags:["parenting","workshop","family","kids","education","health" ,"wellness","support","community","skills","development", "tips","advice","resources","activities","events","seminar","training","outdoor","fun","long description","test"],
    // booked: true,
    // saved: true

type AppCardProps = {
    event: {
        title: string;
        description: string;
        text: string;
        img: string;
        link: string;
        tags: string[];
        booked: boolean;
        saved: boolean;
    };
};

export function EventCard({ event }: AppCardProps) {
    return (
        <Card className="w-full mt-2 mb-2" key={event.title}>
                        <div className="flex flex-row items-start">
                            <Image src={event.img} alt={event.title} width={100} height={100} className=" mt-0 ml-6 m-3 rounded-md object-scale-down border-2 border-accent-foreground"/>
                            <div className="w-5/6 ">
                                <CardTitle className="ml-3 text-left text-xl ">{event.title}</CardTitle>
                                <CardDescription className="m-3 pr-3 text-justify">
                                        <Label className=" text-left">{event.description}</Label>    
                                </CardDescription>
                            </div>
                            {event.saved? (
                                <HeartIcon className="inline-block ml-1 mt-0 mr-6 w-6 h-6 text-red-500 fill-red-500 cursor-pointer" />
                            ) : (
                                <HeartIcon className="inline-block ml-1 mt-0 mr-6 w-6 h-6 text-red-500 cursor-pointer" />
                            )}
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
                                            <a href={event.link}>Read More</a>
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className=" min-w-5/6 h-[80vh] flex flex-col">
                                        <div className="flex flex-row items-start gap-4 flex-1 min-h-0">
                                            <div className="flex flex-col items-start max-w-[250px]">
                                                <Image src={event.img} alt={event.title} width={200} height={200} className=" mb-4 mt-0 ml-6 m-3 rounded-md object-scale-down border-2 border-accent-foreground"/>
                                                <div className="flex flex-row flex-wrap m-3 ml-0">
                                                    {event.tags.map((tag) => (
                                                        <Badge key={tag} variant={"secondary"} className="ml-6 mb-2">{tag}</Badge>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex flex-col flex-1 min-h-0">
                                                <DialogHeader>
                                                    <div className="flex flex-row justify-between mr-6 items-center">
                                                        <DialogTitle className="mb-3 text-2xl">{event.title}</DialogTitle>
                                                        {event.saved ? (
                                                            <HeartIcon className="inline-block ml-1 mb-1 w-6 h-6 text-red-500 fill-red-500" />
                                                        ) : (
                                                            <HeartIcon className="inline-block ml-1 mb-1 w-6 h-6 text-red-500" />
                                                        )}
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
                                            {event.booked ? (
                                                <Button variant="secondary" disabled>Already Booked</Button>
                                            ) : (
                                                <Button variant="secondary">Book</Button>
                                            )}
                                        </DialogFooter>                                    
                                    </DialogContent>
                                </Dialog>
                            </CardAction>
                        </CardFooter>
                    </Card>
    );
}
