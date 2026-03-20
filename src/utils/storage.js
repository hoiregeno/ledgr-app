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
