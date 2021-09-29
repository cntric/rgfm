"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateComponentMembersSuiteA = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const shortid_1 = require("shortid");
const generateComponentMembers_1 = require("./generateComponentMembers");
const react_test_renderer_1 = __importDefault(require("react-test-renderer"));
const Test = ({ children }) => {
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children }, void 0);
};
const GenerateComponentMembersSuiteA = () => {
    describe("Basic functionality", () => {
        test("Generates a member with the appropriate name", () => {
            const name = (0, shortid_1.generate)();
            const Component = (0, generateComponentMembers_1.generateNamedMember)(name);
            const render = react_test_renderer_1.default.create((0, jsx_runtime_1.jsx)(Component, {}, void 0));
            expect(render.root.type.name).toBe(name);
        });
    });
};
exports.GenerateComponentMembersSuiteA = GenerateComponentMembersSuiteA;
(0, exports.GenerateComponentMembersSuiteA)();
