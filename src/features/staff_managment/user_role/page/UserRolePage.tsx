import { Table } from "@/components/common";
import Header from "@/components/common/Header/Header";
import SubHeader from "@/components/common/SubHeader/SubHeader";
import { Button } from "@/components/ui/button";
import useGetUserRoleList from "../hook/useGetUserRoleList";
import { useNavigate } from "react-router-dom";
import Dropdown from "@/components/common/Dropdown/Dropdown";

const UserRolePage = () => {
    const navigate = useNavigate();

    const { data, isLoading } = useGetUserRoleList();
    const userRoleData = data?.data?.data || [];

    const handleAddUserRole = () => {
        navigate("/user-roles/create");
    };

    const columns = [
        {
            key: "Sr_no",
            name: "No",
            minWidth: "50px",
            flexGrow: "0.2",
            render: (_: any, index: number) => index + 1,
        },
        {
            key: "role_name",
            name: "Role Name",
            minWidth: "150px",
            flexGrow: "0.8",
            render: (row: any) => row.role_name,
        },
        {
            key: "actions",
            name: "Actions",
            minWidth: "100px",
            flexGrow: "0.5",
            render: (row: any) => (
                <Dropdown
                    actions={[
                        {
                            key: "edit",
                            label: "Edit",
                            onClick: () => { navigate(`/setting/user-role/update/${row.role_id}`) }
                        },
                        {
                            key: "delete",
                            label: "Delete",
                            onClick: () => { }
                        }
                    ]}
                />
            ),
        }
    ];

    return (
        <>
            <Header
                currentPage="User Roles"
                mainPage="Staff Management"
            />

            <SubHeader>
                <div></div>
                <Button className="cursor-pointer" onClick={handleAddUserRole}>
                    Add User Role
                </Button>
            </SubHeader>

            <Table
                config={{
                    columns,
                }}
                data={userRoleData}
                isLoading={isLoading}
                emptyMessage="No User Roles Found"
            />
        </>
    );
};

export default UserRolePage;
