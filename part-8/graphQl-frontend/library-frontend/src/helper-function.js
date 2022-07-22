export const updateCache = (cache, queryType, addedBook) => {
  const uniquebyName = (arr) => {
    let uniqueObj = new Set();
    return arr.filter((item) => {
      let id = item.id;
      return uniqueObj.has(id) ? false : uniqueObj.add(id);
    });
  };
  cache.updateQuery({ query: queryType }, ({ allBooks }) => {
    return {
      allBooks: uniquebyName(allBooks.concat(addedBook)),
    };
  });
};
