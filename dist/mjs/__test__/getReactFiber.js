export const getReactFiber = (tel) => {
    const possibleKeys = Object.keys(tel).filter((key) => {
        return key.startsWith("__reactFiber") && tel[key] instanceof Object;
    });
    return possibleKeys.length ? tel[possibleKeys[0]] : undefined;
};
