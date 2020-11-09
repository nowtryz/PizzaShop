import React from 'react'
import useAxios from "axios-hooks";

const PizzaList = () => {
    const [{ data, loading, error }, refetch] = useAxios(
        '/pizze'
    )

    return (
        <div />
    )
}

export default PizzaList
