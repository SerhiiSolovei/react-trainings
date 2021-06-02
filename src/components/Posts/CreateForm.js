import React, { useState } from 'react';

import firebase from 'firebase/app';

import * as Routes from '../../constants/Routes';

import Input from '../ReusableComponents/Input';

import styles from './CreateForm.module.scss';

const CreateForm = ({ createPost, history }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <div>
      <h3>Создать новый пост</h3>
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

        <button
          type="button"
          onClick={() => {
            setTitle('');
            setContent('');
            history.push(Routes.MAIN);
          }}
        >
          Отменить
        </button>
        <button
          type="button"
          onClick={() => {
            if (title !== '' && content !== '') {
              const newPost = {
                title: title,
                content: content,
                author: Math.random() > 0.5 ? 'livermon' : 'board-game-bastard',
                date: new Date().toString(),
              };
              firebase
                .firestore()
                .collection('posts')
                .add(newPost)
                .then(docRef => {
                  createPost({
                    id: docRef.id,
                    ...newPost,
                  });
                });
              setTitle('');
              setContent('');
            }
            history.push(Routes.MAIN);
          }}
        >
          Сохранить
        </button>
      </form>
    </div>
  );
};

export default CreateForm;
