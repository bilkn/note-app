import { useContext } from 'react';
import { useData } from '.';
import { DialogContext, ToastContext } from '../context';
import { copyToClipboard } from '../helpers';

function useHandler(props) {
  const {
    showButtons,
    setShowButtons,
    setCurrentId,
    setIsActive,
    setShowEnlargedNote,
    setRect
  } = props;
  const { dispatchToast } = useContext(ToastContext);
  const [, setDialog] = useContext(DialogContext);
  const { Delete } = useData();

  const handleEditClick = () => {
    if (showButtons) {
      setIsActive(true);
    }
  };

  const handleCopyClick = (textValue) => {
    if (showButtons) {
      copyToClipboard(textValue);
      dispatchToast({
        type: 'NOTIFICATION',
        payload: 'Note has been copied to the clipboard.',
      });
      setIsActive(false);
    }
  };

  const handleDeleteClick = (id) => {
    if (showButtons) {
      setDialog({
        isOpen: true,
        text: 'Are you sure to delete this note?',
        handler: () => Delete(id),
        buttons: ['Cancel', 'Delete'],
      });
      setIsActive(false);
    }
  };

  const handleEnlargeClick = (rect) => {
    setShowEnlargedNote(true);
    setRect(rect)
  };

  const handleToggleClick = (e, id) => {
    e.stopPropagation();
    setShowButtons(!showButtons);
    setCurrentId(id);
  };

  return {
    handleEditClick,
    handleCopyClick,
    handleDeleteClick,
    handleToggleClick,
    handleEnlargeClick,
  };
}

export default useHandler;
