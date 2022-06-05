import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as stories from "../../src/components/LoadingIndicator/LoadingIndicator.stories";
import { composeStories } from "@storybook/testing-react";

const { Default } = composeStories(stories);

describe("LoadingIndicator", () => {
  it("story renders correctly", () => {
    render(<Default />);
  });
});
