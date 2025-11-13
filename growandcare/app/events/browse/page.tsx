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

const events =[{
    title:"Parenting Workshop",
    description:"Join us for an interactive workshop on effective parenting techniques and strategies.",
    img:"/developer.png",
    link:"#",
    tags:["parenting","workshop"]
},
{
    title:"Nutrition Seminar",
    description:"Learn about healthy eating habits and nutrition tips for the whole family.",
    img:"/developer.png",
    link:"#",
    tags:["nutrition","seminar"]
},
{
    title:"First Aid Training",
    description:"Get certified in basic first aid and emergency response skills.",
    img:"/developer.png",
    link:"#",
    tags:["first aid","training"]
},
{    title:"Outdoor Family Fun Day",
    description:"Enjoy a day of outdoor activities and games for the entire family.",
    img:"/developer.png",
    link:"#",
    tags:["outdoor","family","fun"]
},
{    title:"Event with a very long description",
    description:"This is a very long description meant to test how text wrapping and justification work within the card description component. It should properly wrap and be easy to read without overflowing or causing layout issues.",
    img:"/developer.png",
    link:"#",
    tags:["long description","test"]
}
];


export default function EventsPage() {
    return (
        <main className="mx-auto w-full px-8">
            <h1 className="text-3xl font-semibold tracking-tight">Events</h1>
            <div className="mt-2 w-full flex flex-col"> 
                {/* fix width, add heart button  */}
                {events.map((event) => (
                    <Card className="w-full mt-2 mb-2" key={event.title}>
                        <div className="flex items-center justify-between space-x-6"> {/* align image and text */}
                            <Image src={event.img} alt={event.title} width={50} height={50} className="pr-6 m-2 rounded-md"/>
                            <div className="w-11/12">
                                <CardTitle className="ml-3 justify-center text-left">{event.title}</CardTitle>
                                <CardDescription className="m-3 pr-3 text-justify text-wrap">
                                        <Label className=" text-left ml-6">{event.description}</Label>    
                                </CardDescription>
                            </div>
                        </div>
                        <CardFooter className ="justify-between items-center m-3 px-0">
                            <div className="flex space-x-2 mb-2">
                                {event.tags.map((tag) => (
                                    <Badge key={tag} variant={"secondary"}>{tag}</Badge>
                                ))}
                            </div>
                            <CardAction>
                                <Button asChild className="ml-0">
                                    <a href={event.link}>Read More</a>
                                </Button>
                            </CardAction>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </main>
    );
}