import { Children } from "react";
/**
 * The error thrown when redundant members are provided as children.
 */
export class ReactMemberRedundancyError extends Error {
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
/**
 * Gets a member component by name.
 * @param name
 * @param children the children passed to a functional component.
 * @returns
 */
export const getComponentMember = (name, children) => {
    if (!children) {
        return undefined;
    }
    const matchingItems = Children.toArray(children).length ?
        Children.toArray(children).filter((child) => {
            return child.type.displayName ? child.type.displayName === name : false;
        }) : [];
    if (matchingItems.length > 1) {
        throw new ReactMemberRedundancyError(name);
    }
    return matchingItems.length ? matchingItems[0] : undefined;
};
/**
 * Gets a map of all member components for the given functional component children.
 * @param names the names of the member components. For best type hinting, use as const.
 * @param children the children being used by the
 * @returns
 */
export const getComponentMembers = (names, children) => {
    return names.reduce((map, memberName) => {
        return {
            ...map,
            [memberName]: getComponentMember(memberName, children)
        };
    }, {});
};
