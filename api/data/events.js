function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

function formatDate(date) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join("-");
}

module.exports = () => {
  const data = [];

  for (let i = 1; i < 3; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i + 2);
    data.push({
      id: i,
      title: `event-${i}`,
      start: formatDate(date),
      type: "class_event",
      backgroundColor: "olive",
      borderColor: "olive",
    });
  }
  return data;
};
