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
}];

export default function TipsPage() {
    return (
        <main className="mx-auto max-w-4xl px-8">
            <h1 className="text-3xl font-semibold tracking-tight">Tips and Advice</h1>
            <div className="mt-2 w-5xl flex flex-col"> 
                {/* fix width  */}
                {articles.map((article) => (
                    <Card className="w-full mt-2 mb-2" key={article.title}>
                        <CardTitle className="ml-3 justify-center">{article.title}</CardTitle>
                        <CardDescription className="ml-3 text-justify">{article.description}</CardDescription>
                        <CardFooter className ="justify-start">
                            <CardAction>
                                <Button asChild>
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