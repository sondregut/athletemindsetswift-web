// Chase Sapphire Reserve Theme Colors
// Matching the iOS app's Theme.swift

export const colors = {
  light: {
    // Background gradients
    backgroundTop: "#e8e3d8",
    backgroundMiddle: "#d9d0c2",
    backgroundBottom: "#ccc5b8",

    // Glass card colors
    glassOverlayPrimary: "rgba(255, 255, 255, 0.6)",
    glassOverlaySecondary: "rgba(255, 255, 255, 0.3)",
    glassBorderPrimary: "rgba(217, 208, 194, 0.5)",
    glassBorderSecondary: "rgba(255, 255, 255, 0.2)",

    // Text colors
    primaryText: "#072f57",
    secondaryText: "rgba(7, 47, 87, 0.6)",
    iconColor: "rgba(7, 47, 87, 0.8)",

    // Accent colors
    accentNavy: "#072f57",
    accentBlue: "#072f57",
    accentCyan: "#0a3d6f",
    accentGreen: "#43aa32",
    accentOrange: "#d9d0c2",
    accentRed: "#cc4d4d",

    // Button colors
    buttonBackground: "#072f57",
    buttonText: "#ffffff",
  },
  dark: {
    // Background gradients
    backgroundTop: "#0d0d0d",
    backgroundMiddle: "#1f1f1f",
    backgroundBottom: "#141414",

    // Glass card colors
    glassOverlayPrimary: "rgba(255, 255, 255, 0.12)",
    glassOverlaySecondary: "rgba(255, 255, 255, 0.04)",
    glassBorderPrimary: "rgba(255, 255, 255, 0.25)",
    glassBorderSecondary: "rgba(255, 255, 255, 0.08)",

    // Text colors
    primaryText: "#ffffff",
    secondaryText: "rgba(255, 255, 255, 0.65)",
    iconColor: "rgba(255, 255, 255, 0.85)",

    // Accent colors
    accentNavy: "#5c8db8",
    accentBlue: "#5c8db8",
    accentCyan: "#73a6d1",
    accentGreen: "#43aa32",
    accentOrange: "#d9d0c2",
    accentRed: "#f26666",

    // Button colors
    buttonBackground: "#5c8db8",
    buttonText: "#ffffff",
  },
} as const;

export type ThemeColors = typeof colors.light;
