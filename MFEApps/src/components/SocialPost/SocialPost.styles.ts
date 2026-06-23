import { SxProps } from "@mui/material";
import { IPostType } from "./SocialPostConstants";

// The post is rendered at this size in the DOM and exported at 2x (1080 x 1080).
export const CARD_SIZE = 540;

// Adobe-inspired type system: a single refined, modern sans (Inter) — close in
// spirit to Adobe Clean / Spectrum — with light weights and tight tracking.
export const fontSans =
  '"Inter", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

/* ------------------------------------------------------------------ */
/* Layout (MUI)                                                         */
/* ------------------------------------------------------------------ */

export const pageStackStyles: SxProps = {
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: "32px",
  padding: "16px",
};

export const formColumnStyles: SxProps = {
  width: "100%",
  maxWidth: 440,
};

export const formTitleStyles: SxProps = {
  fontFamily: fontSans,
  fontWeight: 600,
  fontSize: "1.6rem",
  lineHeight: 1.2,
  letterSpacing: "-0.02em",
  color: "#15212b",
  marginBottom: "6px",
};

export const formSubtitleStyles: SxProps = {
  fontFamily: fontSans,
  fontSize: "0.95rem",
  fontWeight: 400,
  lineHeight: 1.5,
  color: "text.secondary",
  marginBottom: "18px",
};

export const fieldStyles: SxProps = {
  width: "100%",
  margin: "8px 0px",
};

export const checkboxStyles: SxProps = {
  margin: "4px 0px",
};

export const uploadRowStyles: SxProps = {
  alignItems: "center",
  gap: "12px",
  margin: "10px 0px",
};

export const uploadButtonStyles: SxProps = {
  textTransform: "none",
};

export const actionButtonStyles: SxProps = {
  marginTop: "12px",
  textTransform: "none",
  fontWeight: 600,
};

export const previewColumnStyles: SxProps = {
  width: "100%",
  maxWidth: CARD_SIZE,
  alignItems: "center",
  gap: "12px",
};

export const previewScrollStyles: SxProps = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  overflowX: "auto",
};

export const previewHintStyles: SxProps = {
  color: "text.secondary",
  textAlign: "center",
};

/* ------------------------------------------------------------------ */
/* Post card (plain CSS so html-to-image captures it deterministically) */
/* ------------------------------------------------------------------ */

export const cardStyles = (type: IPostType): React.CSSProperties => ({
  position: "relative",
  width: CARD_SIZE,
  height: CARD_SIZE,
  flex: "0 0 auto",
  boxSizing: "border-box",
  background: "#ffffff",
  border: `1px solid ${type.accent}26`,
  overflow: "hidden",
  fontFamily: fontSans,
  color: "#1f2933",
  boxShadow: "0 16px 40px rgba(15,23,42,0.16)",
  display: "flex",
  flexDirection: "column",
});

export const cornerTopStyles = (type: IPostType): React.CSSProperties => ({
  position: "absolute",
  top: 84,
  right: -54,
  width: 150,
  height: 150,
  borderRadius: "50%",
  background: `${type.accent}0f`,
  pointerEvents: "none",
});

export const cornerBottomStyles = (type: IPostType): React.CSSProperties => ({
  position: "absolute",
  bottom: 72,
  left: -58,
  width: 140,
  height: 140,
  borderRadius: "50%",
  background: `${type.accent}0d`,
  pointerEvents: "none",
});

export const headerStyles = (type: IPostType, dual = false): React.CSSProperties => ({
  position: "relative",
  overflow: "hidden",
  flexShrink: 0,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: dual ? 14 : 16,
  padding: dual ? "26px 22px" : "20px 26px",
  background: `linear-gradient(125deg, ${type.headerFrom} 0%, ${type.headerTo} 100%)`,
  color: "#ffffff",
  boxShadow: "inset 0 -1px 0 rgba(0,0,0,0.08)",
});

export const headerWatermarkStyles: React.CSSProperties = {
  position: "absolute",
  top: -40,
  right: -34,
  width: 140,
  height: 140,
  borderRadius: "50%",
  border: "18px solid rgba(255,255,255,0.12)",
  pointerEvents: "none",
  zIndex: 0,
};

export const headerTextWrapStyles: React.CSSProperties = {
  position: "relative",
  zIndex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
};

export const logoStyles: React.CSSProperties = {
  position: "relative",
  zIndex: 1,
  width: 66,
  height: 66,
  borderRadius: "50%",
  background: "#ffffff",
  objectFit: "contain",
  // Extra padding inscribes the full square emblem (rim text + laurel) inside
  // the circular badge so nothing gets clipped.
  padding: 9,
  boxSizing: "border-box",
  border: "2px solid rgba(255,255,255,0.75)",
  boxShadow: "0 4px 12px rgba(0,0,0,0.20)",
  flex: "0 0 auto",
};

export const orgNameStyles: React.CSSProperties = {
  fontFamily: fontSans,
  fontSize: 20,
  fontWeight: 700,
  lineHeight: 1.1,
  letterSpacing: -0.3,
  whiteSpace: "nowrap",
  textShadow: "0 1px 2px rgba(0,0,0,0.14)",
};

export const orgSubStyles: React.CSSProperties = {
  fontFamily: fontSans,
  fontSize: 20,
  fontWeight: 700,
};

// Title stack styling for dual logo
export const dualTitleAreaStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  flex: 1,
  minWidth: 0,
};

export const dualTitlePrimaryStyles: React.CSSProperties = {
  fontFamily: fontSans,
  fontSize: 17,
  fontWeight: 700,
  lineHeight: 1.1,
  letterSpacing: "-0.2px",
  whiteSpace: "nowrap",
  textShadow: "0 1px 2px rgba(0,0,0,0.14)",
};

export const dualTitleAmpersandStyles: React.CSSProperties = {
  fontFamily: fontSans,
  fontSize: 13,
  fontWeight: 500,
  opacity: 0.85,
  margin: "3px 0",
};

export const dualTitleSecondaryStyles: React.CSSProperties = {
  fontFamily: fontSans,
  fontSize: 17,
  fontWeight: 600,
  lineHeight: 1.1,
  letterSpacing: "-0.2px",
  whiteSpace: "nowrap",
  color: "#e0f2f1",
  textShadow: "0 1px 2px rgba(0,0,0,0.14)",
};

export const logoDualStyles: React.CSSProperties = {
  ...logoStyles,
  width: 52,
  height: 52,
  padding: 6,
  boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
};

export const headerAccentStyles = (type: IPostType): React.CSSProperties => ({
  height: 4,
  width: "100%",
  background: `linear-gradient(90deg, ${type.accentDark} 0%, ${type.accent} 50%, ${type.accentDark} 100%)`,
});

export const bodyStyles: React.CSSProperties = {
  position: "relative",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px 30px 6px",
  textAlign: "center",
};

export const badgeStyles = (type: IPostType): React.CSSProperties => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 9,
  padding: "9px 24px",
  borderRadius: 999,
  background: `${type.accent}12`,
  border: `1px solid ${type.accent}2e`,
  color: type.accentDark,
  fontFamily: fontSans,
  fontSize: 20,
  fontWeight: 600,
  letterSpacing: -0.2,
  boxShadow: `0 2px 8px ${type.accent}1f`,
  marginBottom: 18,
});

export const photoStyles = (type: IPostType, size = 152): React.CSSProperties => ({
  width: size,
  height: size,
  borderRadius: "50%",
  objectFit: "cover",
  border: "4px solid #ffffff",
  boxShadow: `0 0 0 5px ${type.accent}, 0 12px 26px rgba(0,0,0,0.22)`,
  marginBottom: 20,
  background: "#eceff1",
});

export const photoPlaceholderStyles = (type: IPostType, size = 152): React.CSSProperties => ({
  ...photoStyles(type, size),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: size <= 120 ? 42 : 52,
  fontWeight: 700,
  color: type.accentDark,
  background: `${type.accent}1a`,
});

export const nameStyles: React.CSSProperties = {
  fontFamily: fontSans,
  fontSize: 30,
  fontWeight: 600,
  lineHeight: 1.14,
  letterSpacing: -0.4,
  margin: "2px 0 0",
};

export const nameUnderlineStyles = (type: IPostType): React.CSSProperties => ({
  width: 56,
  height: 3,
  borderRadius: 999,
  background: type.accent,
  margin: "11px auto 7px",
});

export const subtitleStyles = (type: IPostType): React.CSSProperties => ({
  fontFamily: fontSans,
  fontSize: 16,
  fontWeight: 500,
  letterSpacing: 0,
  color: type.accent,
  margin: "2px 0 4px",
});

export const batchStyles: React.CSSProperties = {
  fontFamily: fontSans,
  fontSize: 13,
  fontWeight: 600,
  color: "#64757f",
  letterSpacing: 1.4,
  textTransform: "uppercase",
  marginBottom: 10,
};

export const messageStyles: React.CSSProperties = {
  fontFamily: fontSans,
  fontSize: 15,
  fontWeight: 400,
  lineHeight: 1.6,
  letterSpacing: 0,
  color: "#4a5963",
  maxWidth: 424,
  margin: "4px auto 0",
};

export const footerStyles = (type: IPostType): React.CSSProperties => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 8,
  padding: "13px 26px",
  background: `linear-gradient(125deg, ${type.headerFrom}, ${type.headerTo})`,
  color: "#ffffff",
  fontFamily: fontSans,
  fontSize: 12,
  fontWeight: 500,
  letterSpacing: 0.2,
  boxShadow: "inset 0 2px 0 rgba(255,255,255,0.18)",
});

export const footerNoteStyles: React.CSSProperties = {
  fontFamily: fontSans,
  fontStyle: "italic",
  fontWeight: 400,
  fontSize: 13,
  letterSpacing: 0,
  opacity: 0.95,
  maxWidth: 300,
  textAlign: "right",
};
