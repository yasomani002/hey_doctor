import React from "react";
import { TabContainer, TabItem } from "./TabStyle";

export interface TabOption {
    id: string;
    label: string | React.ReactNode;
    icon?: React.ReactNode;
}

export interface TabProps {
    tabs: TabOption[];
    activeTab: string;
    onChange: (tabId: string) => void;
    className?: string;
}

export const Tab: React.FC<TabProps> = ({
    tabs,
    activeTab,
    onChange,
    className,
}) => {
    return (
        <TabContainer className={className}>
            {tabs.map((tab) => (
                <TabItem
                    key={tab.id}
                    $isActive={tab.id === activeTab}
                    onClick={() => onChange(tab.id)}
                >
                    <span className="flex items-center gap-1.5">
                        {tab.icon}
                        {tab.label}
                    </span>
                </TabItem>
            ))}
        </TabContainer>
    );
};

export default Tab;
