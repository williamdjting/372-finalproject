import { useEffect, useState } from 'react';

function Example() {
    const [data, setData] = useState("No data.")

    useEffect(() => {
        fetch('/users')
            .then((res) => res.json())
            .then((data) => setData(data.test))
    }, [])

    return (
        <p>
            {data}
        </p>
    )
}

export default Example;