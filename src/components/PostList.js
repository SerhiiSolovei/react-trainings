import React from 'react';
import { Link } from 'react-router-dom';
import * as Routes from '../constants/Routes';
import ConfirmMessage from './ConfirmMessage';

import styles from './PostList.module.scss';

class PostList extends React.Component {
  state = {
    searchValue: '',
    selectedAuthor: '',
    showConfirmMessage: false,
    postId: null,
  };

  showConfirm = () => {
    this.setState(prevState => ({
      ...prevState,
      showConfirmMessage: true,
    }));
  };

  closeConfirm = () => {
    this.setState(prevState => ({
      ...prevState,
      showConfirmMessage: false,
    }));
  };
  render() {
    const { posts, deletePost } = this.props;

    const postsByAuthor =
      this.state.selectedAuthor !== '' ? posts.filter(post => post.author === this.state.selectedAuthor) : posts;
    const filteredValues = postsByAuthor.filter(post =>
      post.title.toLowerCase().includes(this.state.searchValue.toLowerCase().trim()),
    );

    return (
      <section className={styles.PostsSection}>
        <input value={this.state.searchValue} onChange={e => this.setState({ searchValue: e.target.value })} />
        <select
          value={this.state.selectedAuthor}
          onChange={e => this.setState({ selectedAuthor: e.target.value, searchValue: '' })}
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
                  <Link to={Routes.EDIT_POST.replace(':id', post.id)}>
                    <span className={styles.EditLink}>изменить</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      // deletePost(post.id);
                      this.setState(prevState => ({
                        ...prevState,
                        postId: post.id,
                      }));
                      this.showConfirm();
                    }}
                  >
                    удалить
                  </button>
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
          show={this.state.showConfirmMessage}
          deletePost={deletePost}
          postId={this.state.postId}
          closeConfirm={this.closeConfirm}
        />
      </section>
    );
  }
}

export default PostList;
