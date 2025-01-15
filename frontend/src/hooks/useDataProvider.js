import { useContext } from "react";
import DataContext from "../context/DataProvider";

const useDataProvider = () => {
    return (useContext(DataContext))
}

export default useDataProvider;