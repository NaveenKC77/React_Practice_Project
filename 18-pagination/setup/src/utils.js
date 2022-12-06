const paginate = (data) => {
  const itemsPerPage = 9;
  const numOfPages = Math.ceil(data.length / itemsPerPage);

  const newFollowers = Array.from({ length: numOfPages }, (_, index) => {
    const start = index * itemsPerPage;
    const end = start + itemsPerPage;

    return data.slice(start, end);
  });

  return newFollowers;
};

export default paginate;
