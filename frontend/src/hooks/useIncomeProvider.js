import { useContext } from "react";
import IncomeContext from "../context/IncomeProvider";

const useIncomeProvider = () => {
    return (useContext(IncomeContext))
}

export default useIncomeProvider;