import React, { Children, FC } from "react";


/**
 * The error thrown when redundant members are provided as children.
 */
export class ReactMemberRedundancyError 
        extends Error  {

    constructor(memberKey : string){
        super();
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ReactMemberRedundancyError)
        }
        this.name = "ReactMemberRedundancyError";
        this.message = `You have provided more than one ${memberKey}. If you are working in the browser, you may need to refresh to see your changes.`
    }

}

export type MemberNamesT = Readonly<string[]>;
export type MemberNameT<N extends MemberNamesT> =  N[number]
export type MemberMapT<N extends MemberNamesT> = Partial<{
    [key in N[number]] : (React.ReactChild | React.ReactFragment | React.ReactPortal)
}>

/**
 * Gets a member component by name.
 * @param name 
 * @param children the children passed to a functional component.
 * @returns 
 */
export const getComponentMember = <N extends MemberNamesT>(
    name : MemberNameT<N>, children : React.ReactNode
): MemberMapT<N>[MemberNameT<N>]=>{

    if(!children){
        return undefined;
    }

    const matchingItems = Children.toArray(children).length ?
            Children.toArray(children).filter((child)=>{

                return (child as any).type.displayName ? (child as any).type.displayName === name : false;

            }) : []

    

    if(matchingItems.length > 1) {
        throw new ReactMemberRedundancyError(name);
    }

    return matchingItems.length ? matchingItems[0] : undefined

}

/**
 * Gets a map of all member components for the given functional component children.
 * @param names the names of the member components. For best type hinting, use as const.
 * @param children the children being used by the 
 * @returns 
 */
export  const getComponentMembers = <N extends MemberNamesT>(
    names : N, children : React.ReactNode
)
: MemberMapT<N> =>{

    return names.reduce<MemberMapT<N>>((map, memberName)=>{
        return {
            ...map,
            [memberName] : getComponentMember<N>(memberName, children)
        }
    }, {})

}