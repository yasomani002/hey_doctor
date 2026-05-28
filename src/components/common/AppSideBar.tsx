import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
    useSidebar,
} from "@/components/ui/sidebar";
import companyLogo from "@/assets/images/companylogo.png";
import {
    Home,
    Users,
    ShoppingCart,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import CRCImage from "./CRCImage";
import Text from "./Text";

const items = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "Users",
        url: "/users",
        icon: Users,
    },
    {
        title: "Orders",
        url: "/orders",
        icon: ShoppingCart,
    },
];

export function AppSidebar() {
    const location = useLocation();
    const { state } = useSidebar();
    const isCollapsed = state === "collapsed";

    return (
        <Sidebar collapsible="icon">
            <SidebarContent>

                <SidebarGroup>
                    <div className={`flex justify-center items-center w-full`}>
                        <CRCImage imageSrc={companyLogo} height={20} width={20} border={false} />
                    </div>

                    <SidebarGroupContent>
                        <SidebarMenu className="text-white gap-y-3 flex items-center justify-center" >

                            {items.map((item) => {
                                const isActive = location.pathname === item.url;
                                return (
                                    <SidebarMenuItem key={item.title} className={isCollapsed ? "w-auto flex justify-center" : "w-[90%]"}>
                                        <SidebarMenuButton
                                            className={`rounded-sm transition-colors duration-200 ${isActive
                                                ? "bg-white text-[#265368]"
                                                : "text-white hover:bg-white hover:text-black"
                                                }`}
                                            asChild
                                            isActive={isActive}
                                            tooltip={item.title}
                                        >
                                            <Link to={item.url} className={isCollapsed ? "justify-center" : ""}>
                                                <item.icon
                                                    size={isCollapsed ? 18 : 24}
                                                />
                                                {!isCollapsed && (
                                                    <Text
                                                        as="span"
                                                        fontSize={"14px"}
                                                        color="inherit"
                                                    >{item.title}</Text>
                                                )}
                                            </Link>

                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            }
                            )}

                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

            </SidebarContent>
            <SidebarFooter className="flex items-end">
                <SidebarTrigger className="cursor-pointer" />
            </SidebarFooter>
        </Sidebar>
    );
}
