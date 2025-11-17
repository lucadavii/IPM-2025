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

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const categories = [
    {
        title:"Arts & Crafts",
        url:"#"
    },
    {
        title: "Outdoor Activities",
        url: "#"
    },
    {
        title: "Educational",
        url: "#"
    },
    {
        title: "Music & Dance",
        url: "#"
    }
];
const goals = [
    {
        title:"Social Skills",
        url:"#"
    },
    {
        title: "Motor Skills",
        url: "#"
    },
    {
        title: "Cognitive Development",
        url: "#"
    },
    {
        title: "Emotional Well-being",
        url: "#"
    }
];
export function EventsSidebar() {
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
                                />
                                <div className="flex justify-between text-sm mt-2">
                                    <span>0</span>
                                    <span>13</span>
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
                                <RadioGroup>
                                    {goals.map((goal) => (
                                        <div key={goal.title} className="flex items-center space-x-2">
                                            <RadioGroupItem value={goal.title} id={goal.title} />
                                            <Label htmlFor={goal.title} className="text-sm">{goal.title}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Categories</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <RadioGroup>
                                    {categories.map((cat) => (
                                        <div key={cat.title} className="flex items-center space-x-2">
                                            <RadioGroupItem value={cat.title} id={cat.title} />
                                            <Label htmlFor={cat.title} className="text-sm">{cat.title}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter/>
        </Sidebar>
    );
}