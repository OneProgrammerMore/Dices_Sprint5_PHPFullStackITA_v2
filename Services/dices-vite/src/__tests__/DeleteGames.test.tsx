import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DeleteGames from "../components/DeleteGames";
import { describe, it, expect, vi } from "vitest";
import '@testing-library/jest-dom/vitest';

/*
Test Case Ideas

    Component Renders Correctly:
        Ensure the form renders and contains the appropriate fields and buttons.

    Form Submits Correctly:
        When the form is submitted, the deletion API call should be triggered.
        You can mock the server request and check that it is called with the correct parameters.

    State Changes After Deletion (Success):
        If the deletion is successful, the component should update the state to reflect the change (e.g., show a success message, remove deleted data from the UI, etc.).

    State Changes After Deletion (Failure):
        If the deletion fails, ensure the component shows an appropriate error message or updates its state to reflect the failure.

    Form Validation:
        Ensure that the form is not submitted if it has missing or incorrect data.
*/

describe("DeleteGames (Class Component)", () => {
    
    afterEach(() => {
        vi.clearAllMocks();
    });

    beforeEach(() => {
        let mockCookies = 'test=123';
    
        Object.defineProperty(document, 'cookie', {
          get: vi.fn(() => mockCookies),
          set: vi.fn((newValue) => {
            mockCookies = newValue;
          }),
          configurable: true, // Allows redefining in other tests
        });
    });

    it("renders component", () => {
        render(<DeleteGames />);
        expect(screen.getByText("Delete all your games!")).toBeInTheDocument();
        expect(screen.getByText("Submit")).toBeInTheDocument();
    });

    it("calls delete API on form submit", async ()  => {

        const userID: string = '123456-123456-123456'
        const token: string = 'fna98rj234n28419n2310923m12093m0:hasdh91h29321-12398h'

        vi.stubGlobal("fetch", vi.fn(() =>
            Promise.resolve({
              status: 201, // Set HTTP status to 200
              json: () => Promise.resolve({}), // Return an empty JSON object
            })
          ));
        vi.mock("document", () => ({
            cookie: "",
        }));

        render(<DeleteGames />);
        const button = screen.getByText("Submit");
        expect(screen.getByText("Delete all your games!")).toBeInTheDocument();
        expect(screen.getByText("Submit")).toBeInTheDocument();

        document.cookie = `token=${token};userid=${userID}`;
        fireEvent.click(button);

        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

        const endpoint = '/api/players/' + userID + '/games';
        expect(fetch).toHaveBeenCalledWith(
            expect.stringMatching(new RegExp(`${endpoint}$`)),
            expect.objectContaining({
            method: 'DELETE',
            headers: expect.objectContaining({
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            }),
            body: expect.any(String),
            })
        );
    });

    
    it("calls delete API on form submit and succes alert appears", async ()  => {

        const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

        const userID: string = '123456-123456-123456'
        const token: string = 'fna98rj234n28419n2310923m12093m0:hasdh91h29321-12398h'
        
        vi.stubGlobal("fetch", vi.fn(() =>
            Promise.resolve({
              status: 201, // Set HTTP status to 200
              ok: true,
              json: () => Promise.resolve({}), // Return an empty JSON object
            })
          ));
        
        vi.mock("document", () => ({
            cookie: "",
        }));

        render(<DeleteGames />);
        const button = screen.getByText("Submit");
        expect(screen.getByText("Delete all your games!")).toBeInTheDocument();
        expect(screen.getByText("Submit")).toBeInTheDocument();

        document.cookie = `token=${token};userid=${userID}`;
        fireEvent.click(button);

        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

        const endpoint = '/api/players/' + userID + '/games';
        expect(fetch).toHaveBeenCalledWith(
            expect.stringMatching(new RegExp(`${endpoint}$`)),
            expect.objectContaining({
            method: 'DELETE',
            headers: expect.objectContaining({
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            }),
            body: expect.any(String),
            })
        );

        // Assert that alert was called with the correct message
        expect(alertMock).toHaveBeenCalledWith('The deletion of the games was successful');

        // Clean up the mock after the test
        alertMock.mockRestore();
    });
    
    it("calls delete API on form submit and error alert appears", async ()  => {

        const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

        const userID: string = '123456-123456-123456'
        const token: string = 'fna98rj234n28419n2310923m12093m0:hasdh91h29321-12398h'

        vi.stubGlobal("fetch", vi.fn(() =>
            Promise.resolve({
              status: 201, // Set HTTP status to 200
              ok: false,
              json: () => Promise.resolve({}), // Return an empty JSON object
            })
          ));
        vi.mock("document", () => ({
            cookie: "",
        }));

        render(<DeleteGames />);
        const button = screen.getByText("Submit");
        expect(screen.getByText("Delete all your games!")).toBeInTheDocument();
        expect(screen.getByText("Submit")).toBeInTheDocument();

        document.cookie = `token=${token};userid=${userID}`;
        fireEvent.click(button);

        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

        const endpoint = '/api/players/' + userID + '/games';
        expect(fetch).toHaveBeenCalledWith(
            expect.stringMatching(new RegExp(`${endpoint}$`)),
            expect.objectContaining({
            method: 'DELETE',
            headers: expect.objectContaining({
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            }),
            body: expect.any(String),
            })
        );

        // Assert that alert was called with the correct message
        expect(alertMock).toHaveBeenCalledWith('Something went wrong');

        // Clean up the mock after the test
        alertMock.mockRestore();
    });
    

    



}); 

/*
expect(screen.getByText("Modify your name:")).toBeInTheDocument();
        expect(screen.getByText("New Name")).toBeInTheDocument();
        expect(screen.getByText("Password")).toBeInTheDocument();
describe("Counter (Class Component)", () => {
  it("renders initial count", () => {
    render(<Counter initialCount={5} />);
    expect(screen.getByText("Count: 5")).toBeInTheDocument();
  });

  it("increments count on button click", () => {
    render(<Counter initialCount={0} />);
    const button = screen.getByText("Increment");

    fireEvent.click(button);
    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });
});
*/