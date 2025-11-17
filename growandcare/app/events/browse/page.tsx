import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { HeartIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

var lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices arcu quis purus dignissim, quis tristique enim dapibus. Vestibulum placerat metus purus, sit amet viverra massa tempus ac. Fusce vitae porttitor quam, et aliquet erat. Fusce eget purus pharetra, molestie lorem non, scelerisque nibh. Curabitur dignissim tincidunt metus, sit amet congue felis lobortis ornare. Nam tincidunt metus odio, at maximus ligula tempor id. Quisque porta, lectus a tempus ultrices, nisi augue lobortis nulla, sit amet viverra mi nisl vitae tortor. Aliquam erat volutpat. Praesent placerat ante interdum augue lacinia, viverra lobortis augue varius. Pellentesque sed accumsan sapien, vitae laoreet ex. Mauris posuere, lectus ut consequat commodo, turpis augue vulputate nulla, eget molestie mauris nisi eu justo.\nDuis commodo nunc at lacus laoreet, ac fringilla nisi aliquam. Mauris magna nisi, lacinia eu arcu eget, porttitor gravida urna. Suspendisse velit eros, ultricies mattis interdum at, euismod eget nisi. Cras ultrices lorem nec purus imperdiet porttitor. Proin nec lorem eget tortor feugiat commodo ac ut dolor. Nunc eu egestas eros, quis mollis diam. Fusce in nulla mollis, tincidunt metus a, auctor turpis. Integer porttitor, nibh a molestie finibus, tellus mauris volutpat quam, vitae varius augue velit a est. Aenean et faucibus dui, id facilisis lectus. Curabitur vel velit ac dui vulputate scelerisque non nec erat. Ut quis nunc id arcu suscipit volutpat at a ligula. Quisque nunc libero, pulvinar sit amet massa nec, finibus vestibulum libero. Vivamus commodo est velit, sed volutpat velit iaculis in. Donec ante ex, placerat ac purus vel, efficitur tincidunt risus. Vestibulum egestas dapibus suscipit.\nPhasellus eu orci vel ante volutpat dapibus. Proin dapibus tellus sit amet pellentesque euismod. Nunc nec elit enim. Suspendisse venenatis lacus dui, sit amet hendrerit est volutpat imperdiet. Quisque molestie, eros ac luctus tincidunt, odio tellus fringilla sapien, non tristique massa arcu eu velit. Etiam sit amet eleifend dolor, in consectetur ipsum. Vivamus quis maximus lectus, vestibulum ornare sapien. Duis eget tellus fringilla, aliquet leo a, feugiat ex. Pellentesque condimentum ante in mi finibus, ac maximus ex gravida. Aliquam sodales vel tortor vitae luctus. Aenean fermentum semper mauris, et viverra neque convallis id. Sed eleifend volutpat magna. Sed sagittis ac elit id porta. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam gravida ligula quis imperdiet rhoncus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
lorem += lorem; // make it longer
const events =[{
    title:"Parenting Workshop",
    description:"Join us for an interactive workshop on effective parenting techniques and strategies.",
    text:lorem,
    img:"/developer.png",
    link:"#",
    tags:["parenting","workshop","family","kids","education","health" ,"wellness","support","community","skills","development", "tips","advice","resources","activities","events","seminar","training","outdoor","fun","long description","test"],
    booked: true,
    saved: true
},
{
    title:"Nutrition Seminar",
    description:"Learn about healthy eating habits and nutrition tips for the whole family.",
    text:lorem,
    img:"/developer.png",
    link:"#",
    tags:["nutrition","seminar"],
    booked: true,
    saved: true
},
{
    title:"First Aid Training",
    description:"Get certified in basic first aid and emergency response skills.",
    text:lorem,
    img:"/developer.png",
    link:"#",
    tags:["first aid","training"],
    booked: false,
    saved: false
},
{    title:"Outdoor Family Fun Day",
    description:"Enjoy a day of outdoor activities and games for the entire family.",
    text:lorem,
    img:"/developer.png",
    link:"#",
    tags:["outdoor","family","fun"],
    booked: false,
    saved: false
},
{    title:"Event with a very long description",
    description:lorem,
    text:lorem,
    img:"/developer.png",
    link:"#",
    tags:["long description","test"],
    booked: false,
    saved: false
}
];


export default function EventsPage() {
    return (
        <main className="mx-auto w-full px-8">
            <h1 className="text-3xl font-semibold tracking-tight">Events</h1>
            <div className="mt-2 w-full flex flex-col"> 
                {events.map((event) => (
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
                ))}
            </div>
        </main>
    );
}