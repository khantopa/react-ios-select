export interface IPickerItemValue<T = unknown> {
  id: string;
  label: string;
  value: T;
  className?: string;
  style?: React.CSSProperties;
}

export interface IPickerItem<T = unknown> extends IPickerItemValue<T> {
  isSelected: boolean;
  onClick: () => void;
}

export interface IPicker<T> {
  options: IPickerItemValue<T>[];
  value: IPickerItemValue<T>;
  /**
   * @default true
   */
  autoFocus?: boolean;
  /**
   * @default 250
   * accepts only px value
   */
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  onChange: (valueGroups: any) => void;
}
