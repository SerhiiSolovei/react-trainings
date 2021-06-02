import React, { useState } from 'react';
import * as Routes from '../../constants/Routes';

import Input from '../ReusableComponents/Input';

import styles from './CreateForm.module.scss';

const EditForm = props => {
  const { postId, changePost, history, deletePost, posts } = props;
  const post = posts.find(post => post.id === postId);

  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');

  return (
    <div>
      <h3>Изменение поста</h3>
      <form className={styles.Form}>
        <Input
          label={'Заголовок'}
          id={'title'}
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder={'Введите заголовок...'}
        />
        <textarea
          id="content"
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Новый замечательный пост..."
          className={styles.TextArea}
        />
        <button type="button" onClick={() => history.push(Routes.MAIN)}>
          Отменить
        </button>
        <button
          type="button"
          onClick={() => {
            changePost({
              id: postId,
              title: title,
              content: content,
              date: new Date().toString(),
              author: 'board-game-bastard',
            });
            setTitle('');
            setContent('');
            history.push(Routes.MAIN);
          }}
        >
          Сохранить
        </button>
        <button
          type="button"
          onClick={() => {
            deletePost(postId);
            history.push(Routes.MAIN);
          }}
        >
          Удалить
        </button>
      </form>
    </div>
  );
};

export default EditForm;
