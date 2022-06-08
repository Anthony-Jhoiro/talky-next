import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { MultiImageInput, MultiImageInputProps } from ".";

export default {
  title: "Components/MultiImagesInput",
  component: MultiImageInput,
  argTypes: {
    //...
  },
} as Meta;

async function urlToFile(url: string): Promise<File> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], url.split("?")[0].split("/").pop() as string, {
    type: blob.type,
  });
}

const Template: Story<MultiImageInputProps> = (args, { loaded }) => (
  <MultiImageInput {...args} value={loaded ? loaded.value : args.value} />
);

// Default scenario
export const Default = Template.bind({});
Default.args = {
  value: [],
  maxFiles: 10,
  onBlur: () => {},
  name: "default-input",
  ref: null,
  onChange: () => {},
  errorMessage: undefined,
};

export const Empty = Default.bind({});
Empty.args = {
  value: [],
};

Empty.loaders = [
  async () => ({
    value: [],
  }),
];

export const Full = Default.bind({});
Full.args = {
  maxFiles: 3,
  // @ts-ignore because loaders are not supported with testing-library
  value: [null, null, null],
};

Full.loaders = [
  async () => ({
    value: await Promise.all([
      urlToFile(
        "https://images.unsplash.com/photo-1654616340351-9653c80c5f1f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=724&q=80"
      ),
      urlToFile(
        "https://images.unsplash.com/photo-1654684619111-d4a55c79b286?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80"
      ),
      urlToFile(
        "https://images.unsplash.com/photo-1654616340351-9653c80c5f1f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=724&q=80"
      ),
    ]),
  }),
];
