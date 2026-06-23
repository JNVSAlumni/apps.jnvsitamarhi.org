export interface IPostType {
  value: string;
  label: string;
  emoji: string;
  heading: string;
  accent: string;
  accentDark: string;
  headerFrom: string;
  headerTo: string;
  footerNote: string;
  defaultMessage: string;
}

export const PostTypes: IPostType[] = [
  {
    value: "congratulations",
    label: "Congratulations",
    emoji: "🎉",
    heading: "Congratulations",
    accent: "#8e24aa",
    accentDark: "#5b1380",
    headerFrom: "#5b1380",
    headerTo: "#ab47bc",
    footerNote: "A proud moment for the Navodaya family",
    defaultMessage:
      "Heartiest congratulations on your remarkable success!🎉 Your hard work and dedication make the entire Navodaya\u00A0family immensely proud.",
  },
  {
    value: "condolences",
    label: "Condolences",
    emoji: "🕊️",
    heading: "In Loving Memory",
    accent: "#455a64",
    accentDark: "#263238",
    headerFrom: "#263238",
    headerTo: "#546e7a",
    footerNote: "Gone from our sight, never from our hearts",
    defaultMessage:
      "Our deepest condolences on this irreplaceable loss.🕯️ May the departed soul rest in peace and the family find strength and comfort.🙏",
  },
  {
    value: "achievement",
    label: "Achievement / Selection",
    emoji: "🏆",
    heading: "Outstanding Achievement",
    accent: "#1565c0",
    accentDark: "#0d3c75",
    headerFrom: "#0d3c75",
    headerTo: "#2196f3",
    footerNote: "Bringing laurels to JNV Sitamarhi",
    defaultMessage:
      "Heartiest congratulations on your milestone achievement!🏆 Your brilliant success brings laurels and inspires Navodayans.🌟",
  },
  {
    value: "welcome",
    label: "Welcome",
    emoji: "🤝",
    heading: "Welcome",
    accent: "#00897b",
    accentDark: "#00564d",
    headerFrom: "#00564d",
    headerTo: "#26a69a",
    footerNote: "Once a Navodayan, always a Navodayan",
    defaultMessage:
      "A warm welcome to the JNV Sitamarhi Alumni Association!🤝 We are delighted to have you join our global network and grow together.🌱",
  },
  {
    value: "birthday",
    label: "Birthday Wishes",
    emoji: "🎂",
    heading: "Happy Birthday",
    accent: "#d81b60",
    accentDark: "#a00037",
    headerFrom: "#a00037",
    headerTo: "#ec407a",
    footerNote: "Wishing you health, happiness and success",
    defaultMessage:
      "Happy Birthday!🎂 Wishing you a wonderful day filled with joy, and a year ahead packed with excellent health, happiness, and success!✨",
  },
  {
    value: "wedding",
    label: "Wedding Wishes",
    emoji: "💍",
    heading: "Happy Wedding",
    accent: "#c2185b",
    accentDark: "#8c0032",
    headerFrom: "#8c0032",
    headerTo: "#f06292",
    footerNote: "Best wishes for a blissful married life",
    defaultMessage:
      "Warmest congratulations on your wedding!💍 Wishing you both a lifetime of shared laughter, companion, and endless love together!🥂",
  },
  {
    value: "anniversary",
    label: "Anniversary",
    emoji: "🎊",
    heading: "Happy Anniversary",
    accent: "#6a1b9a",
    accentDark: "#4a148c",
    headerFrom: "#4a148c",
    headerTo: "#ab47bc",
    footerNote: "Celebrating togetherness",
    defaultMessage:
      "Happy Wedding Anniversary!🎊 Celebrating your beautiful bond of togetherness. May your love and partnership grow stronger each year!💝",
  },
  {
    value: "announcement",
    label: "Announcement / Event",
    emoji: "📢",
    heading: "Announcement",
    accent: "#3949ab",
    accentDark: "#1a237e",
    headerFrom: "#1a237e",
    headerTo: "#5c6bc0",
    footerNote: "Stay connected with JNV Sitamarhi Alumni",
    defaultMessage:
      "JNV Sitamarhi Alumni Association is pleased to share this important update.📢 Please review the details below and mark your calendars!🗓️",
  },
  {
    value: "appreciation",
    label: "Appreciation / Thank You",
    emoji: "🙏",
    heading: "Heartfelt Appreciation",
    accent: "#ef6c00",
    accentDark: "#b53d00",
    headerFrom: "#b53d00",
    headerTo: "#ffa726",
    footerNote: "With gratitude from the Alumni family",
    defaultMessage:
      "Our deepest gratitude for your invaluable support!🙏 Your dedication helps build a stronger and more vibrant Navodaya Alumni community.💐",
  },
  {
    value: "farewell",
    label: "Farewell",
    emoji: "👋",
    heading: "Farewell & Best Wishes",
    accent: "#5d4037",
    accentDark: "#3e2723",
    headerFrom: "#3e2723",
    headerTo: "#8d6e63",
    footerNote: "Wishing you the very best ahead",
    defaultMessage:
      "As you embark on a new chapter, we bid you a warm farewell.👋 Wishing you immense success, health, and happiness in your next journey!🚀",
  },
  {
    value: "getwellsoon",
    label: "Get Well Soon",
    emoji: "🌻",
    heading: "Get Well Soon",
    accent: "#2e7d32",
    accentDark: "#1b5e20",
    headerFrom: "#1b5e20",
    headerTo: "#66bb6a",
    footerNote: "Praying for your speedy recovery",
    defaultMessage:
      "The entire Navodaya Family is praying for your speedy recovery.🌻 Rest up, take good care, and bounce back stronger — we are with you!💪",
  },
];

export const DefaultPostTypeValue = PostTypes[0].value;

export const getPostType = (value: string): IPostType =>
  PostTypes.find((type) => type.value === value) ?? PostTypes[0];

// Sample content used to pre-fill the form so the preview looks complete on load.
export const SampleDefaults = {
  name: "Name of the Person",
  subtitle: "Selected as IAS — UPSC CSE 2024",
  batch: "Batch of 2001",
};
