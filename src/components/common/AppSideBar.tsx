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

import {
    Collapsible,
    CollapsibleContent,
} from "@/components/ui/collapsible";

import companyLogo from "@/assets/images/companylogo.png";
import {
    ChevronDownIcon,
    LucideListTree,
    ShoppingCart,
} from "lucide-react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import CRCImage from "./CRCImage";
import Text from "./Text";

import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { useState } from "react";

export function AppSidebar() {
    const location = useLocation();
    const { state } = useSidebar();
    const navigate = useNavigate();

    const isCollapsed = state === "collapsed";

    const { user } = useSelector(
        (state: RootState) => state.auth
    );

    const menuBar =
        user?.permissions?.map((permission) => ({
            title: permission.nav_menu_name,

            // Redirect parent to first submenu if exists
            url:
                permission.sub_menu?.length > 0
                    ? permission.sub_menu[0].nav_path
                    : permission.nav_path,

            sub_menu: permission.sub_menu || [],
            icon: ShoppingCart,
        })) || [];

    return (
        <Sidebar collapsible="icon">
            <SidebarContent>
                <SidebarGroup>
                    <div className="flex justify-center items-center w-full py-3">
                        <CRCImage
                            imageSrc={companyLogo}
                            className="h-[60px] w-[60px]"
                            border={false}
                        />
                    </div>

                    <SidebarGroupContent>
                        <SidebarMenu className="text-white gap-y-3 flex flex-col items-center">
                            {menuBar.map((item) => {
                                const hasSubMenu =
                                    item.sub_menu?.length > 0;

                                const isParentActive =
                                    location.pathname === item.url ||
                                    item.sub_menu?.some(
                                        (sub) =>
                                            sub.nav_path ===
                                            location.pathname
                                    );

                                const [open, setOpen] = useState(
                                    isParentActive
                                );

                                return (
                                    <Collapsible
                                        key={item.title}
                                        open={open}
                                        onOpenChange={setOpen}
                                        className="w-full flex flex-col items-center"
                                    >
                                        {/* Parent Menu */}
                                        <SidebarMenuItem
                                            className={
                                                isCollapsed
                                                    ? "w-auto flex justify-center "
                                                    : "w-[90%]"
                                            }
                                        >
                                            <SidebarMenuButton
                                                isActive={isParentActive}
                                                tooltip={item.title}
                                                className={`rounded-sm transition-colors duration-200 ${isParentActive ? "bg-white text-[#265368]" : "text-white hover:bg-white hover:text-black"}`}
                                            >
                                                <div
                                                    className="flex items-center justify-between w-full cursor-pointer"
                                                    onClick={() => {
                                                        if (hasSubMenu) {
                                                            setOpen(!open);
                                                            navigate(item.sub_menu[0].nav_path);
                                                        } else {
                                                            navigate(item.url);
                                                        }
                                                    }}
                                                >
                                                    <div className="flex items-center gap-2 flex-1">
                                                        <item.icon size={isCollapsed ? 18 : 22} />

                                                        {!isCollapsed && (
                                                            <Text as="span" fontSize="14px" color="inherit">
                                                                {item.title}
                                                            </Text>
                                                        )}
                                                    </div>

                                                    {!isCollapsed && hasSubMenu && (
                                                        <ChevronDownIcon size={18} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
                                                    )}
                                                </div>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>

                                        {/* Sub Menus */}
                                        {hasSubMenu && !isCollapsed && (
                                            <CollapsibleContent className="w-full">
                                                {item.sub_menu.map((subItem) => {
                                                    const isSubActive = location.pathname === subItem.nav_path;

                                                    return (
                                                        <SidebarMenuItem key={subItem.nav_menu_name} className="w-[75%] ml-11 mt-2">
                                                            <SidebarMenuButton
                                                                asChild
                                                                isActive={isSubActive}
                                                                tooltip={subItem.nav_menu_name}
                                                                className={`rounded-sm transition-colors duration-200 ${isSubActive
                                                                    ? "bg-white text-[#265368]"
                                                                    : "text-white hover:bg-white hover:text-black"
                                                                    }`}
                                                            >
                                                                <Link to={subItem.nav_path}>
                                                                    <LucideListTree size={16} />

                                                                    <Text as="span" fontSize="13px" color="inherit">
                                                                        {subItem.nav_menu_name}
                                                                    </Text>
                                                                </Link>
                                                            </SidebarMenuButton>
                                                        </SidebarMenuItem>
                                                    );
                                                }
                                                )}
                                            </CollapsibleContent>
                                        )}
                                    </Collapsible>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="flex items-end">
                <SidebarTrigger className="cursor-pointer" />
            </SidebarFooter>
        </Sidebar >
    );
}