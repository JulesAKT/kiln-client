export const formatDate = (date) => {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  const newdate = new Date(date);
  return formatter.format(newdate);
};

// Horrible, because the current Django backend is wrong-headed about dates.

export const exportDate = (date) => {
  return new Date(date).toISOString().substring(0, 10);
};

export const prettyTimeSince = (dateString) => {
  if (!dateString) {
    return "Unknown";
  }
  const secondsAgo = (Date.now() - new Date(dateString).getTime()) / 1000;
  if (secondsAgo < 5) return "just now";
  if (secondsAgo < 60) return `${Math.floor(secondsAgo)} secs ago`;
  return `${Math.floor(secondsAgo / 60)} mins ago`;
};
