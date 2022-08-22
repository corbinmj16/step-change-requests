export const formatDate = (date) => {
  if (!date) return '';

  return new Date(date).toLocaleDateString('en-us',{ weekday:"long", year:"numeric", month:"short", day:"numeric"});
}