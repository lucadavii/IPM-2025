import { ActivityCard } from "@/components/ui/activitycard";

// type AppCardProps = {
//     activity: {
//         title: string;
//         description: string;
//         text: string;
//         img: string;
//         link: string;
//         tags: string[];
//         saved: boolean;
//         age_min: number;
//         age_max: number;
//     };
// };

let lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices arcu quis purus dignissim, quis tristique enim dapibus. Vestibulum placerat metus purus, sit amet viverra massa tempus ac. Fusce vitae porttitor quam, et aliquet erat. Fusce eget purus pharetra, molestie lorem non, scelerisque nibh. Curabitur dignissim tincidunt metus, sit amet congue felis lobortis ornare. Nam tincidunt metus odio, at maximus ligula tempor id. Quisque porta, lectus a tempus ultrices, nisi augue lobortis nulla, sit amet viverra mi nisl vitae tortor. Aliquam erat volutpat. Praesent placerat ante interdum augue lacinia, viverra lobortis augue varius. Pellentesque sed accumsan sapien, vitae laoreet ex. Mauris posuere, lectus ut consequat commodo, turpis augue vulputate nulla, eget molestie mauris nisi eu justo.\nDuis commodo nunc at lacus laoreet, ac fringilla nisi aliquam. Mauris magna nisi, lacinia eu arcu eget, porttitor gravida urna. Suspendisse velit eros, ultricies mattis interdum at, euismod eget nisi. Cras ultrices lorem nec purus imperdiet porttitor. Proin nec lorem eget tortor feugiat commodo ac ut dolor. Nunc eu egestas eros, quis mollis diam. Fusce in nulla mollis, tincidunt metus a, auctor turpis. Integer porttitor, nibh a molestie finibus, tellus mauris volutpat quam, vitae varius augue velit a est. Aenean et faucibus dui, id facilisis lectus. Curabitur vel velit ac dui vulputate scelerisque non nec erat. Ut quis nunc id arcu suscipit volutpat at a ligula. Quisque nunc libero, pulvinar sit amet massa nec, finibus vestibulum libero. Vivamus commodo est velit, sed volutpat velit iaculis in. Donec ante ex, placerat ac purus vel, efficitur tincidunt risus. Vestibulum egestas dapibus suscipit.\nPhasellus eu orci vel ante volutpat dapibus. Proin dapibus tellus sit amet pellentesque euismod. Nunc nec elit enim. Suspendisse venenatis lacus dui, sit amet hendrerit est volutpat imperdiet. Quisque molestie, eros ac luctus tincidunt, odio tellus fringilla sapien, non tristique massa arcu eu velit. Etiam sit amet eleifend dolor, in consectetur ipsum. Vivamus quis maximus lectus, vestibulum ornare sapien. Duis eget tellus fringilla, aliquet leo a, feugiat ex. Pellentesque condimentum ante in mi finibus, ac maximus ex gravida. Aliquam sodales vel tortor vitae luctus. Aenean fermentum semper mauris, et viverra neque convallis id. Sed eleifend volutpat magna. Sed sagittis ac elit id porta. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam gravida ligula quis imperdiet rhoncus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
lorem += lorem; // make it longer

const activities = [
    {
        title:"Yoga for Kids",
        description:"A fun and engaging yoga class for children aged 5-12.",
        text:lorem,
        img:"/developer.png",
        link:"#",
        tags:["yoga","kids","fitness","mindfulness"],
        saved: true,
        age_min: 5,
        age_max: 12,
    },
    {
        title:"Gardening Basics",
        description:"Learn the fundamentals of gardening and plant care.",
        text:lorem,
        img:"/developer.png",
        link:"#",
        tags:["gardening","outdoor","nature","kids"],
        saved: true,
        age_min: 5,
        age_max: 12,
    },
    {
        title:"Art and Craft Workshop",
        description:"Explore creativity through various art and craft activities.",
        text:lorem,
        img:"/developer.png",
        link:"#",
        tags:["art","craft","creativity","kids"],
        saved: false,
        age_min: 5,
        age_max: 12,
    },
];

export default function EventsPage() {
    return (
        <main className="mx-auto w-full px-8">
            <h1 className="text-3xl font-semibold tracking-tight">Activities</h1>
            <div className="mt-2 w-full flex flex-col"> 
                {activities.map((activity) => (
                    <ActivityCard activity={activity} key={activity.title} />
                ))}
            </div>
        </main>
    );
}