export const formatDate = date => {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit"
  });

  const newdate = new Date(date);
  return formatter.format(newdate);
};

// Horrible, because the current Django backend is wrong-headed about dates.

export const exportDate = date => {
  return new Date(date).toISOString().substring(0, 10);
};
