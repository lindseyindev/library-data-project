//getTotalBooksCount: Returns the total number of books in the array
function getTotalBooksCount(books) {
  return books.length;
}

//getTotalAccountsCount Returns the total number of accounts in the array
function getTotalAccountsCount(accounts) {
  return accounts.length;
}

/*getBooksBorrowedCount Returns the total number of books that are currently borrowed */
function getBooksBorrowedCount(books) {
  let final = [];
  books.forEach((book) => {
    final.push(book.borrows.filter((bookObj) => bookObj.returned === false));
  });
  return final.filter((arr) => arr.length > 0).length;
}

//helperFunction to limit results to 5
function limitResults(results) {
  return results.slice(0, 5);
}

/*getMostCommonGenres Returns an ordered list of most common genres with sorting by the amount of books a genre is represented in the library; limits to top 5 results*/
function getMostCommonGenres(books) {
  let genres = [];
  for (book of books) {
    let genreFinder = genres.find((item) => item.name === book.genre);
    if (genreFinder) {
      genreFinder.count += 1;
    } else {
      genres.push({ name: book.genre, count: 1 });
    }
  }
  let sorted = genres.sort((genreA, genreB) =>
    genreA.count < genreB.count ? 1 : -1
  );
  return limitResults(sorted);
}

/*getMostPopularBooks Returns an ordered list of most popular books with sorting by the amount of times books have been borrowed; limits to top 5 results*/
function getMostPopularBooks(books) {
  const sorted = books.sort((bookObjA, bookObjB) =>
    bookObjA.borrows.length < bookObjB.borrows.length ? 1 : -1
  );
  let final = sorted.map((bookObj) => {
    return {
      name: bookObj.title,
      count: bookObj.borrows.length,
    };
  });

  return limitResults(final);
}

/*getMostPopularAuthors Returns an ordered list of most popular authors with sorting by the amount of times their book(s) have been borrowed; limits to top 5 results*/
function getMostPopularAuthors(books, authors) {
  let authorsAndBorrowed = [];
  for (let author of authors) {
    let counter = 0;
    for (let book of books) {
      if (author.id === book.authorId) {
        counter += book.borrows.length;
        authorsAndBorrowed.push({
          name: `${author.name.first} ${author.name.last}`,
          count: counter,
        });
      }
    }
  }
  let sorted = authorsAndBorrowed.sort((authorA, authorB) =>
    authorA.count < authorB.count ? 1 : -1
  );
  return limitResults(sorted);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
