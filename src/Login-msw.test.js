import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import Login from "./Login";

const server = setupServer(
  rest.get("https://jsonplaceholder.typicode.com/users/1", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        name: "John",
      })
    );
  }),
  rest.get("*", (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ error: "Please add request handler" })
    );
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

test("username input should be rendered", async () => {
  render(<Login />);
  const buttonInputEl = screen.getByRole("button");
  const userInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);

  const testValue = "test";

  fireEvent.change(userInputEl, { target: { value: testValue } });
  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  fireEvent.click(buttonInputEl);

  const userItem = await screen.findByText(/john/i);
  expect(userItem).toBeTruthy();

  // expect(fetch).toHaveBeenCalledTimes(1);
});

// test("username input should be rendered", () => {
//   render(<Login />);
//   const userInputEl = screen.getByPlaceholderText(/username/i);
//   expect(userInputEl).toBeInTheDocument();
// });

// test("password input should be rendered", () => {
//   render(<Login />);
//   const passwordInputEl = screen.getByPlaceholderText(/password/i);
//   expect(passwordInputEl).toBeInTheDocument();
// });

// test("button input should be rendered", () => {
//   render(<Login />);
//   const buttonInputEl = screen.getByRole("button");
//   expect(buttonInputEl).toBeInTheDocument();
// });

// test("username input should be empty", () => {
//   render(<Login />);
//   const userInputEl = screen.getByPlaceholderText(/username/i);
//   expect(userInputEl.value).toBe("");
// });

// test("password input should be empty", () => {
//   render(<Login />);
//   const passwordInputEl = screen.getByPlaceholderText(/password/i);
//   expect(passwordInputEl.value).toBe("");
// });

// test("button should be disabled", () => {
//   render(<Login />);
//   const buttonInputEl = screen.getByRole("button");
//   expect(buttonInputEl).toBeDisabled();
// });

// test("loading should not be rendered", () => {
//   render(<Login />);
//   const buttonInputEl = screen.getByRole("button");
//   expect(buttonInputEl).not.toHaveTextContent(/please wait/i);
// });

// test("error message should not be visible", () => {
//   render(<Login />);
//   const errorEl = screen.getByTestId("error");
//   expect(errorEl).not.toBeVisible();
// });

// test("username input should change", () => {
//   render(<Login />);
//   const userInputEl = screen.getByPlaceholderText(/username/i);
//   const testValue = "test";

//   fireEvent.change(userInputEl, { target: { value: testValue } });
//   expect(userInputEl.value).toBe(testValue);
// });

// test("password input should change", () => {
//   render(<Login />);
//   const passwordInputEl = screen.getByPlaceholderText(/password/i);
//   const testValue = "test";

//   fireEvent.change(passwordInputEl, { target: { value: testValue } });
//   expect(passwordInputEl.value).toBe(testValue);
// });

// test("button should not be disabled when inputs exist", () => {
//   render(<Login />);
//   const buttonInputEl = screen.getByRole("button");
//   const userInputEl = screen.getByPlaceholderText(/username/i);
//   const passwordInputEl = screen.getByPlaceholderText(/password/i);

//   const testValue = "test";

//   fireEvent.change(userInputEl, { target: { value: testValue } });
//   fireEvent.change(passwordInputEl, { target: { value: testValue } });

//   expect(buttonInputEl).not.toBeDisabled();
// });

// test("loading should be rendered when clicked", () => {
//   render(<Login />);
//   const buttonInputEl = screen.getByRole("button");
//   const userInputEl = screen.getByPlaceholderText(/username/i);
//   const passwordInputEl = screen.getByPlaceholderText(/password/i);

//   const testValue = "test";

//   fireEvent.change(userInputEl, { target: { value: testValue } });
//   fireEvent.change(passwordInputEl, { target: { value: testValue } });
//   fireEvent.click(buttonInputEl);

//   expect(buttonInputEl).toHaveTextContent(/please wait/i);
// });

// test("loading should not be visible after fetching", async () => {
//   render(<Login />);
//   const buttonInputEl = screen.getByRole("button");
//   const userInputEl = screen.getByPlaceholderText(/username/i);
//   const passwordInputEl = screen.getByPlaceholderText(/password/i);

//   const testValue = "test";

//   fireEvent.change(userInputEl, { target: { value: testValue } });
//   fireEvent.change(passwordInputEl, { target: { value: testValue } });
//   fireEvent.click(buttonInputEl);

//   await waitFor(() => expect(buttonInputEl).toHaveTextContent(/login/i));
// });

// test("user should be rendered after fetching", async () => {
// expect(fetch).toHaveBeenCalledTimes(1);

// render(<Login />);
// const buttonInputEl = screen.getByRole("button");
// const userInputEl = screen.getByPlaceholderText(/username/i);
// const passwordInputEl = screen.getByPlaceholderText(/password/i);

// const testValue = "test";

// fireEvent.change(userInputEl, { target: { value: testValue } });
// fireEvent.change(passwordInputEl, { target: { value: testValue } });
// fireEvent.click(buttonInputEl);

// const userItem = await screen.findByText("John");

// console.log(userItem);

// await waitFor(() => expect(buttonInputEl).toHaveTextContent(/login/i));
// await waitFor(() => expect(buttonInputEl).toHaveTextContent(/login/i));
// });
