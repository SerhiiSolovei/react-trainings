import React from 'react';

import styles from './CreateForm.module.scss';

class EditForm extends React.Component {

  state = {
    title: '',
    content: ''
  }


  render () {
    const { postId, posts, changePost }  = this.props;

    const idx = posts.findIndex((post) => post.id === postId);

        return (
          <div>
              <h3>Изменение поста</h3>
              <form className={styles.Form}>
                  <label htmlFor="title"  className={styles.InputLabel}>Заголовок</label>
                  <input id="title" value={posts[idx].title} onChange={e => this.setState({title: e.target.value})} placeholder="Введите заголовок..."  className={styles.Input}/>

                  <textarea id="content" value={posts[idx].content} onChange={e => this.setState({content: e.target.value})} placeholder="Новый замечательный пост..."  className={styles.TextArea} />

                  <button type="button">Отменить</button>
                  <button type="button" onClick={() => {
                            changePost({
                            id: postId,
                            title: this.state.title,
                            content: this.state.content,
                            date: new Date().toString(),
                            author: "board-game-bastard"
                            })
                        this.setState({title: "", content: ''})}}>Сохранить</button>
              </form>
          </div>
      )
  }
}

export default EditForm;
