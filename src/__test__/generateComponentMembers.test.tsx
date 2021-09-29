/**
 * @jest-environment jsdom
 */
import React, {Children, FC} from "react";
import {seemsDeterministic} from "determinismus";
import {generate} from "shortid";
import { generateNamedMember } from "./generateComponentMembers";
import {render} from "@testing-library/react";
import TestRenderer from "react-test-renderer";


const Test : FC = ({children})=>{

    return <>{children}</>

}

export const GenerateComponentMembersSuiteA = ()=>{

    describe("Basic functionality", ()=>{

        test("Generates a member with the appropriate name", ()=>{

            const name = generate();

            const Component = generateNamedMember(name);

            const render = TestRenderer.create(<Component/>);

            expect(
                (render.root.type as any).name
            ).toBe(name);

        })


    })

}; GenerateComponentMembersSuiteA();