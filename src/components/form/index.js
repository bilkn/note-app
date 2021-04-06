import React from 'react';
import {
  Container,
  Wrapper,
  Input,
  Label,
  Fieldset,
  Button,
  Subtitle,
  Line
} from './styles/form';

function Form({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

Form.Wrapper = function FormWrapper({ children, ...restProps }) {
  return <Wrapper {...restProps}>{children}</Wrapper>;
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

Form.Button = function FormButton({ children, ...restProps }) {
  return <Button {...restProps}>{children}</Button>;
};

Form.Subtitle = function FormSubtitle({ children, ...restProps }) {
  return <Subtitle {...restProps}>{children}</Subtitle>;
};

export default Form;
