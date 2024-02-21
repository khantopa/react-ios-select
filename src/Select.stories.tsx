import React from 'react';
// import type { Meta, StoryObj } from '@storybook/react';
import Picker from '.';
// import Docs from './Picker.mdx';
import { Height } from './docs';
// import { ISelect } from './Select.interface';

// type Picker = ISelect<string>;

const meta = {
  component: Picker,
};

export default meta;

// type Story = StoryObj<ISelect<string>>;

export const HeightSelect = {
  render: () => <Height />,
};
