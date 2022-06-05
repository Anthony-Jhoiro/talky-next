import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { Post, PostProps } from ".";

export default {
  title: "Component/Post",
  component: Post,
  argTypes: {
    //...
  },
} as Meta;

const Template: Story<PostProps> = (args) => <Post {...args} />;

// Default scenario
export const Default = Template.bind({});
Default.args = {
  post: {
    content:
      "Jelly chupa chups cotton candy soufflé soufflé biscuit gingerbread. Lollipop chupa chups cheesecake donut tart. Ice cream cupcake pudding pastry brownie cotton candy.\n" +
      "Soufflé marzipan I love chupa chups danish. Cake pastry donut I love gummi bears pudding tootsie roll biscuit. Icing candy canes tiramisu jujubes tootsie roll. Carrot cake topping lollipop biscuit muffin.\n",
    assets: [
      "https://images.unsplash.com/photo-1589379072933-240f90cf8f35?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
      "https://images.unsplash.com/photo-1647185256036-ea35af4ade52?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1648483424607-f8da5be54b72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
      "https://images.unsplash.com/photo-1648484479126-10c313d3722d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    ],
    author: {
      profilePicture: "/woman_1.jpg",
      displayedName: "John Doe",
      id: "123",
    },
  },
};
