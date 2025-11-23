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
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea , ScrollBar} from "@/components/ui/scroll-area";

import { fetchTipCategories, fetchTipsByCategory, fetchAllTips } from "@/lib/tips-connector";

// let lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices arcu quis purus dignissim, quis tristique enim dapibus. Vestibulum placerat metus purus, sit amet viverra massa tempus ac. Fusce vitae porttitor quam, et aliquet erat. Fusce eget purus pharetra, molestie lorem non, scelerisque nibh. Curabitur dignissim tincidunt metus, sit amet congue felis lobortis ornare. Nam tincidunt metus odio, at maximus ligula tempor id. Quisque porta, lectus a tempus ultrices, nisi augue lobortis nulla, sit amet viverra mi nisl vitae tortor. Aliquam erat volutpat. Praesent placerat ante interdum augue lacinia, viverra lobortis augue varius. Pellentesque sed accumsan sapien, vitae laoreet ex. Mauris posuere, lectus ut consequat commodo, turpis augue vulputate nulla, eget molestie mauris nisi eu justo.\nDuis commodo nunc at lacus laoreet, ac fringilla nisi aliquam. Mauris magna nisi, lacinia eu arcu eget, porttitor gravida urna. Suspendisse velit eros, ultricies mattis interdum at, euismod eget nisi. Cras ultrices lorem nec purus imperdiet porttitor. Proin nec lorem eget tortor feugiat commodo ac ut dolor. Nunc eu egestas eros, quis mollis diam. Fusce in nulla mollis, tincidunt metus a, auctor turpis. Integer porttitor, nibh a molestie finibus, tellus mauris volutpat quam, vitae varius augue velit a est. Aenean et faucibus dui, id facilisis lectus. Curabitur vel velit ac dui vulputate scelerisque non nec erat. Ut quis nunc id arcu suscipit volutpat at a ligula. Quisque nunc libero, pulvinar sit amet massa nec, finibus vestibulum libero. Vivamus commodo est velit, sed volutpat velit iaculis in. Donec ante ex, placerat ac purus vel, efficitur tincidunt risus. Vestibulum egestas dapibus suscipit.\nPhasellus eu orci vel ante volutpat dapibus. Proin dapibus tellus sit amet pellentesque euismod. Nunc nec elit enim. Suspendisse venenatis lacus dui, sit amet hendrerit est volutpat imperdiet. Quisque molestie, eros ac luctus tincidunt, odio tellus fringilla sapien, non tristique massa arcu eu velit. Etiam sit amet eleifend dolor, in consectetur ipsum. Vivamus quis maximus lectus, vestibulum ornare sapien. Duis eget tellus fringilla, aliquet leo a, feugiat ex. Pellentesque condimentum ante in mi finibus, ac maximus ex gravida. Aliquam sodales vel tortor vitae luctus. Aenean fermentum semper mauris, et viverra neque convallis id. Sed eleifend volutpat magna. Sed sagittis ac elit id porta. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam gravida ligula quis imperdiet rhoncus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
// lorem = lorem.repeat(2);

// const articles =[{
//     title:"How to sleep better",
//     description:"Tips and tricks to improve your sleep quality and overall well-being.",
//     text: lorem,
//     link:"#"
// },
// {
//     title:"Fun games for kids",
//     description:"Engaging and educational games to keep your children entertained.",
//     text: lorem,
//     link:"#"
// },
// {
//     title:"Avoiding choking hazards",
//     description:"Important safety tips to prevent choking incidents in children.",
//     text: lorem,
//     link:"#"
// },
// {    title:"Very Long Description",
//     description:"This is a very long description meant to test how text wrapping and justification work within the card description component. It should properly wrap and be easy to read without overflowing or causing layout issues.",
//     text: lorem,
//     link:"#"
// }
// ];


export default async function TipsPage({searchParams}: {searchParams: {category?: string}}) {
    searchParams = await searchParams;
    const categoryId = searchParams.category;
    const articles = categoryId ?  await fetchTipsByCategory(categoryId) : await fetchAllTips();

    if (!articles || articles.length === 0) {
        return (
            <main className="mx-auto w-full px-8">
                <h1 className="text-3xl font-semibold tracking-tight">Tips and Advice</h1>
                <div className="mt-4 text-lg text-muted-foreground">
                    No tips available for the selected category.
                </div>
            </main>
        );
    }
    return (
        <main className="mx-auto w-full px-8">
            <h1 className="text-3xl font-semibold tracking-tight">Tips and Advice</h1>
            <div className="mt-2 w-full flex flex-col"> 
                {/* fix width  */}
                {articles.map((article) => (
                    <Card className="w-full mt-2 mb-2" key={article.title}>
                        <CardTitle className="ml-3 justify-center">{article.title}</CardTitle>
                        <CardDescription className="m-3 pr-3 text-justify text-wrap">
                            <Label>{article.description}</Label>
                            </CardDescription>
                        <CardFooter className ="justify-start ml-3 px-0">
                            <CardAction>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="link">Read more</Button>
                                    </DialogTrigger>
                                    <DialogContent className="min-w-11/12 max-h-[100vh]">
                                        <DialogHeader>
                                            <DialogTitle className="mb-3 text-2xl">{article.title}</DialogTitle>
                                        </DialogHeader>
                                            <ScrollArea className="h-[70vh] pr-2">
                                                <div className="mb-4 text-justify text-wrap">
                                                    {article.text}
                                                </div>
                                                <ScrollBar orientation="vertical" />
                                            </ScrollArea>
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