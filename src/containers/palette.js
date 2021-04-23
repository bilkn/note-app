import React, { useContext } from 'react';
import { Palette } from '../components';
import { colors } from '../styles/variables';
import devices from '../styles/devices';
import 'styled-components/macro';
import { useData, useMatchLastSubpath, useResize } from '../hooks';
import * as ROUTES from '../constants/routes';
import { useHistory } from 'react-router';

export default function PaletteContainer({ palette, setPalette }) {
  const history = useHistory();
  const { matchSubpath } = useMatchLastSubpath();
  const { resizing } = useResize();
  const { Add, Delete, Update } = useData();

  const handleColorClick = (color) => {
    Add(color, 'Welcome To the New Era.');
    if (!matchSubpath(ROUTES.HOME)) history.push(ROUTES.HOME);
    const mql = window.matchMedia(devices.mobile);
    setPalette({ active: false, extraAnimation: mql.matches });
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleExtraAnimationEnd = () =>
    setPalette({ active: false, extraAnimation: false });

  return (
    <Palette
      active={palette.active}
      resizing={resizing}
      extraAnimation={palette.extraAnimation}
      onAnimationEnd={handleExtraAnimationEnd}
      data-testid="palette"
    >
      <Palette.Span>&#128578;</Palette.Span>
      <Palette.ColorButton
        color={colors.red_2}
        css={`
          left: 20px;
          top: 82px;
          @media ${devices.mobile} {
            left: initial;
            right: 22px;
            top: 5px !important;
          }
        `}
        onClick={() => handleColorClick(colors.red_2)}
        data-testid="color-btn"
      />
      <Palette.ColorButton
        color={colors.orange}
        css={`
          top: 35px;
          @media ${devices.mobile} {
            right: 8px;
          }
        `}
        onClick={() => handleColorClick(colors.orange)}
      />
      <Palette.ColorButton
        color={colors.purple}
        css={`
          top: 10px;
        `}
        onClick={() => handleColorClick(colors.purple)}
      />
      <Palette.ColorButton
        color={colors.blue}
        css={`
          top: 35px;
          @media ${devices.mobile} {
            right: 8px;
          }
        `}
        onClick={() => handleColorClick(colors.blue)}
      />
      <Palette.ColorButton
        color={colors.green}
        css={`
          margin: 0;
          right: 20px;
          top: 82px;
          @media ${devices.mobile} {
            right: 22px;
            bottom: 5px;
          }
        `}
        onClick={() => handleColorClick(colors.green)}
      />
    </Palette>
  );
}
