import type { Meta, StoryObj } from '@storybook/react';
import ModeSwitch from '../modeSwitch';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ModeSwitch> = {
  title: 'Example/ModeSwitch',
  component: ModeSwitch,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ModeSwitch>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {};
