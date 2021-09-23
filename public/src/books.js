/*findAuthorById => Returns the author object that has the matching ID.*/

function findAuthorById(authors, id) {
  return authors.find((authorObj) => authorObj.id === id);
}

/*findBookById => Returns the book object that has the matching ID.*/

function findBookById(books, bookId) {
  return books.find((bookObj) => bookObj.id === bookId);
}

/*partitionBooksByBorrowedStatus(books) Returns an array with two arrays: borrowed books and returned books*/
function partitionBooksByBorrowedStatus(books) {
  let borrowed = [];
  let returned = [];
  books.forEach((bookObj) => {
    if (bookObj.borrows[0].returned === false) {
      borrowed.push(bookObj);
    } else {
      returned.push(bookObj);
    }
  });
  return [borrowed, returned];
}

/*getBorrowersForBook Returns an array for a book of all borrowers with their information and return status; limits to 10 results*/

function getBorrowersForBook(book, accounts) {
  let final = [];
  book.borrows.filter((result) => {
    accounts.filter((borrower) => {
      if (borrower.id === result.id) {
        final.push({ ...result, ...borrower });
      }
    });
  });
  return final.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
