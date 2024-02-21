import React, { FC } from 'react';

import { IPickerItem } from './Picker.interface';
import './styles.css';

// const { xsmall, small } = spacing;

export const itemHeight = 48;

const PickerItem: FC<IPickerItem> = ({
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
      className="Picker_Item"
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
