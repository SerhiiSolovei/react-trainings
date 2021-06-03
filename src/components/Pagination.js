import React from 'react';

import styles from './Pagination.module.scss';

const Pagination = ({ totalPages, currentPage, selectNewPage }) => {
  let i = 1;
  const pagesArr = [];
  while (i <= totalPages) {
    pagesArr.push(i);
    i++;
  }

  return (
    <div className={styles.Pagination}>
      <span
        onClick={() => {
          const newPage = currentPage >= 1 ? currentPage - 1 : currentPage;

          selectNewPage(newPage);
        }}
      >
        &laquo;
      </span>
      {pagesArr.map(num => {
        return (
          <span className={num - 1 === currentPage && styles.Active} onClick={() => selectNewPage(num - 1)}>
            {num}
          </span>
        );
      })}
      <span
        onClick={() => {
          const newPage = currentPage < totalPages - 1 ? currentPage + 1 : currentPage;
          selectNewPage(newPage);
        }}
      >
        &raquo;
      </span>
    </div>
  );
};

export default Pagination;
