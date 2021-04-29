import React, { useContext, useEffect, useRef, useState } from 'react';
import 'styled-components/macro';
import { Note } from '../components';
import { isSecondsPassed } from '../helpers';
import { useData, useWindowKey, useWindowEvent } from '../hooks';
import { Edit, Fullscreen } from '@styled-icons/boxicons-regular';
import { Clipboard } from '@styled-icons/fa-regular/Clipboard';
import { Trash } from '@styled-icons/bootstrap/Trash';
import { copyToClipboard } from '../helpers';
import { DialogContext, ToastContext } from '../context';

export const NoteContainer = React.memo((props) => {
  const {
    id,
    color,
    text,
    timestamp,
    lastModified,
    mouseClick,
    setMouseClick,
    isCurrentId,
    setCurrentId,
  } = props;
  const [showButtons, setShowButtons] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [textValue, setTextValue] = useState(text);
  const textAreaRef = useRef(null);
  const { dispatchToast } = useContext(ToastContext);
  const [, setDialog] = useContext(DialogContext);
  const { Add, Delete, DeletePermanently, Modify, SortByDate } = useData();
  useWindowEvent({
    events: [{ event: 'click' }],
    handlers: [() => setShowButtons(false)],
    condition: showButtons,
  });
  useWindowKey({
    keys: ['Escape'],
    handlers: [() => setShowButtons(false)],
    condition: showButtons,
  });

  const handleEditClick = () => {
    if (showButtons) {
      setIsActive(true);
    }
  };

  console.log("note render")

  const handleCopyClick = () => {
    if (showButtons) {
      copyToClipboard(textValue);
      dispatchToast({
        type: 'NOTIFICATION',
        payload: 'Note has been copied to the clipboard.',
      });
      setIsActive(false);
    }
  };

  const handleDeleteClick = () => {
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

  const handleToggleClick = (e) => {
    e.stopPropagation();
    setShowButtons(!showButtons);
    setCurrentId(id);
  };

  const handleMouseDown = () => {
    setMouseClick(true);
  };

  const handleNoteClick = () => {
    setCurrentId(id);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setTextValue(e.target.value);
  };

  const handleBlur = () => {
    const textArea = textAreaRef.current;
    if (!isCurrentId) setShowButtons(false);
    if (textValue.trim()) {
      if (!lastModified) Add(id, textValue);
      else Modify(id, textValue);
    } else if (lastModified) Delete(id);
    else DeletePermanently(id);
    SortByDate();
    setIsActive(false);
    textArea.scroll({
      top: 0,
    });
  };

  // !!! After blur text area should scroll to top.

  // Deactivates the active note, if another note's toggle button is clicked.
  useEffect(() => {
    if (!isCurrentId) {
      setShowButtons(false);
      setIsActive(false);
    }
  }, [isCurrentId]);

  // Activates the note, if it is just created.
  useEffect(() => {
    if (!isSecondsPassed(1, timestamp)) {
      setIsActive(true);
      setCurrentId(id);
    }
  }, [timestamp, id, setCurrentId, isActive]);

  // Prevents the text selector to be positioned the beginning of the text.
  useEffect(() => {
    const textArea = textAreaRef.current;
    const length = textValue.length;
    if (isActive) {
      textArea.focus();
      textArea.setSelectionRange(length, length);
    } else textArea.blur();
  }, [isActive, textValue]);

  return (
    <Note
      color={color}
      animate={!isSecondsPassed(1, timestamp)}
      data-testid="note"
      onClick={handleNoteClick}
    >
      {lastModified && (
        <Note.ButtonWrapper>
          <Note.Box active={showButtons}>
            <Note.Button
              onClick={handleEditClick}
              title="Edit note"
              aria-label="Edit note"
            >
              <Edit size="24" />
            </Note.Button>
            <Note.Button title="Enlarge note" aria-label="Enlarge note">
              <Fullscreen size="24" />
            </Note.Button>
            <Note.Button
              onClick={handleCopyClick}
              title="Copy to clipboard"
              aria-label="Copy to clipboard"
            >
              <Clipboard size="24" />
            </Note.Button>
            <Note.Button
              onClick={handleDeleteClick}
              title="Delete note"
              aria-label="Delete note"
            >
              <Trash size="24" />
            </Note.Button>
          </Note.Box>

          <Note.ToggleButton
            active={showButtons}
            mouseClick={mouseClick}
            onClick={handleToggleClick}
            onMouseDown={handleMouseDown}
            title="Toggle note menu"
            aria-label="Toggle note menu"
          />
        </Note.ButtonWrapper>
        /*   <NoteButtonContainer
            showButtons={showButtons}
            setIsActive={setIsActive}
            textValue={textValue}
            mouseClick={mouseClick}
            id={id}
          /> */
      )}

      <Note.TextArea
        active={isActive}
        value={textValue}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={!isActive}
        ref={textAreaRef}
        data-testid="note-text-area"
      />
    </Note>
  );
})

export default NoteContainer;
