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
import {Calendar} from "@/components/ui/calendar";
import {Slider} from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Goal } from "@/types/activities";
import { EventTag } from "@/types/events";
import { type DateRange } from "react-day-picker"


import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";


export function EventsSidebar({goals, tags}: {goals: Goal[], tags: EventTag[]}) {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const updateSearchParams = (updates: Record<string, string | null>) => {
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
    }

    const selectedGoal = searchParams.get('goal') ?? "all";
    const selectedTag = searchParams.get('tag') ?? "all";

    const initialAgeMin = useMemo(() => Number(searchParams.get('age_min')) ?? 0, [searchParams]);
    const initialAgeMax = useMemo(() => Number(searchParams.get('age_max')) ?? 13, [searchParams]);

    const [ageRange, setAgeRange] = useState<[number, number]>([initialAgeMin ? Number(initialAgeMin) : 0, initialAgeMax ? Number(initialAgeMax) : 13]);

    const initialDateFrom = useMemo(() => searchParams.get('date_from') || '', [searchParams]);
    const initialDateTo = useMemo(() => searchParams.get('date_to') || '', [searchParams]);

    const initialDateRange = useMemo<DateRange | undefined>(() => {
        if (initialDateFrom || initialDateTo) {
            return {
                from: initialDateFrom ? new Date(initialDateFrom) : undefined,
                to: initialDateTo ? new Date(initialDateTo) : undefined,
            };
        }
        return undefined;
    }, [initialDateFrom, initialDateTo]);

    const [dateRange, setDateRange] = useState<DateRange | undefined>(initialDateRange);

    const handleGoalChange = (value: string) => {
        updateSearchParams({ goal: value === 'all' ? null : value });
    };
    
    const handleTagChange = (value: string) => {
        updateSearchParams({ tag: value === 'all' ? null : value });
    };

    const handleAgeChange = (value: [number, number]) => {
        const [min, max] = value;
        updateSearchParams({ age_min: min === 0 ? null : min.toString(), age_max: max === 13 ? null : max.toString() });
    };

    const handleDateChange = (range: DateRange | undefined) => {
        setDateRange(range);
        const fromStr = range?.from ? range.from.toISOString().split('T')[0] : null;
        const toStr = range?.to ? range.to.toISOString().split('T')[0] : null;
        updateSearchParams({ date_from: fromStr, date_to: toStr });
    }

    return (
        <Sidebar>
            <SidebarHeader/>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Calendar</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <div className="w-full max-w-full">
                        <Calendar 
                            mode="range"
                            className="rounded-lg border shadow-sm max-w-full"
                            selected={dateRange}
                            onSelect={handleDateChange}
                        />
                        {/* fix calendar size */}
                        </div>
                    </SidebarGroupContent>
                </SidebarGroup>
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
                                    value ={ageRange}
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
                                    value={selectedGoal}
                                    onValueChange={handleGoalChange}
                                    className="space-y-2"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="all" id="goal-all" />
                                        <Label htmlFor="goal-all" className="text-sm">All Goals</Label>
                                    </div>
                                    {goals?.map((goal) => (
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
                    <SidebarGroupLabel>Tags</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <ScrollArea className="h-40 w-full">
                                <RadioGroup
                                    value={selectedTag}
                                    onValueChange={handleTagChange}
                                    className="space-y-2"
                                >   
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="all" id="tag-all" />
                                        <Label htmlFor="tag-all" className="text-sm">All Tags</Label>
                                    </div>
                                    {tags?.map((tag) => (
                                        <div key={tag.id} className="flex items-center space-x-2">
                                            <RadioGroupItem value={tag.id} id={`tag-${tag.id}`} />
                                            <Label htmlFor={`tag-${tag.id}`} className="text-sm">{tag.name}</Label>
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