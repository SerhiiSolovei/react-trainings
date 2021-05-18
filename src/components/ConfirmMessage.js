import styles from './ConfirmMessage.module.scss';

import PropTypes from 'prop-types';

const noop = () => {};

const ConfirmMessage = ({ show = false, deletePost = noop, postId, closeConfirm = noop }) => {
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

ConfirmMessage.propTypes = {
  show: PropTypes.bool,
  deletePost: PropTypes.func,
  postId: PropTypes.string,
  closeConfirm: PropTypes.func,
};

export default ConfirmMessage;
