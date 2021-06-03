import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Routes from '../constants/Routes';
import ConfirmMessage from './ConfirmMessage';
import Input from './ReusableComponents/Input';
import Pagination from './Pagination';

import { FirebaseContext } from './services/FirebaseProvider';

import styles from './PostList.module.scss';

const POSTS_PER_PAGE = 5;

const PostList = ({ posts, deletePost }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const [postId, setPostId] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [shouldShowConfirmMessage, setShouldShowConfirmMessage] = useState(false);

  const postsByAuthor = selectedAuthor !== '' ? posts.filter(post => post.author === selectedAuthor) : posts;

  const filteredValues = postsByAuthor.filter(post =>
    post.title.toLowerCase().includes(searchValue.toLowerCase().trim()),
  );

  const visiblePosts = filteredValues.slice(
    currentPage * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE + POSTS_PER_PAGE,
  );

  const totalPages = Math.ceil(filteredValues.length / POSTS_PER_PAGE);

  const closeConfirm = () => setShouldShowConfirmMessage(false);

  const selectNewPage = newPage => {
    setCurrentPage(newPage);
  };

  return (
    <section className={styles.PostsSection}>
      <Input
        value={searchValue}
        onChange={e => {
          setSearchValue(e.target.value);
          setCurrentPage(0);
        }}
        placeholder={'Поиск по заголовку'}
      />
      <select
        value={selectedAuthor}
        onChange={e => {
          setSelectedAuthor(e.target.value);
          setSearchValue('');
          setCurrentPage(0);
        }}
      >
        <option value="">--Пожалуйста выберите Автора--</option>
        <option value="livermon">Livermon</option>
        <option value="board-game-bastard">Board Game Bastard</option>
      </select>

      {visiblePosts.length > 0 ? (
        visiblePosts.map(post => {
          return (
            <article>
              <h3>
                {post.title}
                <FirebaseContext.Consumer>
                  {({ authenticated }) =>
                    authenticated && (
                      <>
                        <Link to={Routes.EDIT_POST.replace(':id', post.id)}>
                          <span className={styles.EditLink}>изменить</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            setPostId(post.id);
                            setShouldShowConfirmMessage(true);
                          }}
                        >
                          удалить
                        </button>
                      </>
                    )
                  }
                </FirebaseContext.Consumer>
              </h3>
              <time dateTime="">---</time>
              <p>{post.content}</p>
            </article>
          );
        })
      ) : (
        <div>Постов не найдено</div>
      )}

      <Pagination totalPages={totalPages} currentPage={currentPage} selectNewPage={selectNewPage} />
      <ConfirmMessage
        show={shouldShowConfirmMessage}
        deletePost={deletePost}
        postId={postId}
        closeConfirm={closeConfirm}
      />
    </section>
  );
};

export default PostList;
