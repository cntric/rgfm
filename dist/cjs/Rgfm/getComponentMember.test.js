"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckOrderTestSuiteA = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const shortid_1 = require("shortid");
const generateComponentMembers_1 = require("../__test__/generateComponentMembers");
const getComponentMembers_1 = require("./getComponentMembers");
const react_1 = require("@testing-library/react");
const getReactFiber_1 = require("../__test__/getReactFiber");
const CheckOrderTestSuiteA = () => {
    describe("Basic functionality", () => {
        test("Gets the right member", () => {
            const size = 100;
            const map = (0, generateComponentMembers_1.FlashMap)(size, shortid_1.generate);
            const { members, Component } = (0, generateComponentMembers_1.generateMemberedComponent)(Object.keys(map));
            const ComponentWrap = ({ children }) => {
                Object.keys(map).map((key) => {
                    const member = (0, getComponentMembers_1.getComponentMember)(key, children);
                    if (member) {
                        expect(member.props.children.props.children).toBe(map[key]);
                    }
                });
                return ((0, jsx_runtime_1.jsx)(Component, { children: children }, void 0));
            };
            const renderedOutput = (0, react_1.render)((0, jsx_runtime_1.jsx)(ComponentWrap, { children: Object.keys(members).map((key) => {
                    const Member = members[key];
                    return (0, jsx_runtime_1.jsx)(Member, { children: (0, jsx_runtime_1.jsx)("div", { children: map[key] }, void 0) }, key);
                }) }, void 0));
            Object.keys(map).map((key) => {
                const keyNode = renderedOutput.getByText(map[key]);
                expect((0, getReactFiber_1.getReactFiber)(keyNode).return.key).toBe(key);
            });
        });
    });
};
exports.CheckOrderTestSuiteA = CheckOrderTestSuiteA;
(0, exports.CheckOrderTestSuiteA)();
