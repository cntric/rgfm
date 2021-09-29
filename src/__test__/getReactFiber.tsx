export const getReactFiber = (tel : any) : {
    return : any
}=>{

    const possibleKeys = Object.keys(tel).filter((key)=>{
        
        return key.startsWith("__reactFiber") && tel[key] instanceof Object

    })

    return possibleKeys.length ? tel[possibleKeys[0]] : undefined;

}