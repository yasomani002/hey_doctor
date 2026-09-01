import { Table, Text } from "@/components/common";
import Header from "@/components/common/Header/Header";
import SubHeader from "@/components/common/SubHeader/SubHeader";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CreateEmployeeDialog from "../component/CreateEmployeeDialog";
import useGetEmployeeList from "../hook/useGetEmployeeList";

const EmployeePage = () => {
    const [createEmployeeOpen, setCreateEmployeeOpen] = useState(false);
    const { data, isLoading } = useGetEmployeeList();
    const employeeData = data?.data?.data || [];

    const handleAddEmployee = () => {
        setCreateEmployeeOpen(true);
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
            key: "employee_name",
            name: "Name",
            minWidth: "180px",
            flexGrow: "1",
            render: (row: any) => row.employee_name,
        },
        {
            key: "employee_contact",
            name: "Contact",
            minWidth: "150px",
            flexGrow: "0.5",
            render: (row: any) => <Text fontSize="12px">{row.employee_contact}</Text>,
        },
        {
            key: "employee_email",
            name: "Email",
            minWidth: "200px",
            flexGrow: "0.8",
            render: (row: any) => <Text fontSize="12px">{row.employee_email}</Text>,
        },
        {
            key: "user_name",
            name: "User Name",
            minWidth: "150px",
            flexGrow: "0.5",
            render: (row: any) => <Text fontSize="12px">{row.user_name}</Text>,
        },
        {
            key: "created_at",
            name: "Created At",
            minWidth: "150px",
            flexGrow: "0.5",
            render: (row: any) => row.created_at,
        },
    ];

    return (
        <>
            <Header
                currentPage="Employee"
                mainPage="Staff Management"
            />

            <SubHeader>
                <div></div>
                <Button className="cursor-pointer" onClick={handleAddEmployee}>Add Employee</Button>
            </SubHeader>

            <Table
                config={{
                    columns,
                }}
                data={employeeData}
                isLoading={isLoading}
                emptyMessage="No Employees Found"
            />

            {createEmployeeOpen && (
                <CreateEmployeeDialog
                    open={createEmployeeOpen}
                    onClose={() => setCreateEmployeeOpen(false)}
                />
            )}
        </>
    );
};

export default EmployeePage;