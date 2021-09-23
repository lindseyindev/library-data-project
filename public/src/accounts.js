/*-findAccountById Returns the account object that has the matching ID.*/
const findAccountById = (accounts, id) => {
  return accounts.find((account) => account.id === id);
}

/*sortAccountsByLastName Returns a sorted array of the provided account objects. The objects are sorted alphabetically by last name.*/
function sortAccountsByLastName(accounts) {
  return accounts.sort((objectA, objectB) =>
    objectA.name.last > objectB.name.last ? 1 : -1
  );
}

/*getTotalNumberOfBorrows Returns a number that represents the number of times the account's ID appears in any book's `borrows` array.*/
function getTotalNumberOfBorrows(account, books) {
  return books
    .map((booksObject) => {
      return booksObject.borrows.filter((borrowsObject) => {
        return borrowsObject.id == account.id;
      }).length;
    })
    .reduce((total, arrItem) => {
      return total + arrItem;
    });
}
/*getBooksPossessedByAccount Returns all of the books taken out by an account with the author embedded */
function getBooksPossessedByAccount(account, books, authors) {
  return books
    .map((book) => {
      if (
        book.borrows.filter((borrowsObj) => {
          return borrowsObj.id == account.id && borrowsObj.returned === false;
        }).length > 0
      ) {
        book.author = authors.filter((idCheck) => {
          return book.authorId === idCheck.id;
        })[0];
        return book;
      } else {
        return {};
      }
    })
    .filter((value) => Object.keys(value).length !== 0);
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
