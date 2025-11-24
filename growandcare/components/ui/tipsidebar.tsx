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
import { TipCategory } from "@/types/tips";

export function TipsSidebar({ categories }: { categories: TipCategory[] }) {
    return (
        <Sidebar>
            <SidebarHeader/>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>For Children</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            
                            {categories && categories.length > 0 ? categories.map((category) => (
                                <SidebarMenuItem key={category.id}>
                                    <SidebarMenuButton asChild>
                                        <a href={`/tips?category=${category.id}`} className="w-full text-left">
                                            <span>{category.name}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )) : 
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <span className="w-full text-left">No Categories Available</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            }
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter/>
        </Sidebar>
    );
}