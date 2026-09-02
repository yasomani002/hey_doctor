import type { Permission, SubMenu } from "@/store/slices/authSlice";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { MainMenuDropDownBox, MainMenuDropDownButton, SubMenuHeader } from "../UserRolePageStyles";
import ErrorPage from "@/components/common/Error/ErrorPage";
import { Text } from "@/components/common";

interface CreateUserRoleTableProps {
    initialPermissions: Permission[];
    availablePermissions?: Permission[];
    onPermissionsChange: (permissions: Permission[]) => void;
}

const CreateUserRoleTable = ({
    initialPermissions = [],
    availablePermissions = [],
    onPermissionsChange,
}: CreateUserRoleTableProps) => {
    const [expandedMenuIds, setExpandedMenuIds] = useState<Set<string>>(new Set());

    // Internal checked state initialized from initialPermissions
    const [currentCheckedPermissions, setCurrentCheckedPermissions] = useState<Permission[]>(initialPermissions);

    // Sync with parent when initialPermissions reference changes
    useEffect(() => {
        setCurrentCheckedPermissions(initialPermissions);
    }, [initialPermissions]);

    const menuList = useMemo(() =>
        (availablePermissions || []).filter(
            (menu) => menu.is_visible && menu.level === 1
        ),
        [availablePermissions]
    );

    const toggleMenu = (menuId: string) => {
        setExpandedMenuIds((prev) => {
            const updated = new Set(prev);
            if (updated.has(menuId)) {
                updated.delete(menuId);
            } else {
                updated.add(menuId);
            }
            return updated;
        });
    };

    const actionsMeta = [
        { id: "select-all", label: "Select All", actionId: null },
        { id: "view", label: "View", actionId: 1 },
        { id: "create", label: "Create", actionId: 2 },
        { id: "update", label: "Update", actionId: 3 },
        { id: "delete", label: "Delete", actionId: 4 },
        { id: "sync", label: "Sync", actionId: 5 },
        { id: "product_publish", label: "Product Publish", actionId: 6 },
        { id: "product_unpublish", label: "Product Unpublish", actionId: 7 },
        { id: "product_price_update", label: "Product Price Update", actionId: 8 },
    ] as const;

    const collectDescendantSubMenuIds = (
        subs: SubMenu[],
        rootId: string
    ): Set<string> => {
        const ids = new Set<string>([rootId]);
        const queue = [rootId];
        while (queue.length) {
            const id = queue.shift()!;
            for (const s of subs) {
                if (s.parent_id === id && !ids.has(s.nav_sub_menu_id)) {
                    ids.add(s.nav_sub_menu_id);
                    queue.push(s.nav_sub_menu_id);
                }
            }
        }
        return ids;
    };

    const handleActionChange = (
        menuId: string,
        subMenuId: string | null,
        action: number,
        isChecked: boolean
    ) => {
        const updated = currentCheckedPermissions.map((menu) => {
            if (menu.nav_menu_id === menuId) {
                if (subMenuId === null) {
                    // Unchecking View clears every permission on this menu and all sub-menus
                    if (action === 1 && !isChecked) {
                        return {
                            ...menu,
                            actions: [],
                            sub_menu: menu.sub_menu.map((sub: SubMenu) => ({
                                ...sub,
                                actions: [],
                            })),
                        };
                    }

                    let updatedActions = isChecked
                        ? [...new Set([...menu.actions, action])]
                        : menu.actions.filter((a: number) => a !== action);

                    if (
                        isChecked &&
                        [2, 3, 4].includes(action) &&
                        !updatedActions.includes(1)
                    ) {
                        updatedActions.push(1);
                    }

                    return { ...menu, actions: updatedActions };
                } else {
                    let newSubMenus: SubMenu[] = [];

                    if (action === 1 && !isChecked) {
                        const toClear = collectDescendantSubMenuIds(
                            menu.sub_menu,
                            subMenuId
                        );
                        newSubMenus = menu.sub_menu.map((sub: SubMenu) =>
                            toClear.has(sub.nav_sub_menu_id)
                                ? { ...sub, actions: [] }
                                : sub
                        );
                    } else {
                        newSubMenus = menu.sub_menu.map((sub: SubMenu) => {
                            if (sub.nav_sub_menu_id === subMenuId) {
                                const updatedSubActions = isChecked
                                    ? [...new Set([...sub.actions, action])]
                                    : sub.actions.filter((a: number) => a !== action);

                                if (
                                    isChecked &&
                                    [2, 3, 4].includes(action) &&
                                    !updatedSubActions.includes(1)
                                ) {
                                    updatedSubActions.push(1);
                                }
                                return { ...sub, actions: updatedSubActions };
                            }
                            return sub;
                        });
                    }

                    // Bubble up View permissions to parents generically
                    let currentTargetId = subMenuId;
                    while (currentTargetId) {
                        const currentTarget = newSubMenus.find(s => s.nav_sub_menu_id === currentTargetId);
                        if (!currentTarget) break;

                        const parentId = currentTarget.parent_id;
                        if (!parentId || parentId === menuId) break;

                        const parentSub = newSubMenus.find(s => s.nav_sub_menu_id === parentId);
                        if (!parentSub) break;

                        const childrenOfParent = newSubMenus.filter(s => s.parent_id === parentId);
                        const hasAnyChildWithActions = childrenOfParent.some(c => c.actions.length > 0);
                        const parentHasCrud = parentSub.actions.some(a => [2, 3, 4].includes(a));

                        newSubMenus = newSubMenus.map(s => {
                            if (s.nav_sub_menu_id === parentId) {
                                let pActions = [...s.actions];
                                if (hasAnyChildWithActions && !pActions.includes(1)) {
                                    pActions.push(1);
                                }
                                if (!hasAnyChildWithActions && !parentHasCrud && pActions.includes(1)) {
                                    pActions = pActions.filter(a => a !== 1);
                                }
                                return { ...s, actions: pActions };
                            }
                            return s;
                        });

                        currentTargetId = parentId;
                    }

                    let updatedParentActions = [...menu.actions];

                    // Auto-select parent 'View' if any sub-menu now has actions and parent 'View' is not already checked
                    const hasAnySubMenuView = newSubMenus.some((sub: SubMenu) =>
                        sub.actions.includes(1)
                    );
                    if (hasAnySubMenuView && !updatedParentActions.includes(1)) {
                        updatedParentActions.push(1);
                    }

                    const hasAnySubMenuActionsAfterUpdate = newSubMenus.some(
                        (sub: SubMenu) => sub.actions.length > 0
                    );
                    const hasParentCrudActions = updatedParentActions.some(
                        (a: number) => [2, 3, 4].includes(a)
                    );

                    if (
                        !hasAnySubMenuActionsAfterUpdate &&
                        !hasParentCrudActions &&
                        updatedParentActions.includes(1)
                    ) {
                        updatedParentActions = updatedParentActions.filter(
                            (a) => a !== 1
                        );
                    }
                    return {
                        ...menu,
                        actions: updatedParentActions,
                        sub_menu: newSubMenus,
                    };
                }
            }
            return menu;
        });

        setCurrentCheckedPermissions(updated);
        onPermissionsChange(updated);
    };

    // handle select all
    const handleSelectAll = (
        menuId: string,
        subMenuId: string | null,
        isChecked: boolean
    ) => {
        const updated = currentCheckedPermissions.map((menu) => {
            if (menu.nav_menu_id === menuId) {
                if (subMenuId === null) {
                    const availableActions =
                        availablePermissions.find((m) => m.nav_menu_id === menuId)?.actions ||
                        [];
                    const newActions = isChecked ? [...availableActions] : [];

                    if (!isChecked && availableActions.includes(1)) {
                        const hasSelectedSubMenuActions = menu.sub_menu.some(
                            (sub) => sub.actions.length > 0
                        );
                        const hasCrudActions = menu.actions.some((a) =>
                            [2, 3, 4].includes(a)
                        );

                        if (hasSelectedSubMenuActions || hasCrudActions) {
                            if (!newActions.includes(1)) {
                                newActions.push(1);
                            }
                        }
                    }
                    return { ...menu, actions: newActions };
                } else {
                    const availableActions =
                        availablePermissions
                            .find((m) => m.nav_menu_id === menuId)
                            ?.sub_menu.find((s) => s.nav_sub_menu_id === subMenuId)?.actions ||
                        [];
                    let newSubMenus = menu.sub_menu.map((sub) => {
                        if (sub.nav_sub_menu_id === subMenuId) {
                            const newSubActions = isChecked ? [...availableActions] : [];
                            return { ...sub, actions: newSubActions };
                        }
                        return sub;
                    });

                    // Bubble up View permissions to parents generically
                    let currentTargetId = subMenuId;
                    while (currentTargetId) {
                        const currentTarget = newSubMenus.find(s => s.nav_sub_menu_id === currentTargetId);
                        if (!currentTarget) break;

                        const parentId = currentTarget.parent_id;
                        if (!parentId || parentId === menuId) break;

                        const parentSub = newSubMenus.find(s => s.nav_sub_menu_id === parentId);
                        if (!parentSub) break;

                        const childrenOfParent = newSubMenus.filter(s => s.parent_id === parentId);
                        const hasAnyChildWithActions = childrenOfParent.some(c => c.actions.length > 0);
                        const parentHasCrud = parentSub.actions.some(a => [2, 3, 4].includes(a));

                        newSubMenus = newSubMenus.map(s => {
                            if (s.nav_sub_menu_id === parentId) {
                                let pActions = [...s.actions];
                                if (hasAnyChildWithActions && !pActions.includes(1)) {
                                    pActions.push(1);
                                }
                                if (!hasAnyChildWithActions && !parentHasCrud && pActions.includes(1)) {
                                    pActions = pActions.filter(a => a !== 1);
                                }
                                return { ...s, actions: pActions };
                            }
                            return s;
                        });

                        currentTargetId = parentId;
                    }

                    let updatedParentActions = [...menu.actions];
                    const hasAnySubMenuView = newSubMenus.some((sub: SubMenu) =>
                        sub.actions.includes(1)
                    );
                    if (hasAnySubMenuView && !updatedParentActions.includes(1)) {
                        updatedParentActions.push(1);
                    }

                    const hasAnySubMenuActionsAfterUpdate = newSubMenus.some(
                        (sub) => sub.actions.length > 0
                    );
                    const hasParentCrudActions = updatedParentActions.some((a) =>
                        [2, 3, 4].includes(a)
                    );

                    if (
                        !hasAnySubMenuActionsAfterUpdate &&
                        !hasParentCrudActions &&
                        updatedParentActions.includes(1)
                    ) {
                        updatedParentActions = updatedParentActions.filter(
                            (a) => a !== 1
                        );
                    }

                    return {
                        ...menu,
                        actions: updatedParentActions,
                        sub_menu: newSubMenus,
                    };
                }
            }
            return menu;
        });

        setCurrentCheckedPermissions(updated);
        onPermissionsChange(updated);
    };

    const isActionChecked = (menuId: string, subMenuId: string | null, actionId: number | null) => {
        const currentMenu = currentCheckedPermissions.find((menu) => menu.nav_menu_id === menuId);
        if (!currentMenu) {
            return false;
        }

        if (subMenuId === null) {
            if (actionId === null) {
                // Select All: check if all available actions are selected
                const availableActions = availablePermissions.find((m) => m.nav_menu_id === menuId)?.actions || [];
                return availableActions.length > 0 && availableActions.every((a) => currentMenu.actions.includes(a));
            }
            return currentMenu.actions.includes(actionId);
        }

        const currentSubMenu = currentMenu?.sub_menu.find((sub) => sub.nav_sub_menu_id === subMenuId);
        if (!currentSubMenu) {
            return false;
        }
        if (actionId === null) {
            // Select All for sub-menu
            const availableSubActions = availablePermissions
                .find((m) => m.nav_menu_id === menuId)
                ?.sub_menu.find((s) => s.nav_sub_menu_id === subMenuId)?.actions || [];
            return availableSubActions.length > 0 && availableSubActions.every((a) => currentSubMenu.actions.includes(a));
        }
        return currentSubMenu.actions.includes(actionId);
    };

    const handleCheckboxChange = (
        menuId: string,
        subMenuId: string | null,
        actionId: number | null,
        checked: boolean
    ) => {
        if (actionId === null) {
            handleSelectAll(menuId, subMenuId, checked);
        } else {
            handleActionChange(menuId, subMenuId, actionId, checked);
        }
    };

    const isLoading = false;
    const isError = false;
    const error = null;

    return (
        <ErrorPage isError={isError} error={error} isLoading={isLoading}>
            <div className="space-y-2 overflow-x-auto w-full">
                {menuList.map((menu) => {
                    const isOpen = expandedMenuIds.has(menu.nav_menu_id);
                    const visibleActionsMeta = actionsMeta.filter(
                        (action) => action.actionId === null || menu.actions.includes(action.actionId)
                    );
                    const visibleSubMenus = (() => {
                        const sorted: SubMenu[] = [];
                        const subMenuMap = new Map<string, SubMenu[]>();
                        const topLevelSubMenus: SubMenu[] = [];

                        // Group by parent
                        menu.sub_menu.forEach((sub: SubMenu) => {
                            if (!sub.parent_id || sub.parent_id === menu.nav_menu_id) {
                                topLevelSubMenus.push(sub);
                            } else {
                                if (!subMenuMap.has(sub.parent_id)) {
                                    subMenuMap.set(sub.parent_id, []);
                                }
                                subMenuMap.get(sub.parent_id)!.push(sub);
                            }
                        });

                        // DFS to flatten so children appear directly under their parents
                        const dfs = (subMenus: SubMenu[]) => {
                            subMenus.forEach((sub) => {
                                sorted.push(sub);
                                if (subMenuMap.has(sub.nav_sub_menu_id)) {
                                    dfs(subMenuMap.get(sub.nav_sub_menu_id)!);
                                }
                            });
                        };

                        dfs(topLevelSubMenus);

                        // Fallback for any orphans just in case
                        menu.sub_menu.forEach((sub: SubMenu) => {
                            if (!sorted.includes(sub)) {
                                sorted.push(sub);
                            }
                        });

                        return sorted;
                    })();

                    return (
                        <MainMenuDropDownBox key={menu.nav_menu_id}>
                            <MainMenuDropDownButton type="button" onClick={() => toggleMenu(menu.nav_menu_id)}>
                                <Text fontSize="14px" fontWeight={600}>
                                    {menu.nav_menu_name}
                                </Text>
                                {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </MainMenuDropDownButton>

                            {isOpen && (
                                <div className="border-t border-[#e5e7eb]">
                                    <div className="overflow-x-auto w-full">
                                        <SubMenuHeader columnCount={visibleActionsMeta.length}>
                                            <Text fontSize="14px" fontWeight={600}>
                                                Menu
                                            </Text>

                                            {visibleActionsMeta.map((action) => (
                                                <Text
                                                    fontSize="14px"
                                                    fontWeight={600}
                                                    className="text-center"
                                                    key={action.id}
                                                >
                                                    {action.label}
                                                </Text>
                                            ))}
                                        </SubMenuHeader>

                                        {/* Single Menu (no sub-menus) */}
                                        {visibleSubMenus.length === 0 && (
                                            <SubMenuHeader columnCount={visibleActionsMeta.length}>
                                                <Text fontSize="14px">{menu.nav_menu_name}</Text>
                                                {visibleActionsMeta.map((action) => {
                                                    const currentChecked = isActionChecked(
                                                        menu.nav_menu_id,
                                                        null,
                                                        action.actionId
                                                    );
                                                    return (
                                                        <div key={action.id} className="flex items-center justify-center">
                                                            <Checkbox
                                                                checked={currentChecked}
                                                                onCheckedChange={(checked) =>
                                                                    handleCheckboxChange(
                                                                        menu.nav_menu_id,
                                                                        null,
                                                                        action.actionId,
                                                                        !!checked
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    );
                                                })}
                                            </SubMenuHeader>
                                        )}

                                        {/* Menu with Multiple Sub Menus */}
                                        {visibleSubMenus.map((subMenu) => (
                                            <SubMenuHeader
                                                columnCount={visibleActionsMeta.length}
                                                key={subMenu.nav_sub_menu_id}
                                            >
                                                <div style={{ paddingLeft: `${Math.max(0, (subMenu.level - 2) * 16)}px` }}>
                                                    <Text fontSize="14px">
                                                        {subMenu.level > 2 ? "•  " : ""}
                                                        {subMenu.nav_sub_menu_name}
                                                    </Text>
                                                </div>

                                                {visibleActionsMeta.map((action) => {
                                                    const availableSubMenu = availablePermissions
                                                        .find((m) => m.nav_menu_id === menu.nav_menu_id)
                                                        ?.sub_menu.find((s) => s.nav_sub_menu_id === subMenu.nav_sub_menu_id);
                                                    const isActionAvailable =
                                                        action.actionId === null ||
                                                        (availableSubMenu?.actions.includes(action.actionId) ?? false);

                                                    if (!isActionAvailable) {
                                                        return (
                                                            <div key={action.id} className="flex items-center justify-center">
                                                                <Checkbox
                                                                    disabled
                                                                    checked={false}
                                                                    className="bg-gray-300 border-gray-400 opacity-100"
                                                                />
                                                            </div>
                                                        );
                                                    }
                                                    const currentChecked = isActionChecked(
                                                        menu.nav_menu_id,
                                                        subMenu.nav_sub_menu_id,
                                                        action.actionId
                                                    );
                                                    return (
                                                        <div key={action.id} className="flex items-center justify-center">
                                                            <Checkbox
                                                                checked={currentChecked}
                                                                onCheckedChange={(checked) =>
                                                                    handleCheckboxChange(
                                                                        menu.nav_menu_id,
                                                                        subMenu.nav_sub_menu_id,
                                                                        action.actionId,
                                                                        !!checked
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    );
                                                })}
                                            </SubMenuHeader>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </MainMenuDropDownBox>
                    );
                })}
            </div>
        </ErrorPage>
    );
};

export default CreateUserRoleTable;