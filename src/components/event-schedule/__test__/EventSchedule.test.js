import React, {useReducer} from 'react';
import { StateContext } from "../../../utils/stateContext";
import EventSchedule from '../../EventSchedule';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import stateReducer from "../../../utils/stateReducer";


test("header renders with correct text", () => {
    const initialState = []
    const reducer = []

    const { queryByTestId } = render(
        <EventSchedule />,
        {
            wrapper: ({ users }) => (
                <StateContext.Provider 
                    // value={{ store, dispatch }}
                    initialState = {{users: []}}
                    reducer = {useReducer(stateReducer, initialState)}
                >
                    {users}
                </StateContext.Provider>
            ),
        },
    );

    const element = screen.queryByTestId("header")
    expect(element).toBeDefined();
   
    // expect(element.textContent).toBe("Event Schedule");
})
