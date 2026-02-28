export const SUPPORTED_LOCALES = ["en", "ko", "vi"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const isSupportedLocale = (value: string | null | undefined): value is Locale => {
  if (!value) return false;
  return SUPPORTED_LOCALES.includes(value as Locale);
};

export const normalizeLocale = (value: string | null | undefined): Locale => {
  if (!value) return "en";
  const normalized = value.toLowerCase().split("-")[0];
  return isSupportedLocale(normalized) ? normalized : "en";
};
