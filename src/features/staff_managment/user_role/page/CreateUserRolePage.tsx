import Header from "@/components/common/Header/Header"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import type { Permission } from "@/store/slices/authSlice";
import CreateUserRoleTable from "../component/CreateUserRoleTable";
import { Button } from "@/components/ui/button";
import SubHeader from "@/components/common/SubHeader/SubHeader";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const CreateUserRolePage = () => {
    const { roleId } = useParams<{ roleId: string }>();
    const isEditMode = !!roleId;
    const permissionsKey = roleId ?? "create";
    const [roleName, setRoleName] = useState<string>("");
    const [roleNameError, setRoleNameError] = useState<string | null>(null);
    const navigate = useNavigate();

    const availablePermissions = useSelector((state: RootState) => state.auth.user?.permissions) || [];
    const memoizedPermissionsFromDetails = useMemo(() => {
        // Create mode: Initialize with availablePermissions but with empty actions
        return (availablePermissions || []).map((menu) => ({
            ...menu,
            actions: [], // No actions checked by default in create mode
            sub_menu: (menu.sub_menu || []).map((sub) => ({
                ...sub,
                actions: [], // No actions checked by default for sub-menus in create mode
            })),
        }));
    }, [isEditMode, availablePermissions]);

    const [permissions, setPermissions] = useState<Permission[]>(memoizedPermissionsFromDetails);

    useEffect(() => {
        setPermissions(memoizedPermissionsFromDetails);
    }, [memoizedPermissionsFromDetails]);
    const handleCancel = () => {
        navigate("/user-roles");
    };
    const handleSave = async () => {

    };

    return (
        <>
            <Header
                currentPage="User Roles"
                mainPage="Staff Management"
            />
            <SubHeader>
                <div className="flex items-center gap-2">
                    <label className="filter-label pl-[1.5px] w-[130px]">Role Name</label>
                    <Input
                        placeholder="Role Name"
                        value={roleName}
                        onChange={(e) => {
                            setRoleName(e.target.value);
                            if (e.target.value.trim() !== "") {
                                setRoleNameError(null);
                            }
                        }}
                        className="max-w-sm"
                    />
                    {roleNameError && (
                        <p className="text-red-500 text-sm mt-1">{roleNameError}</p>
                    )}
                </div>
                <div className="flex justify-end gap-2">
                    <Button onClick={handleCancel} className="max-w-[120px]" size="sm">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        className="max-w-[120px]"
                        size="sm"
                    >
                        {isEditMode ? "Save Changes" : "Save Role"}
                    </Button>
                </div>
            </SubHeader>
            <CreateUserRoleTable
                key={permissionsKey}
                initialPermissions={permissions}
                availablePermissions={availablePermissions}
                onPermissionsChange={setPermissions}
            />
        </>
    )
}

export default CreateUserRolePage