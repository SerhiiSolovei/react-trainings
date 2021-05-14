import styles from './ConfirmMessage.module.scss';

const ConfirmMessage = ({ show, deletePost, postId, closeConfirm }) => {
  return (
    show && (
      <div className={styles.ConfirmBlock}>
        Ты точно хочешь удалить этот замечательный пост?
        <div className={styles.Buttons}>
          <button
            type="button"
            onClick={() => {
              deletePost(postId);
              closeConfirm();
            }}
          >
            Да, точно
          </button>
          <button type="button" onClick={() => closeConfirm()}>
            Неа, пускай будет
          </button>
        </div>
      </div>
    )
  );
};
export default ConfirmMessage;
