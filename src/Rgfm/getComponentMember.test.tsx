/**
 * @jest-environment jsdom
 */
import React, {FC, Children} from "react";
import {seemsDeterministic} from "determinismus";
import {generate} from "shortid";
import { generateMemberedComponent, FlashMap } from "../__test__/generateComponentMembers";
import { getComponentMember } from "./getComponentMembers";
import { render } from "@testing-library/react";
import { getReactFiber } from "../__test__/getReactFiber";


export const CheckOrderTestSuiteA = ()=>{

    describe("Basic functionality", ()=>{

        test("Gets the right member", ()=>{

            const size = 100;
            const map = FlashMap(size, generate);


            const {
                members,
                Component
            } = generateMemberedComponent(Object.keys(map));

            const ComponentWrap : FC = ({children})=>{

                Object.keys(map).map((key)=>{

                    const member = getComponentMember(key, children);

                    if(member){
                        expect(
                            (member as any).props.children.props.children
                        ).toBe(
                            map[key]
                        );
    
                    }

                })

                return (
                    <Component>
                        {children}
                    </Component>
                )

            }

            const renderedOutput = render(
                <ComponentWrap>
                    {Object.keys(members).map((key)=>{
                        const Member = members[key];
                        return <Member key={key}>
                            <div>
                                {map[key]}
                            </div>
                        </Member>
                    })}
                </ComponentWrap>
            );

            Object.keys(map).map((key)=>{
                const keyNode = renderedOutput.getByText(map[key]);
                expect(
                    getReactFiber(keyNode).return.key
                ).toBe(key)
            })

        })


    })

}; CheckOrderTestSuiteA();