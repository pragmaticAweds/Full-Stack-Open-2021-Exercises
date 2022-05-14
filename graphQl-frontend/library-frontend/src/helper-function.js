export const updateCache = (cache, query, addedBook) => {
  const uniquebyName = (arr) => {
    let uniqueObj = new Set();
    console.log({ uniqueObj });
    return arr.filter((item) => {
      let name = item.name;
      console.log({ name });
      return uniqueObj.has(name) ? false : uniqueObj.add(name);
    });
  };
  console.log({ addedBook });
  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniquebyName(allBooks.concat(addedBook)),
    };
  });
};
