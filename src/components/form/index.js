import React from 'react';
import {
  Container,
  Wrapper,
  Box,
  Input,
  Label,
  Fieldset,
  Textarea,
  Button,
  ButtonRed,
  Subtitle,
  Line,
  Span,
} from './styles/form';

function Form({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

Form.Wrapper = function FormWrapper({ children, ...restProps }) {
  return <Wrapper {...restProps}>{children}</Wrapper>;
};

Form.Box = function FormBox({ children, ...restProps }) {
  return <Box {...restProps}>{children}</Box>;
};

Form.Input = function FormInput({ children, ...restProps }) {
  return <Input {...restProps} />;
};

Form.Label = function FormLabel({ children, ...restProps }) {
  return <Label {...restProps}>{children}</Label>;
};

Form.Fieldset = function FormFieldset({ children, ...restProps }) {
  return <Fieldset {...restProps}>{children}</Fieldset>;
};

Form.Textarea = function FormTextarea({ children, ...restProps }) {
  return <Textarea {...restProps}>{children}</Textarea>;
};

Form.Button = function FormButton({ children, ...restProps }) {
  return <Button {...restProps}>{children}</Button>;
};

Form.ButtonRed = function FormButtonRed({ children, ...restProps }) {
  return <ButtonRed {...restProps}>{children}</ButtonRed>;
};

Form.Subtitle = function FormSubtitle({ children, ...restProps }) {
  return <Subtitle {...restProps}>{children}</Subtitle>;
};

Form.Line = function FormLine({ ...restProps }) {
  return <Line {...restProps} />;
};

Form.Span = function FormSpan({ children, ...restProps }) {
  return <Span {...restProps}>{children}</Span>;
};

export default Form;