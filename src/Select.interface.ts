export interface ISelectItemValue<T = unknown> {
  id: string;
  label: string;
  value: T;
  className?: string;
  style?: React.CSSProperties;
}

export interface ISelectItem<T = unknown> extends ISelectItemValue<T> {
  isSelected: boolean;
  onClick: () => void;
}

export interface ISelect<T> {
  options: ISelectItemValue<T>[];
  value: ISelectItemValue<T>;
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
