const timeFormatMapper = {
  "HH:mm": "HH:mm",
  "HH:mm:ss": "HH:mm:ss",
  "hh:mm A": "hh:mm",
  "hh:mm:ss A": "hh:mm:ss",
} as { [key: string]: string };

const dateFormatMapper = {
  "dd-MM-yyyy": "DD-MM-YYYY",
  "MM-dd-yyyy": "MM-DD-YYYY",
  "yyyy-MM-dd": "YYYY-MM-DD",
  "dd/MM/yyyy": "DD/MM/YYYY",
  "MM/dd/yyyy": "MM/DD/YYYY",
  "dd.MM.yyyy": "DD.MM.YYYY",
  "MM.dd.yyyy": "MM.DD.YYYY",
  "dd/MM": "DD/MM",
  "MM/dd": "MM/DD",
  "yyyy": "YYYY",
  "MMMM": "MMMM",
  "MMMM d, yyyy": "MMMM D, YYYY",
  "d MMMM, yyyy": "D MMMM, YYYY",
  "MMM d, yyyy": "MMM D, YYYY",
  "d MMM, yyyy": "D MMM, YYYY",
  "MMMM d": "MMMM D",
  "d MMMM": "D MMMM",
  "MMM d": "MMM D",
  "d MMM": "D MMM",
  "MMMM yyyy": "MMMM YYYY",
  "MMM yyyy": "MMM YYYY",
} as { [key: string]: string };

export const formatMapper = (() => {
  const formats = { ...timeFormatMapper, ...dateFormatMapper } as any;
  Object.keys(dateFormatMapper).forEach((dKey) => {
    Object.keys(timeFormatMapper).forEach((tKey) => {
      formats[`${dKey} ${tKey}`] =
        `${dateFormatMapper[dKey]} ${timeFormatMapper[tKey]}`;
    });
  });
  return formats;
})() as { [key: string]: string };


export const systemToLibraryFormat = (format?: string) =>
  (format && formatMapper[format]) || undefined;
