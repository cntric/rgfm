import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { generate } from "shortid";
import { generateNamedMember } from "./generateComponentMembers";
import TestRenderer from "react-test-renderer";
const Test = ({ children }) => {
    return _jsx(_Fragment, { children: children }, void 0);
};
export const GenerateComponentMembersSuiteA = () => {
    describe("Basic functionality", () => {
        test("Generates a member with the appropriate name", () => {
            const name = generate();
            const Component = generateNamedMember(name);
            const render = TestRenderer.create(_jsx(Component, {}, void 0));
            expect(render.root.type.name).toBe(name);
        });
    });
};
GenerateComponentMembersSuiteA();
