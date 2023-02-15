import React from 'react';
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";

import Button from "../components/ui/button/Button";


let container = null;
beforeEach(() => {
   container = document.createElement("div");
   document.body.appendChild(container);
});
afterEach(() => {
   unmountComponentAtNode(container);
   container.remove();
   container = null;
});
it('should render without errors',  () => {
    act(() => {
        render(<Button customClass="test_btn">Some text</Button>, container);
    });
    expect(container.querySelector(".test_btn").textContent).toEqual("Some text")
});