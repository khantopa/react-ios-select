import React, { useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Picker from '.';
// import Docs from './Picker.mdx';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof Picker> = {
  component: Picker,
  tags: ['autodocs'],
};
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

export default meta;

type Story = StoryObj<typeof Picker>;

const WithKnobs = () => {
  const [value, setValue] = React.useState(options[10]);

  useEffect(() => {
    action('onChange')(value);
  }, [value]);

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

export const HeightSelect: Story = {
  render: () => <WithKnobs />,
};
