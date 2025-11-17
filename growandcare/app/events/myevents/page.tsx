import { EventCard } from "@/components/ui/eventcard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";


let lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices arcu quis purus dignissim, quis tristique enim dapibus. Vestibulum placerat metus purus, sit amet viverra massa tempus ac. Fusce vitae porttitor quam, et aliquet erat. Fusce eget purus pharetra, molestie lorem non, scelerisque nibh. Curabitur dignissim tincidunt metus, sit amet congue felis lobortis ornare. Nam tincidunt metus odio, at maximus ligula tempor id. Quisque porta, lectus a tempus ultrices, nisi augue lobortis nulla, sit amet viverra mi nisl vitae tortor. Aliquam erat volutpat. Praesent placerat ante interdum augue lacinia, viverra lobortis augue varius. Pellentesque sed accumsan sapien, vitae laoreet ex. Mauris posuere, lectus ut consequat commodo, turpis augue vulputate nulla, eget molestie mauris nisi eu justo.\nDuis commodo nunc at lacus laoreet, ac fringilla nisi aliquam. Mauris magna nisi, lacinia eu arcu eget, porttitor gravida urna. Suspendisse velit eros, ultricies mattis interdum at, euismod eget nisi. Cras ultrices lorem nec purus imperdiet porttitor. Proin nec lorem eget tortor feugiat commodo ac ut dolor. Nunc eu egestas eros, quis mollis diam. Fusce in nulla mollis, tincidunt metus a, auctor turpis. Integer porttitor, nibh a molestie finibus, tellus mauris volutpat quam, vitae varius augue velit a est. Aenean et faucibus dui, id facilisis lectus. Curabitur vel velit ac dui vulputate scelerisque non nec erat. Ut quis nunc id arcu suscipit volutpat at a ligula. Quisque nunc libero, pulvinar sit amet massa nec, finibus vestibulum libero. Vivamus commodo est velit, sed volutpat velit iaculis in. Donec ante ex, placerat ac purus vel, efficitur tincidunt risus. Vestibulum egestas dapibus suscipit.\nPhasellus eu orci vel ante volutpat dapibus. Proin dapibus tellus sit amet pellentesque euismod. Nunc nec elit enim. Suspendisse venenatis lacus dui, sit amet hendrerit est volutpat imperdiet. Quisque molestie, eros ac luctus tincidunt, odio tellus fringilla sapien, non tristique massa arcu eu velit. Etiam sit amet eleifend dolor, in consectetur ipsum. Vivamus quis maximus lectus, vestibulum ornare sapien. Duis eget tellus fringilla, aliquet leo a, feugiat ex. Pellentesque condimentum ante in mi finibus, ac maximus ex gravida. Aliquam sodales vel tortor vitae luctus. Aenean fermentum semper mauris, et viverra neque convallis id. Sed eleifend volutpat magna. Sed sagittis ac elit id porta. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam gravida ligula quis imperdiet rhoncus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
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


export default function MyEventsPage() {
    return (
        <main className="mx-auto w-full px-8">
            <h1 className="text-3xl font-semibold tracking-tight">My Saved Events</h1>
            <ScrollArea className="mt-4 w-full">
                <div className="flex flex-row flex-wrap gap-4">
                    {events.filter(event => event.saved).map((event) => (
                        <div key={event.title} className="w-full ">
                            <EventCard event={event} key={event.title} />
                        </div>
                    ))}
                </div>
                <ScrollBar orientation="vertical" />
            </ScrollArea>
            <h1 className="text-3xl font-semibold tracking-tight mt-12">My Booked Events</h1>
            <ScrollArea className="mt-4 w-full">
                <div className="flex flex-row flex-wrap gap-4">
                    {events.filter(event => event.booked).map((event) => (
                        <div key={event.title} className="w-full ">
                            <EventCard event={event} key={event.title} />
                        </div>
                    ))}
                </div>
                <ScrollBar orientation="vertical" />
            </ScrollArea>
        </main>
    );
}