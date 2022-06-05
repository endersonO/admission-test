import { useState } from "react";

const rowState = {
    rowInformation:[]
}

const useRowState = () => {
    const [row, setRow] = useState(rowState);

    const setRowState = (payload) => {
        setRow({
            rowInformation: [payload]
        })
    }

    return {
        row,
        setRowState
    }
}

export default useRowState;