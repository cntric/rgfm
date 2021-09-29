import { jsx as _jsx } from "react/jsx-runtime";
import { generate } from "shortid";
import { generateMemberedComponent, FlashMap } from "../__test__/generateComponentMembers";
import { getComponentMember } from "./getComponentMembers";
import { render } from "@testing-library/react";
import { getReactFiber } from "../__test__/getReactFiber";
export const CheckOrderTestSuiteA = () => {
    describe("Basic functionality", () => {
        test("Gets the right member", () => {
            const size = 100;
            const map = FlashMap(size, generate);
            const { members, Component } = generateMemberedComponent(Object.keys(map));
            const ComponentWrap = ({ children }) => {
                Object.keys(map).map((key) => {
                    const member = getComponentMember(key, children);
                    if (member) {
                        expect(member.props.children.props.children).toBe(map[key]);
                    }
                });
                return (_jsx(Component, { children: children }, void 0));
            };
            const renderedOutput = render(_jsx(ComponentWrap, { children: Object.keys(members).map((key) => {
                    const Member = members[key];
                    return _jsx(Member, { children: _jsx("div", { children: map[key] }, void 0) }, key);
                }) }, void 0));
            Object.keys(map).map((key) => {
                const keyNode = renderedOutput.getByText(map[key]);
                expect(getReactFiber(keyNode).return.key).toBe(key);
            });
        });
    });
};
CheckOrderTestSuiteA();
