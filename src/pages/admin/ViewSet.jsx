import { useRouter } from 'next/router'
import React from 'react'
import { useEffect } from 'react';

const ViewSet = () => {
    const router = useRouter();
    const { categoryId } = router.query;

    useEffect(() => {

        console.log(categoryId);

    }, [])

    return (
        <div>ViewSet</div>
    )
}

export default ViewSet