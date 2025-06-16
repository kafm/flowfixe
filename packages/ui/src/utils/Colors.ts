export const colorLabels = [
  "primary",
  "danger",
  "muted",
  "warning",
  "success",
  "dark",
  "light",
];

export const getColor = (color?: string): string | undefined =>
  color && colorLabels.includes(color) ? `var(--ff-bg-${color})` : color;
