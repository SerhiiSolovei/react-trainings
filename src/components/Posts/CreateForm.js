import React from 'react';

import styles from './CreateForm.module.scss';

class CreateForm extends React.Component {

    state = {
        title: '',
        content: ''
    }

    render () {
        const { createPost } = this.props
        return (
            <div>
                <h3>Создать новый пост</h3>
                <form className={styles.Form}>
                    <label htmlFor="title"  className={styles.InputLabel}>Заголовок</label>
                    <input id="title" value={this.state.title} onChange={e => this.setState({title: e.target.value})} placeholder="Введите заголовок..."  className={styles.Input}/>

                    <textarea id="content" value={this.state.content} onChange={e => this.setState({content: e.target.value})} placeholder="Новый замечательный пост..."  className={styles.TextArea} />

                    <button type="button" onClick={() => this.setState({title: "", content: ''})}>Отменить</button>
                    <button type="button" onClick={() => {
                            createPost({
                            id: Math.floor(Math.random()*1000 + 3).toString(),
                            title: this.state.title,
                            content: this.state.content,
                            date: new Date().toString(),
                            author: "board-game-bastard"
                            })
                        this.setState({title: "", content: ''})
                        }
                    }>Сохранить</button>
                </form>
            </div>
        )
    }
}

export default CreateForm
