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