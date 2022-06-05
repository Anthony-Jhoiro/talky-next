import { render, screen, fireEvent, within } from "@testing-library/react";
import { Post } from "../../src/components/Post";
import "@testing-library/jest-dom";
import * as stories from "../../src/components/Post/Post.stories";
import { composeStories } from "@storybook/testing-react";

const { Default } = composeStories(stories);

describe("Post", () => {
  it("story renders correctly", () => {
    render(<Default />);

    // User display name must be visible
    screen.getByText("John Doe");
  });

  it("should open modal on image pressed", () => {
    render(<Default />);

    // Click on first image
    fireEvent.click(screen.getByAltText("Image posted by John Doe ; number 1"));

    // Check that the mage appears in a dialog
    const { getByAltText } = within(screen.getByRole("dialog"));
    expect(
      getByAltText("Image posted by John Doe ; number 1")
    ).toBeInTheDocument();
  });
});
