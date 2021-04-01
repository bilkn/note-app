import React from 'react';
import {
  Container,
  Wrapper,
  Box,
  SearchBox,
  Input,
  Profile,
  Icon,
} from './styles/header';

function Header({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

Header.Wrapper = function HeaderWrapper({ children, ...restProps }) {
  return <Wrapper {...restProps}>{children}</Wrapper>;
};

Header.Box = function HeaderBox({ children, ...restProps }) {
  return <Box {...restProps}>{children}</Box>;
};

Header.SearchBox = function HeaderSearchBox({ children, ...restProps }) {
  return <SearchBox {...restProps}>{children}</SearchBox>;
};

Header.Input = function HeaderInput({ ...restProps }) {
  return <Input {...restProps} />;
};

Header.Profile = function HeaderProfile({ ...restProps }) {
  return <Profile {...restProps} />;
};

Header.Icon = function HeaderIcon({ children, ...restProps }) {
  return <Icon {...restProps}>{children}</Icon>;
};

export default Header;
