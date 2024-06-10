import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import HostSignupContainer from "./host-signup-container.component.jsx";
import configureStore from "redux-mock-store";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

const mockUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUsedNavigate,
}));

const initialState = {
  currentUser: {
    firstName: "",
    lastName: "",
    birthday: "",
    displayName: "",
    email: "",
    phoneNumber: "",
    photoURL: "",
    providerId: "",
    isHost: false,
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
    },
    languagesSpoken: [],
    cuisineType: "",
    aboutHost: "",
  },
  isLoading: false,
  error: null,
};

const hostPersonalInfo = {
  firstName: "John",
  lastName: "Doe",
  phoneNumber: "123-456-7890",
  street: "123 Main St",
  city: "Austin",
  state: "TX",
  zipCode: "12345",
};
const hostProfileInfo = {
  languages: ["English"],
  foodTypes: ["Mexican"],
  textarea: "I love to cook!",
};

const mockStoreConfigure = configureStore();
const store = mockStoreConfigure({ ...initialState });

test("renders HostSignupContainer component with store", () => {
  render(<HostSignupContainer />, { store });
  const testTestId = screen.getByTestId("host-container");
  expect(testTestId).toBeInTheDocument();
});

test("it should render first page and then when 'Next' is clicked, render next page", async () => {
  render(<HostSignupContainer />);
  // initial step is 1 and asked for personal information such as first name
  expect(screen.getByText("Full First Name")).toBeInTheDocument();
  const nextButton = screen.getByTestId("onNext", { name: /next/i });
  await fireEvent.click(nextButton);
  // second step asks for profile information such as what cusines do you offer?
  expect(screen.getByText("What cusines do you offer?")).toBeInTheDocument();
});

test("it should render second page and then when 'Previous' is clicked, render the first page", async () => {
  render(<HostSignupContainer />);
  const nextButton = screen.getByTestId("onNext", { name: /next/i });
  await fireEvent.click(nextButton);
  // initial step is 1 and asked for personal information such as first name
  expect(screen.getByText("What cusines do you offer?")).toBeInTheDocument();
  const prevButton = screen.getByTestId("onPrevious", { name: /previous/i });
  await fireEvent.click(prevButton);
  // second step asks for profile information such as what cusines do you offer?
  expect(screen.getByText("Full First Name")).toBeInTheDocument();
});

it("calls saveForm and should fail since the form was not filled out", async () => {
  render(<HostSignupContainer />);
  const mockDispatch = jest.fn();
  const nextButton = screen.getByTestId("onNext", { name: /next/i });
  await fireEvent.click(nextButton);
  await fireEvent.click(nextButton);

  const SubmitButton = screen.getByTestId("onSubmit", { name: /submit/i });
  fireEvent.click(SubmitButton);
  expect(mockDispatch.mock.results).toEqual([]);
});
