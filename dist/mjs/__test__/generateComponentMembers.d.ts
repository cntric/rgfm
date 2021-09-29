import React, { FC } from "react";
/**
 * Generates a map (object) with unique keys.
 * @param size is the size of the map.
 * @param valueGenerator is a function that generates values for entries in the map.
 * @returns a map with unique keys pointing to generated values.
 */
export declare const FlashMap: <T extends unknown>(size: number, valueGenerator: () => T) => {
    [key: string]: T;
};
/**
 * Generates an FC member wkth the appropriate name.
 * @param name is the desired name.
 * @returns
 */
export declare const generateNamedMember: (name: string) => FC<{}>;
/**
 * Generates a membered component.
 * @param size is the number of possible members for the component.
 */
export declare const produceComponentMembers: <M extends string[]>(arr: M) => { [key in M[number]]: React.FC<{}>; };
export declare type MemberedComponentT<M extends string[]> = FC & {
    [key in M[number]]: FC;
};
export declare const generateMemberedComponent: <M extends string[]>(arr: M) => {
    members: { [key in M[number]]: React.FC<{}>; };
    Component: MemberedComponentT<M>;
};
