import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";
import BlogForm from "./Blog-Form";

test("renders title and author only", () => {
  const blog = {
    title: "picazzo",
    author: "picaro",
    url: "picarzee.om",
    likes: 0,
  };

  const component = render(<Blog blog={blog} />);

  expect(component.container).toHaveTextContent("picaro");

  const blogClass = component.container.querySelector(".blog");
  expect(blogClass).toHaveStyle("display: none");
});

test("show url and likes when button are clicked", () => {
  const blog = {
    title: "picazzo",
    author: "picaro",
    url: "picarzee.om",
    likes: 0,
  };

  const component = render(<Blog blog={blog} />);

  const button = component.getByText("view");
  fireEvent.click(button);

  const blogDisplay = component.container.querySelector(".blog");

  expect(blogDisplay).not.toHaveStyle("display:none");
});

test("like btn clicked twice", () => {
  const blog = {
    title: "clicking",
    author: "js",
    url: "ilovejs.com",
    likes: 0,
  };

  const blogComponent = render(<Blog blog={blog} />);

  const btn = blogComponent.getByText("view");
  fireEvent.click(btn);

  const blogDisplay = blogComponent.container.querySelector(".blog");
  expect(blogDisplay).not.toHaveStyle("display: none");

  const hideBtn = blogComponent.getByText("hide");
  fireEvent.click(hideBtn);
  expect(blogDisplay).toHaveStyle("display: none");
});

test("calling details in an element using props", () => {
  const createBlog = jest.fn();

  const component = render(<BlogForm createBlog={createBlog} />);

  const blogInput = component.container.querySelector("#blogInput");
  const form = component.container.querySelector("form");

  fireEvent.change(blogInput, {
    target: { value: "testing author input" },
  });
  fireEvent.submit(form);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].author).toBe("testing author input");
});
