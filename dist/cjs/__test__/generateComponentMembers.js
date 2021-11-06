"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMemberedComponent = exports.produceComponentMembers = exports.generateNamedMember = exports.FlashMap = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const shortid_1 = require("shortid");
/**
 * Generates a map (object) with unique keys.
 * @param size is the size of the map.
 * @param valueGenerator is a function that generates values for entries in the map.
 * @returns a map with unique keys pointing to generated values.
 */
const FlashMap = (size, valueGenerator) => {
    return Array(size).fill(null).reduce((map) => {
        return Object.assign(Object.assign({}, map), { [(0, shortid_1.generate)()]: valueGenerator() });
    }, {});
};
exports.FlashMap = FlashMap;
/**
 * Generates an FC member wkth the appropriate name.
 * @param name is the desired name.
 * @returns
 */
const generateNamedMember = (name) => {
    const nm = {
        [name]: ({ children }) => {
            return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children }, void 0));
        }
    };
    const item = nm[name];
    item.displayName = name;
    return item;
};
exports.generateNamedMember = generateNamedMember;
/**
 * Generates a membered component.
 * @param size is the number of possible members for the component.
 */
const produceComponentMembers = (arr) => {
    return arr.reduce((map, memberName) => {
        return Object.assign(Object.assign({}, map), { [memberName]: (0, exports.generateNamedMember)(memberName) }); // linting is not good
    }, {});
};
exports.produceComponentMembers = produceComponentMembers;
const generateMemberedComponent = (arr) => {
    const Component = ({ children }) => (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children }, void 0);
    return {
        members: (0, exports.produceComponentMembers)(arr),
        Component: Component
    };
};
exports.generateMemberedComponent = generateMemberedComponent;
