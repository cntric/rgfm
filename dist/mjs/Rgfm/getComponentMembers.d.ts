import React from "react";
/**
 * The error thrown when redundant members are provided as children.
 */
export declare class ReactMemberRedundancyError extends Error {
    name: string;
    message: string;
    constructor(memberKey: string);
}
export declare type MemberNamesT = string[];
export declare type MemberNameT<N extends MemberNamesT> = N[number];
export declare type MemberMapT<N extends MemberNamesT> = Partial<{
    [key in N[number]]: (React.ReactChild | React.ReactFragment | React.ReactPortal);
}>;
/**
 * Gets a member component by name.
 * @param name
 * @param children the children passed to a functional component.
 * @returns
 */
export declare const getComponentMember: <N extends MemberNamesT>(name: MemberNameT<N>, children: React.ReactNode) => Partial<{ [key in N[number]]: React.ReactChild | React.ReactFragment | React.ReactPortal; }>[MemberNameT<N>];
/**
 * Gets a map of all member components for the given functional component children.
 * @param names the names of the member components. For best type hinting, use as const.
 * @param children the children being used by the
 * @returns
 */
export declare const getComponentMembers: <N extends MemberNamesT>(names: N, children: React.ReactNode) => Partial<{ [key in N[number]]: React.ReactChild | React.ReactFragment | React.ReactPortal; }>;
