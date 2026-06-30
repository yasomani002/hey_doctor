/**
 * Centralized Color System
 * 
 * This file contains all color definitions used across the application.
 * Import colors from here to maintain consistency and easy theming.
 */


// theme colors
export const theme = {
    sidebarBg: "#265368",        // dark teal — sidebar background
    outerBg: "#b8d4e8",          // light powder blue — outer wrapper background
    primary: "#ffffff",          // linear gradient start (unused currently)
    secondary: "#2D6CDF",
    themeBg: "#ffffff",      // accent / button blue

    main: "#f5f7fa",             // off-white — main content area
    buttonPrimary: "#1e3a4a",
    buttonPrimaryHover: "#152d3a",
    borderLight: "rgba(255,255,255,0.12)",
};

export const text = {
    sidebarBg: "#265368",
    primary: "#333333",
    secondary: "#4B4949",
    white: "#ffffff",
    disabled: "#808080",
    black: "#2f3642",
    label: "#767b83",
    success: "#279212",
    rejected: "#FF0000",
    pending: "#FF8000",
    registered: "#095CD9",
    link: "#1a73e8",
};

export const table = {
    border: "#e5e7eb",
    background: "#ffffff",
    hover: "#e2e9f2",
    header: "#265368",
}

export const statusColors = {
    success: "#22c55e",
    rejected: "#FF00004F",
    pending: "#FF80004F",
    registered: "#095CD91A",
}

// Export all colors as a single object for easy access
export const colors = {
    theme,
    text,
    table,
    statusColors
} as const;

// Type export for TypeScript
export type ColorPalette = typeof colors;

