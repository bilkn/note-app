import styled from 'styled-components/macro';
import { Link as ReactRouterLink } from 'react-router-dom';

export const Container = styled.div``;

export const Menu = styled.ul`
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`;

export const MenuItem = styled.li`
  border-bottom: 1px solid #eee;
`;

export const Link = styled(ReactRouterLink)`
  color: #f1554c;
  font-size: 2rem;
`;

export const MenuLink = styled(ReactRouterLink)`
  align-items: center;
  color: #000;
  display: flex;
  height: 100%;
  justify-content: space-between;
  padding: 0.875em 1.25em;
  width: 100%;
`;