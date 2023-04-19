export const required = (value: string, attributeName: string) =>
  value ? true : `You must enter a ${attributeName}`;
