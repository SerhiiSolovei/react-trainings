import React from 'react';
import * as Routes from '../../constants/Routes';

import Input from '../ReusableComponents/Input';

import styles from './CreateForm.module.scss';

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    const { postId, posts } = this.props;
    const post = posts.find(post => post.id === postId);

    this.state = {
      title: post?.title || '',
      content: post?.content || '',
    };
  }

  render() {
    const { postId, changePost, history, deletePost } = this.props;

    return (
      <div>
        <h3>Изменение поста</h3>
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
          <button type="button" onClick={() => history.push(Routes.MAIN)}>
            Отменить
          </button>
          <button
            type="button"
            onClick={() => {
              changePost({
                id: postId,
                title: this.state.title,
                content: this.state.content,
                date: new Date().toString(),
                author: 'board-game-bastard',
              });
              this.setState({ title: '', content: '' });
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
  }
}

export default EditForm;
