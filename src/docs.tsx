import React, { FC } from 'react';
import Picker from '.';
import { ISelectItemValue } from './Select.interface';

const options = [
  '123 cm',
  '124 cm',
  '125 cm',
  '126 cm',
  '127 cm',
  '128 cm',
  '129 cm',
  '130 cm',
  '131 cm',
  '132 cm',
  '133 cm',
  '134 cm',
  '135 cm',
  '136 cm',
  '137 cm',
  '138 cm',
  '139 cm',
  '140 cm',
  '141 cm',
  '142 cm',
  '143 cm',
  '144 cm',
  '145 cm',
  '146 cm',
  '147 cm',
  '148 cm',
  '149 cm',
  '150 cm',
  '151 cm',
  '152 cm',
  '153 cm',
  '154 cm',
  '155 cm',
  '175 cm',
].map((item) => ({ id: item, label: item, value: item }));

export const PickerMain: FC = () => {
  const [value, setValue] = React.useState(options[10]);

  return (
    <div
      style={{
        boxSizing: 'border-box',
        background: 'white',
        height: 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <Picker
        value={value}
        options={options}
        onChange={setValue}
        height={500}
      />
    </div>
  );
};

export const Height = () => {
  const [value, setValue] = React.useState(options[10]);

  return (
    <>
      <div
        style={{
          boxSizing: 'border-box',
          background: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          fontFamily:
            '"Source Sans Pro", HelveticaNeue, Helvetica, Arial, Sans;',
          marginTop: 100,
        }}
      >
        <Picker
          value={value}
          options={options}
          onChange={setValue}
          height={250}
        />
      </div>
    </>
  );
};

export const PropsTablePickerItemValue: FC<ISelectItemValue> = () => {
  return <div>Props table component for story</div>;
};
