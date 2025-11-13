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

const tips = [
    {
        title: "Sleep",
        url: "#"
    },
    {
        title: "Games",
        url: "#"
    },
    {
        title: "Choking Hazards",
        url: "#"
    },
];
export function TipsSidebar() {
    return (
        <Sidebar>
            <SidebarHeader/>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>For Children</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {tips.map((tip) => (
                                <SidebarMenuItem key={tip.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={tip.url} className="w-full text-left">
                                            <span>{tip.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter/>
        </Sidebar>
    );
}