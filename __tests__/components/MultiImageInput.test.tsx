import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as stories from "../../src/components/MultiImageInput/MultiImageInput.stories";
import { composeStories } from "@storybook/testing-react";

const { Default, Full, InError, Empty } = composeStories(stories);

describe("LoadingIndicator", () => {
  beforeEach(() => {
    window.URL.createObjectURL = jest.fn(
      () =>
        "https://images.unsplash.com/photo-1654599879153-61eb2d785fb7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
    );
  });

  afterEach(() => {
    (window.URL.createObjectURL as jest.Mock).mockReset();
  });

  it("defaut story renders correctly", () => {
    render(<Default />);
  });

  it("empty story renders only the label", () => {
    render(<Empty />);

    const limitMessage = screen.queryByTestId("limit-error-message");
    expect(limitMessage).toBe(null);

    const errorMessage = screen.queryByTestId("error-message");
    expect(errorMessage).toBe(null);
  });

  it("full story shows a limit message", () => {
    render(<Full />);
    const limitMessage = screen.queryByTestId("limit-error-message");
    expect(limitMessage).toHaveTextContent(
      "You have reached the limit of 3 files"
    );

    const errorMessage = screen.queryByTestId("error-message");
    expect(errorMessage).toBe(null);
  });

  it("error story shows an error message", () => {
    render(<InError />);

    const errorMessage = screen.queryByTestId("error-message");
    expect(errorMessage).toHaveTextContent("This is an error message");
  });
});
