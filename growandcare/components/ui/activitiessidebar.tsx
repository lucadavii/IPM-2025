'use client';

import { 
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader, 
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Label } from "@/components/ui/label";
import {Slider} from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Goal, ActivityCategory } from "@/types/activities";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
// const categories = [
//     {
//         title:"Arts & Crafts",
//         url:"#"
//     },
//     {
//         title: "Outdoor Activities",
//         url: "#"
//     },
//     {
//         title: "Educational",
//         url: "#"
//     },
//     {
//         title: "Music & Dance",
//         url: "#"
//     }
// ];

// const goals = [
//     {
//         title: "Physical Activity",
//         url: "#"
//     },
//     {
//         title: "Social Skills",
//         url: "#"
//     },
//     {
//         title: "Cognitive Development",
//         url: "#"
//     },
//     {
//         title: "Creativity",
//         url: "#"
//     }
// ];  

export function ActivitiesSidebar({ categories, goals }: { categories: ActivityCategory[], goals: Goal[] }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const updateSearchParams = (updates : Record<string, string | null>) => {
        const params = new URLSearchParams(searchParams.toString());

        for (const [key, value] of Object.entries(updates)) {
            if (value === null || value === "") {
                params.delete(key);
            } else {
                params.set(key, value);
            }
        }

        const queryString = params.toString();
        const newPath = queryString ? `${pathname}?${queryString}` : pathname;
        router.push(newPath, { scroll: false });
    };

    const selectedGoal = searchParams.get("goal") ?? "all";
    const selectedCategory = searchParams.get("category") ?? "all";

    const initialAgeMin = useMemo(() => Number(searchParams.get("age_min")) ?? 0, [searchParams]);
    const initialAgeMax = useMemo(() => Number(searchParams.get("age_max")) ?? 13, [searchParams]);

    const [ageRange, setAgeRange] = useState<[number, number]>([initialAgeMin ? Number(initialAgeMin) : 0, initialAgeMax ? Number(initialAgeMax) : 13]);
    
    const handleGoalChange = (value: string) => {
        updateSearchParams({ goal: value === "all" ? null : value });
    };

    const handleCategoryChange = (value: string) => {
        updateSearchParams({ category: value === "all" ? null : value });
    };

    const handleAgeChange = (value: [number, number]) => {
        const [min, max] = value;
        updateSearchParams({ age_min: min === 0 ? null : min.toString(), age_max: max === 13 ? null : max.toString() });
    };


    return (
        <Sidebar>
            <SidebarHeader/>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Age</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <Slider
                                    defaultValue={[2, 10]}
                                    min={0}
                                    max={13}
                                    step={1}
                                    className="w-full"
                                    value={ageRange}
                                    onValueChange={(val)=> setAgeRange([val[0] ?? ageRange[0], val[1] ?? ageRange[1]])}
                                    onValueCommit={handleAgeChange}

                                />
                                <div className="flex justify-between text-sm mt-2">
                                    <span>{ageRange[0]}</span>
                                    <span>{ageRange[1]}</span>
                                </div>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Goals</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <ScrollArea className="h-40 w-full">
                                <RadioGroup
                                    value ={selectedGoal}
                                    onValueChange={handleGoalChange}
                                    className="space-y-1"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="all" id="goal-all" />
                                        <Label htmlFor="goal-all" className="text-sm">All Goals</Label>
                                    </div>
                                    {goals.map((goal) => (
                                        <div key={goal.id} className="flex items-center space-x-2">
                                            <RadioGroupItem value={goal.id} id={`goal-${goal.id}`} />
                                            <Label htmlFor={`goal-${goal.id}`} className="text-sm">{goal.name}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                                </ScrollArea>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Categories</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <ScrollArea className="h-40 w-full">
                                <RadioGroup
                                    value ={selectedCategory}
                                    onValueChange={handleCategoryChange}
                                    className="space-y-1"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="all" id="category-all"/>
                                        <Label htmlFor="category-all" className="text-sm">All Categories</Label>
                                    </div>
                                    {categories.map((cat) => (
                                        <div key={cat.id} className="flex items-center space-x-2">
                                            <RadioGroupItem value={cat.id} id={`category-${cat.id}`}/>
                                            <Label htmlFor={`category-${cat.id}`} className="text-sm">{cat.name}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                                </ScrollArea>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter/>
        </Sidebar>
    );
}