import React from 'react';
import {
  Container,
  TextArea,
  Box,
  ButtonWrapper,
  Button,
  ToggleButton,
  Title,
  Dot,
  Date
} from './styles/note';

const Note = React.forwardRef(({ children, ...restProps }, ref) => {
  return (
    <Container ref={ref} {...restProps}>
      {children}
    </Container>
  );
});

Note.TextArea = React.forwardRef((props, ref) => (
  <TextArea ref={ref} {...props} />
));

Note.Box = function NoteButton({ children, ...restProps }) {
  return <Box {...restProps}>{children}</Box>;
};

Note.ButtonWrapper = function NoteButtonWrapper({ children, ...restProps }) {
  return <ButtonWrapper {...restProps}>{children}</ButtonWrapper>;
};

Note.Button = function NoteButton({ children, ...restProps }) {
  return <Button {...restProps}>{children}</Button>;
};

Note.ToggleButton = function NoteToggleButton({ active, ...restProps }) {
  return (
    <ToggleButton active={active} {...restProps}>
      <Dot active={active} />
    </ToggleButton>
  );
};

Note.Title = function NoteTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

Note.Date = function NoteDate({ children, ...restProps }) {
  return <Date {...restProps}>{children}</Date>;
};

export default Note;
