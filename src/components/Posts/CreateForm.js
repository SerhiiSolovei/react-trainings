import React from 'react';
import firebase from 'firebase/app';

import Input from '../ReusableComponents/Input';

import styles from './CreateForm.module.scss';

class CreateForm extends React.Component {
  state = {
    title: '',
    content: '',
  };

  render() {
    const { createPost } = this.props;
    return (
      <div>
        <h3>Создать новый пост</h3>
        <form className={styles.Form}>
          <Input
            label={'Заголовок'}
            id={'title'}
            value={this.state.title}
            onChange={e => this.setState({ title: e.target.value })}
            placeholder={'Введите заголовок...'}
          />
          <textarea
            id="content"
            value={this.state.content}
            onChange={e => this.setState({ content: e.target.value })}
            placeholder="Новый замечательный пост..."
            className={styles.TextArea}
          />

          <button type="button" onClick={() => this.setState({ title: '', content: '' })}>
            Отменить
          </button>
          <button
            type="button"
            onClick={() => {
              const newPost = {
                title: this.state.title,
                content: this.state.content,
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
              this.setState({ title: '', content: '' });
            }}
          >
            Сохранить
          </button>
        </form>
      </div>
    );
  }
}

export default CreateForm;
