export const accentsRemover = (text: string | null) => {
  if (!text) return "";

  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

// function that checks whether an item text (name or company) matches the query
export const textMatchesQuery = (
  itemText: string,
  queryText: string | null
) => {
  if (queryText === null) return true;
  const lowercaseItem = accentsRemover(itemText);
  return lowercaseItem.includes(queryText);
};
