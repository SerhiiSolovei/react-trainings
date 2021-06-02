import React from 'react';
import { Link } from 'react-router-dom';

import * as Routes from '../constants/Routes';
import styles from './Pagination.module.scss';

const Pagination = ({ totalPages, currentPageNumber }) => {
  let i = 1;
  const pagesArr = [];
  while (i <= totalPages) {
    pagesArr.push(i);
    i++;
  }
  return (
    <div className={styles.Pagination}>
      <Link to={Routes.CURRENT_PAGE.replace(':id', currentPageNumber > 1 ? currentPageNumber - 1 : currentPageNumber)}>
        &laquo;
      </Link>
      {pagesArr.map(num => {
        return (
          <Link to={Routes.CURRENT_PAGE.replace(':id', num)} className={num === currentPageNumber && styles.Active}>
            {num}
          </Link>
        );
      })}
      <Link
        to={Routes.CURRENT_PAGE.replace(
          ':id',
          currentPageNumber < totalPages ? currentPageNumber + 1 : currentPageNumber,
        )}
      >
        &raquo;
      </Link>
    </div>
  );
};

export default Pagination;
