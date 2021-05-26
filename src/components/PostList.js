import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Routes from '../constants/Routes';
import ConfirmMessage from './ConfirmMessage';
import Input from './ReusableComponents/Input';

import { FirebaseContext } from './services/FirebaseProvider';

import styles from './PostList.module.scss';

const PostList = ({ posts, deletePost }) => {
  const [postId, setPostId] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [shouldShowConfirmMessage, setShouldShowConfirmMessage] = useState(false);

  const postsByAuthor = selectedAuthor !== '' ? posts.filter(post => post.author === selectedAuthor) : posts;
  const filteredValues = postsByAuthor.filter(post =>
    post.title.toLowerCase().includes(searchValue.toLowerCase().trim()),
  );

  const closeConfirm = () => setShouldShowConfirmMessage(false);

  return (
    <section className={styles.PostsSection}>
      <Input value={searchValue} onChange={e => setSearchValue(e.target.value)} placeholder={'Поиск по заголовку'} />
      <select
        value={selectedAuthor}
        onChange={e => {
          setSelectedAuthor(e.target.value);
          setSearchValue('');
        }}
      >
        <option value="">--Пожалуйста выберите Автора--</option>
        <option value="livermon">Livermon</option>
        <option value="board-game-bastard">Board Game Bastard</option>
      </select>

      {filteredValues.length > 0 ? (
        filteredValues.map(post => {
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
