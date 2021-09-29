import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { generate } from "shortid";
/**
 * Generates a map (object) with unique keys.
 * @param size is the size of the map.
 * @param valueGenerator is a function that generates values for entries in the map.
 * @returns a map with unique keys pointing to generated values.
 */
export const FlashMap = (size, valueGenerator) => {
    return Array(size).fill(null).reduce((map) => {
        return {
            ...map,
            [generate()]: valueGenerator()
        };
    }, {});
};
/**
 * Generates an FC member wkth the appropriate name.
 * @param name is the desired name.
 * @returns
 */
export const generateNamedMember = (name) => {
    const nm = {
        [name]: ({ children }) => {
            return (_jsx(_Fragment, { children: children }, void 0));
        }
    };
    return nm[name];
};
/**
 * Generates a membered component.
 * @param size is the number of possible members for the component.
 */
export const produceComponentMembers = (arr) => {
    return arr.reduce((map, memberName) => {
        return {
            ...map,
            [memberName]: generateNamedMember(memberName)
        }; // linting is not good
    }, {});
};
export const generateMemberedComponent = (arr) => {
    const Component = ({ children }) => _jsx(_Fragment, { children: children }, void 0);
    return {
        members: produceComponentMembers(arr),
        Component: Component
    };
};
