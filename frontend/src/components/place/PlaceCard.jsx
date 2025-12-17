import React from 'react'
import { useParams } from 'react-router-dom';

const PlaceCard = () => {
    const { category } = useParams();

    return (
        <div>
            {/* <h2>{ category } 페이지 입니다.</h2> */}
        </div>
    )
}

export default PlaceCard
