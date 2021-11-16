import { useContext } from "react";
import { SetComponentsContext } from "../contexts/SetComponents";

function useSetComponents() {
    return {...useContext(SetComponentsContext)}
}

export default useSetComponents;
