const dateFormatter = new Intl.DateTimeFormat("en-US");
export const formatDate = (dateString: string): string => {
  if (!dateString) return "";
  const timestamp = Date.parse(dateString.toString());
  if(isNaN(timestamp)) return "";
  return dateFormatter.format(timestamp);
}