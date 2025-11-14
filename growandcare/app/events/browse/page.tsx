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
    description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed magna a enim tincidunt rutrum quis et augue. Praesent pellentesque quis neque in faucibus. Sed fringilla libero vel porta efficitur. Aliquam in sapien sit amet tellus laoreet rhoncus in sed quam. Fusce dui nisl, auctor vitae iaculis vel, facilisis quis erat. Maecenas consectetur neque neque, eget mollis mauris tincidunt a. Ut nec lobortis odio. Praesent feugiat sollicitudin fermentum. Phasellus lectus mi, mattis ac lectus vitae, euismod venenatis quam. Nam dolor tortor, finibus et est fringilla, luctus ullamcorper nisi.\n Quisque sed nisl velit. Morbi gravida odio nec turpis vehicula, eget vehicula leo consequat. Duis congue non nunc nec euismod. Maecenas bibendum lobortis enim sed dignissim. Aliquam interdum felis malesuada nulla lobortis, non pulvinar nibh vehicula. Mauris sodales velit sem, non ultricies diam porta quis. Ut non massa massa. In sollicitudin massa et tellus blandit egestas. Cras augue metus, pretium vitae odio et, pulvinar lacinia risus.\nNullam sed cursus tellus. Curabitur malesuada enim pharetra metus dictum, quis tempus tellus ornare. Cras lobortis eros nisl, nec consequat massa venenatis lobortis. Ut condimentum volutpat odio quis tempor. Aenean blandit nulla non orci dictum, et mattis tortor lobortis. Nunc sit amet aliquam nulla, eu pharetra velit. Nam ut venenatis lacus, sed rhoncus libero. Donec in lorem a lorem consequat maximus. Cras non mauris turpis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis massa turpis, suscipit in purus vitae, convallis semper urna. Aliquam gravida ultricies odio, ac iaculis leo elementum eu. Donec non diam erat.\nPhasellus viverra volutpat ex id lacinia. Pellentesque tristique non dui nec eleifend. Aliquam erat volutpat. Ut ex odio, lacinia quis bibendum a, vestibulum eu metus. Donec aliquam nec dolor id aliquet. Nullam pulvinar vel dolor a venenatis. Suspendisse potenti. Pellentesque non laoreet neque. Proin convallis, sem vel commodo fermentum, lorem urna rhoncus metus, ac dictum erat nisl vel odio. Vivamus aliquam dictum nulla quis blandit. Phasellus auctor vehicula magna non pretium. Etiam eu luctus metus. Praesent elementum, elit id rhoncus ultricies, magna libero imperdiet purus, ut tempus elit tortor at enim. Nulla nec ligula sapien. Vestibulum scelerisque ante sit amet libero tempor ultricies.\nNullam et hendrerit massa. Nam tempor luctus justo non vestibulum. Fusce in urna ut nibh cursus ultrices id id arcu. Donec eros lorem, varius in odio eget, tempor semper neque. Vestibulum cursus convallis justo non sagittis. Aliquam malesuada neque vitae sapien tempus, non eleifend lacus egestas. Integer in purus quis sem iaculis rutrum. Proin condimentum et tortor et lacinia. Vestibulum commodo turpis nec urna dictum, ut posuere massa dignissim. Vestibulum non aliquet orci. Sed condimentum elit quis ante iaculis faucibus. Sed rutrum ac sapien eget fringilla. Suspendisse vel lobortis ex, vel posuere justo.",
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
                            <HeartIcon className="inline-block ml-1 mt-0 mr-6 w-6 h-6 text-red-500 onClick:fill-red-500 cursor-pointer" />
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