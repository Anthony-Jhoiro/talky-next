import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { ProfilePicture, ProfilePictureProps } from ".";

export default {
  title: "Users/UserProfile",
  component: ProfilePicture,
  argTypes: {
    //...
  },
} as Meta;

const Template: Story<ProfilePictureProps> = (args) => (
  <ProfilePicture {...args} />
);

// Default scenario
export const Default = Template.bind({});
Default.args = {
  user: {
    id: "1234",
    displayedName: "John Doe",
    profilePicture: "/woman_1.jpg",
  },
  imageOnly: false,
};
