import { createContext } from "react";

export const SearchContent = createContext({
    term:'',
    handleSearch: () => {}
}) 