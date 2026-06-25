import { BreadcrumbComponent } from "@/components/BreadcrumbComponent"
import { HeaderContainer, HeaderProfileBox, MenuListBox } from "./HeaderStyle"
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { LogOutIcon, UserIcon } from "lucide-react";
import { logout } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { useNavigate } from "react-router-dom";
import Text from "../Text";
import { colors } from "@/styles/colors";

type Props = {
    currentPage?: string;
    mainPage?: string;
    mainPageLink?: string;
    showHome?: boolean;
    middlePages?: {
        name: string;
        link: string;
        isCurrentPage?: boolean;
    }[];
};
const Header = ({
    currentPage,
    mainPage,
    mainPageLink,
    showHome,
    middlePages
}: Props) => {
    const navigate = useNavigate();
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

    const handleProfileClick = () => {
        navigate("/profile");
    }


    const dispatch = useAppDispatch();
    const userLogout = () => {
        dispatch(logout());

        navigate("/");
    }

    const menuListArray = [
        {
            title: "My Profile",
            icon: <UserIcon className="mr-2" />,
            onClick: handleProfileClick
        },
        {
            title: "Logout",
            icon: <LogOutIcon className="mr-2" />,
            onClick: () => userLogout()
        }
    ]

    return (
        <HeaderContainer>
            <BreadcrumbComponent
                currentPage={currentPage}
                mainPage={mainPage}
                mainPageLink={mainPageLink}
                showHome={showHome}
                middlePages={middlePages}
            />


            <DropdownMenu
                open={profileDropdownOpen}
                onOpenChange={setProfileDropdownOpen}
            >
                <DropdownMenuTrigger asChild className="cursor-pointer">

                    <Avatar className="h-8 w-8">
                        <AvatarFallback className="h-8 w-8 bold bg-primary">
                            <Text fontSize={"14px"} color={colors.text.white}>Ys</Text>
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 rounded-1 p-3" align="end" forceMount>

                    {/* company name */}
                    <HeaderProfileBox>

                        <Avatar className="h-10 w-10">
                            <AvatarFallback className="h-8 w-8 bold bg-primary">
                                <Text fontSize={"16px"} color={colors.text.white}>YS</Text>
                            </AvatarFallback>
                        </Avatar>
                        <div className=" flex flex-col max-w-[80%]">
                            <Text fontWeight="bold" fontSize="14px" truncate={true}>Merchant Name</Text>
                            <Text fontSize="14px" truncate={true}>support@demo.com</Text>
                        </div>

                    </HeaderProfileBox>

                    {/* menu list */}
                    {menuListArray?.map((menu, index) => (
                        <MenuListBox
                            key={index}
                            className="flex items-center cursor-pointer"
                            onClick={menu.onClick}
                        >
                            {menu.icon}
                            <Text>{menu.title}</Text>
                        </MenuListBox>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </HeaderContainer>


    )
}

export default Header