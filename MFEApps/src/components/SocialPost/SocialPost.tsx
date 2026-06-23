import * as React from "react";
import { Alert, Button, Checkbox, FormControlLabel, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import DownloadIcon from "@mui/icons-material/Download";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { toPng } from "html-to-image";
import { Config } from "../../config";
import {
  DefaultPostTypeValue,
  getPostType,
  PostTypes,
  SampleDefaults,
} from "./SocialPostConstants";
import {
  actionButtonStyles,
  badgeStyles,
  batchStyles,
  bodyStyles,
  cardStyles,
  checkboxStyles,
  cornerBottomStyles,
  cornerTopStyles,
  dualTitleAmpersandStyles,
  dualTitlePrimaryStyles,
  dualTitleSecondaryStyles,
  dualTitleAreaStyles,
  fieldStyles,
  footerNoteStyles,
  footerStyles,
  formColumnStyles,
  formSubtitleStyles,
  formTitleStyles,
  headerAccentStyles,
  headerStyles,
  headerTextWrapStyles,
  headerWatermarkStyles,
  logoDualStyles,
  logoStyles,
  messageStyles,
  nameStyles,
  nameUnderlineStyles,
  orgNameStyles,
  orgSubStyles,
  pageStackStyles,
  photoPlaceholderStyles,
  photoStyles,
  previewColumnStyles,
  previewHintStyles,
  previewScrollStyles,
  subtitleStyles,
  uploadButtonStyles,
  uploadRowStyles,
} from "./SocialPost.styles";

const MAX_PHOTO_BYTES = 5 * 1024 * 1024; // 5 MB

const getInitials = (value: string): string => {
  const parts = value.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return "★";
  }
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

const readFileAsDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Unable to read the selected file."));
    reader.readAsDataURL(file);
  });

const fetchImageAsDataUrl = async (url: string): Promise<string> => {
  const response = await fetch(url, { mode: "cors" });
  if (!response.ok) {
    throw new Error("Failed to load logo: " + response.status);
  }
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read logo."));
    reader.readAsDataURL(blob);
  });
};

const slugify = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "post";

const FONT_LINK_ID = "jnvs-social-fonts";
const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap";

const socialPostTheme = createTheme({
  palette: {
    primary: { main: "#1473e6" },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
});

const ensureFontsLoaded = async (): Promise<void> => {
  if (!("fonts" in document)) {
    return;
  }
  try {
    await Promise.all([
      document.fonts.load('400 15px "Inter"'),
      document.fonts.load('500 16px "Inter"'),
      document.fonts.load('600 30px "Inter"'),
      document.fonts.load('700 27px "Inter"'),
    ]);
    await document.fonts.ready;
  } catch {
    // Ignore — the export will fall back to system fonts.
  }
};

export const SocialPost = () => {
  const postRef = React.useRef<HTMLDivElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [postTypeValue, setPostTypeValue] = React.useState<string>(DefaultPostTypeValue);
  const [heading, setHeading] = React.useState<string>(getPostType(DefaultPostTypeValue).heading);
  const [name, setName] = React.useState<string>(SampleDefaults.name);
  const [subtitle, setSubtitle] = React.useState<string>(SampleDefaults.subtitle);
  const [batch, setBatch] = React.useState<string>(SampleDefaults.batch);
  const [message, setMessage] = React.useState<string>(getPostType(DefaultPostTypeValue).defaultMessage);
  const [headingEdited, setHeadingEdited] = React.useState<boolean>(false);
  const [messageEdited, setMessageEdited] = React.useState<boolean>(false);
  const [photoDataUrl, setPhotoDataUrl] = React.useState<string>("");
  const [logoDataUrl, setLogoDataUrl] = React.useState<string>(Config.SocialPostLogo);
  const [bnpLogoDataUrl, setBnpLogoDataUrl] = React.useState<string>(Config.BNPLogo);
  const [includeBnp, setIncludeBnp] = React.useState<boolean>(false);
  const [isExporting, setIsExporting] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  const postType = getPostType(postTypeValue);

  React.useEffect(() => {
    let active = true;
    fetchImageAsDataUrl(Config.SocialPostLogo)
      .then((dataUrl) => {
        if (active) {
          setLogoDataUrl(dataUrl);
        }
      })
      .catch(() => {
        if (active) {
          setLogoDataUrl(Config.SocialPostLogo);
        }
      });
    fetchImageAsDataUrl(Config.BNPLogo)
      .then((dataUrl) => {
        if (active) {
          setBnpLogoDataUrl(dataUrl);
        }
      })
      .catch(() => {
        if (active) {
          setBnpLogoDataUrl(Config.BNPLogo);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  React.useEffect(() => {
    if (document.getElementById(FONT_LINK_ID)) {
      return;
    }
    const preconnectApi = document.createElement("link");
    preconnectApi.rel = "preconnect";
    preconnectApi.href = "https://fonts.googleapis.com";
    const preconnectStatic = document.createElement("link");
    preconnectStatic.rel = "preconnect";
    preconnectStatic.href = "https://fonts.gstatic.com";
    preconnectStatic.crossOrigin = "anonymous";
    const stylesheet = document.createElement("link");
    stylesheet.id = FONT_LINK_ID;
    stylesheet.rel = "stylesheet";
    stylesheet.href = FONT_HREF;
    document.head.appendChild(preconnectApi);
    document.head.appendChild(preconnectStatic);
    document.head.appendChild(stylesheet);
  }, []);

  const handlePostTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextType = getPostType(event.target.value);
    setPostTypeValue(event.target.value);
    if (!headingEdited) {
      setHeading(nextType.heading);
    }
    if (!messageEdited) {
      setMessage(nextType.defaultMessage);
    }
  };

  const handlePhotoSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select a valid image file.");
      return;
    }
    if (file.size > MAX_PHOTO_BYTES) {
      setErrorMessage("Please select an image smaller than 5 MB.");
      return;
    }
    try {
      const dataUrl = await readFileAsDataUrl(file);
      setPhotoDataUrl(dataUrl);
      setErrorMessage("");
    } catch {
      setErrorMessage("Unable to read the selected image. Please try another file.");
    }
  };

  const handleRemovePhoto = () => {
    setPhotoDataUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleExport = async () => {
    if (!postRef.current) {
      return;
    }
    setIsExporting(true);
    setErrorMessage("");
    await ensureFontsLoaded();
    try {
      const dataUrl = await toPng(postRef.current, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: "#ffffff",
      });
      const link = document.createElement("a");
      link.download = `jnvs-${postType.value}-${slugify(name)}.png`;
      link.href = dataUrl;
      link.click();
    } catch {
      setErrorMessage(
        "Could not generate the image. If you uploaded a photo, please try again or use a different image."
      );
    } finally {
      setIsExporting(false);
    }
  };

  const displayHeading = heading.trim() || postType.heading;
  const displayName = name.trim() || "Full Name";
  const displayMessage = message.trim() || postType.defaultMessage;

  return (
    <ThemeProvider theme={socialPostTheme}>
      <Stack direction="row" sx={pageStackStyles}>
      {/* ---------------- Form ---------------- */}
      <Stack direction="column" sx={formColumnStyles}>
        <Typography variant="h5" sx={formTitleStyles}>
          Social Media Post Generator
        </Typography>
        <Typography variant="body2" sx={formSubtitleStyles}>
          Fill the details, preview live, and download a ready-to-share PNG.
        </Typography>

        <TextField
          select
          sx={fieldStyles}
          variant="standard"
          label="Post Type"
          value={postTypeValue}
          helperText="Choose the kind of post you want to create"
          onChange={handlePostTypeChange}
        >
          {PostTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.emoji} {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          sx={fieldStyles}
          variant="standard"
          label="Heading"
          value={heading}
          placeholder={postType.heading}
          helperText="Banner text shown on the post (leave blank for default)"
          onChange={(event) => {
            setHeading(event.target.value);
            setHeadingEdited(true);
          }}
        />

        <TextField
          required
          sx={fieldStyles}
          variant="standard"
          label="Person / Title Name"
          value={name}
          helperText="Name of the person the post is about"
          onChange={(event) => setName(event.target.value)}
        />

        <TextField
          sx={fieldStyles}
          variant="standard"
          label="Batch / Year"
          value={batch}
          helperText="e.g. Batch of 2008 (AISSE 2008)"
          onChange={(event) => setBatch(event.target.value)}
        />

        <TextField
          sx={fieldStyles}
          variant="standard"
          label="Subtitle"
          value={subtitle}
          helperText="e.g. Selected as IAS — UPSC CSE 2024"
          onChange={(event) => setSubtitle(event.target.value)}
        />

        <TextField
          multiline
          minRows={3}
          sx={fieldStyles}
          variant="standard"
          label="Message"
          value={message}
          placeholder={postType.defaultMessage}
          helperText="Main message (leave blank to use a suggested message)"
          onChange={(event) => {
            setMessage(event.target.value);
            setMessageEdited(true);
          }}
        />

        <FormControlLabel
          sx={checkboxStyles}
          control={
            <Checkbox
              checked={includeBnp}
              onChange={(event) => setIncludeBnp(event.target.checked)}
              color="primary"
            />
          }
          label="Include Bihar Navodaya Pariwar (BNP)"
        />

        <Stack direction="row" sx={uploadRowStyles}>
          <Button
            variant="outlined"
            startIcon={<PhotoCameraIcon />}
            sx={uploadButtonStyles}
            onClick={() => fileInputRef.current?.click()}
          >
            {photoDataUrl ? "Change Photo" : "Upload Photo"}
          </Button>
          {photoDataUrl && (
            <Button
              color="error"
              variant="text"
              startIcon={<DeleteOutlineIcon />}
              sx={uploadButtonStyles}
              onClick={handleRemovePhoto}
            >
              Remove
            </Button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handlePhotoSelect}
          />
        </Stack>

        <Button
          variant="contained"
          size="large"
          startIcon={<DownloadIcon />}
          sx={actionButtonStyles}
          disabled={isExporting}
          onClick={handleExport}
        >
          {isExporting ? "Generating…" : "Download PNG"}
        </Button>

        {errorMessage && (
          <Alert severity="error" sx={{ marginTop: "12px" }}>
            {errorMessage}
          </Alert>
        )}
      </Stack>

      {/* ---------------- Preview ---------------- */}
      <Stack direction="column" sx={previewColumnStyles}>
        <Typography variant="body2" sx={previewHintStyles}>
          Live preview (exports at 1080 × 1080)
        </Typography>
        <Stack sx={previewScrollStyles}>
          <div ref={postRef} style={cardStyles(postType)}>
            <div style={cornerTopStyles(postType)} />
            <div style={cornerBottomStyles(postType)} />

            <div style={headerStyles(postType, includeBnp)}>
              <div style={headerWatermarkStyles} />
              {includeBnp ? (
                <>
                  <img
                    src={logoDataUrl}
                    alt="JNV Sitamarhi logo"
                    crossOrigin="anonymous"
                    style={logoDualStyles}
                  />
                  <div style={dualTitleAreaStyles}>
                    <div style={dualTitlePrimaryStyles}>JNV Sitamarhi Alumni Association</div>
                    <div style={dualTitleAmpersandStyles}>&amp;</div>
                    <div style={dualTitleSecondaryStyles}>Bihar Navodaya Pariwar</div>
                  </div>
                  <img
                    src={bnpLogoDataUrl}
                    alt="Bihar Navodaya Pariwar logo"
                    crossOrigin="anonymous"
                    style={logoDualStyles}
                  />
                </>
              ) : (
                <>
                  <img
                    src={logoDataUrl}
                    alt="JNV Sitamarhi logo"
                    crossOrigin="anonymous"
                    style={logoStyles}
                  />
                  <div style={headerTextWrapStyles}>
                    <div style={orgNameStyles}>
                      JNV Sitamarhi <span style={orgSubStyles}>Alumni Association</span>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div style={headerAccentStyles(postType)} />

            <div style={bodyStyles}>
              <div style={badgeStyles(postType)}>
                <span>{postType.emoji}</span>
                <span>{displayHeading}</span>
              </div>

              {photoDataUrl ? (
                <img src={photoDataUrl} alt={displayName} style={photoStyles(postType, includeBnp ? 120 : 152)} />
              ) : (
                <div style={photoPlaceholderStyles(postType, includeBnp ? 120 : 152)}>{getInitials(name)}</div>
              )}

              <div style={nameStyles}>{displayName}</div>
              {batch.trim() && <div style={batchStyles}>{batch.trim()}</div>}
              <div style={nameUnderlineStyles(postType)} />
              {subtitle.trim() && <div style={subtitleStyles(postType)}>{subtitle.trim()}</div>}
              <div style={messageStyles}>{displayMessage}</div>
            </div>

            <div style={footerStyles(postType)}>
              <span>{Config.SocialPostWebsite}</span>
              <span style={footerNoteStyles}>{postType.footerNote}</span>
            </div>
          </div>
        </Stack>
      </Stack>
      </Stack>
    </ThemeProvider>
  );
};
