import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { LoadingIndicator } from ".";

export default {
  title: "Component/LoadingIndicator",
  component: LoadingIndicator,
  argTypes: {
    //...
  },
} as Meta;

const Template: Story = (args) => <LoadingIndicator {...args} />;

// Default scenario
export const Default = Template.bind({});
