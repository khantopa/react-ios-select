import React, { FC } from 'react';

import { ISelectItem } from './Select.interface';
import './styles.css';

// const { xsmall, small } = spacing;

export const itemHeight = 48;

const PickerItem: FC<ISelectItem> = ({
  id,
  label,
  isSelected,
  onClick,
  ...props
}) => {
  // const themeFromThemeProvider = useTheme();
  // const theme = useCustomTheme(themeFromThemeProvider);

  return (
    <div
      onClick={onClick}
      className="IOS_Select_Item"
      aria-selected={isSelected}
      role="option"
      data-cy-picker-item={id}
      {...props}
    >
      {label}
    </div>
  );
};

export default PickerItem;
