import { BreadcrumbComponent } from "@/components/BreadcrumbComponent"
import { HeaderContainer } from "./headerStyle"
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { User } from "lucide-react";
import { Title } from "@radix-ui/react-toast";

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
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

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
                        <AvatarFallback className="h-8 w-8 text-white bold bg-primary">
                            YS
                        </AvatarFallback>
                    </Avatar>

                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-64 rounded-1 p-3" align="end" forceMount>
                    <Title className="cursor-pointer hover:text-primary" onClick={() => { }}>
                        Admin
                    </Title>
                    <a href={`mailto:supportEmail`} className="text-sm text-gray-500 hover:text-primary cursor-pointer"  >
                        test@gmail.com
                    </a>

                    <div className="flex items-center w-full justify-between">
                        <div
                            className="flex items-center cursor-pointer"
                            onClick={() => { }}
                        >
                            <User size={20} color="gray" className="mr-2" />
                            <span>My Profile</span>
                        </div>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </HeaderContainer>


    )
}

export default Header