// reads and parses data from localStorage
export const getData = (key) => {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : [];
};

// stringifies and saves data to localStorage
export const saveData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// gets existing data, appends new entry, saves it back
export const addEntry = (key, entry) => {
  const existingEntry = getData(key);
  const newEntry = [...existingEntry, entry];

  saveData(key, newEntry);
  return newEntry;
};

// filters out the entry with matching id and saves
export const deleteEntry = (key, id) => {
  const existingEntry = getData(key);
  const newEntry = existingEntry.filter((item) => item.id !== id);

  saveData(key, newEntry);
  return newEntry;
};

export const updateEntry = (key, id, updates) => {
  const existingEntry = getData(key);
  const newEntry = existingEntry.map((item) =>
    item.id === id ? { ...item, ...updates } : item,
  );

  saveData(key, newEntry);
  return newEntry;
};

// converts your data array into a downloadable .csv file that opens in Excel or Google Sheets
export const exportToCSV = (data, filename) => {
  // don't export if table is empty
  if (!data.length) return;

  // grabs column names from the first object's keys
  const headers = Object.keys(data[0]);

  // converts each entry to a comma separated line
  const rows = data.map((item) => Object.values(item).join(","));

  // joins headers and rows into one big string
  const csv = [headers.join(","), ...rows].join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};
