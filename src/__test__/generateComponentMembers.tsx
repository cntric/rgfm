import {generate} from "shortid";
import React, {FC} from "react";
import { RgfmChildI } from "Rgfm";

/**
 * Generates a map (object) with unique keys.
 * @param size is the size of the map.
 * @param valueGenerator is a function that generates values for entries in the map.
 * @returns a map with unique keys pointing to generated values.
 */
export const FlashMap = <T extends any>(
    size : number, 
    valueGenerator : ()=>T,
)
: {
    [key : string] : T
}=>{

    return Array(size).fill(null).reduce((map)=>{
        return {
            ...map,
            [generate()] : valueGenerator()
        }
    }, {})

}

/**
 * Generates an FC member wkth the appropriate name.
 * @param name is the desired name.
 * @returns 
 */
export const generateNamedMember= (name : string) : RgfmChildI=>{

    const nm : {
        [key : string] : FC<{}>
    }= {
        [name] : ({children})=>{

            return (
                <>{children}</>
            )

        }
    }

    const item = nm[name]

    item.displayName = name;
    (item as RgfmChildI ).rgfmName = name;

    return item as RgfmChildI;

}

/**
 * Generates a membered component.
 * @param size is the number of possible members for the component.
 */
export const produceComponentMembers= <M extends string[]>(
    arr : M
) :  {
    [key in M[number]] : FC 
}=>{

    return arr.reduce((map, memberName)=>{
        return {
            ...map,
            [memberName] : generateNamedMember(memberName)
        } // linting is not good
    }, {} as { [key in M[number]] : FC})
}

export type MemberedComponentT<M extends string[]> = FC & {
    [key in M[number]] : FC
}

export const generateMemberedComponent = <M extends string[]>(
    arr : M
):  {
    members : {
        [key in M[number]] : FC 
    },
    Component : MemberedComponentT<M>
} =>{


    const Component : FC<{}> = ({children})=><>{children}</> 

    return {

        members : produceComponentMembers(arr),
        Component : Component as MemberedComponentT<M>

    }

}