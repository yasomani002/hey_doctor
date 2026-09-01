import Header from "@/components/common/Header/Header";
import SubHeader from "@/components/common/SubHeader/SubHeader";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CreateEmployeeDialog from "../component/CreateEmployeeDialog";

const EmployeePage = () => {
    const [createEmployeeOpen, setCreateEmployeeOpen] = useState(false);

    const handleAddEmployee = () => {
        setCreateEmployeeOpen(true);
    };

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