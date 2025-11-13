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
import { Car } from "lucide-react";
import { Label } from "@/components/ui/label";

const articles =[{
    title:"How to sleep better",
    description:"Tips and tricks to improve your sleep quality and overall well-being.",
    link:"#"
},
{
    title:"Fun games for kids",
    description:"Engaging and educational games to keep your children entertained.",
    link:"#"
},
{
    title:"Avoiding choking hazards",
    description:"Important safety tips to prevent choking incidents in children.",
    link:"#"
},
{    title:"Very Long Description",
    description:"This is a very long description meant to test how text wrapping and justification work within the card description component. It should properly wrap and be easy to read without overflowing or causing layout issues.",
    link:"#"
}
];


export default function TipsPage() {
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
                                <Button asChild className="ml-0">
                                    <a href={article.link}>Read More</a>
                                </Button>
                            </CardAction>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </main>
    );
}