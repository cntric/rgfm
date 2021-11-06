"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComponentMembers = exports.getComponentMember = exports.ReactMemberRedundancyError = void 0;
const react_1 = require("react");
/**
 * The error thrown when redundant members are provided as children.
 */
class ReactMemberRedundancyError extends Error {
    constructor(memberKey) {
        super();
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ReactMemberRedundancyError);
        }
        this.name = "ReactMemberRedundancyError";
        this.message = `You have provided more than one ${memberKey}. If you are working in the browser, you may need to refresh to see your changes.`;
    }
}
exports.ReactMemberRedundancyError = ReactMemberRedundancyError;
/**
 * Gets a member component by name.
 * @param name
 * @param children the children passed to a functional component.
 * @returns
 */
const getComponentMember = (name, children) => {
    if (!children) {
        return undefined;
    }
    const matchingItems = react_1.Children.toArray(children).length ?
        react_1.Children.toArray(children).filter((child) => {
            return child.displayName ? child.displayName === name : false;
        }) : [];
    if (matchingItems.length > 1) {
        throw new ReactMemberRedundancyError(name);
    }
    return matchingItems.length ? matchingItems[0] : undefined;
};
exports.getComponentMember = getComponentMember;
/**
 * Gets a map of all member components for the given functional component children.
 * @param names the names of the member components. For best type hinting, use as const.
 * @param children the children being used by the
 * @returns
 */
const getComponentMembers = (names, children) => {
    return names.reduce((map, memberName) => {
        return Object.assign(Object.assign({}, map), { [memberName]: (0, exports.getComponentMember)(memberName, children) });
    }, {});
};
exports.getComponentMembers = getComponentMembers;
