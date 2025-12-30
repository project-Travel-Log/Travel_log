import React, { useState } from 'react';

const WishToggleButton = ({
    defaultWished = false,
    onToggle,
    className = '',
    imgOff = '/images/login/wishlist_w.png',
    imgOn = '/images/login/wishlist_r.png',
}) => {
    const [isWished, setIsWished] = useState(defaultWished);

    const handleClick = (e) => {
        e.preventDefault();   // Link 이동 막기
        e.stopPropagation();  // 이벤트 버블링 차단

        setIsWished((prev) => {
        const next = !prev;
        onToggle?.(next);   // 필요할 때만 상위로 알림
        return next;
        });
    };

    return (
        <button
        type="button"
        className={className}
        aria-pressed={isWished}
        aria-label={isWished ? '위시리스트 해제' : '위시리스트 추가'}
        onClick={handleClick}
        >
        <img src={isWished ? imgOn : imgOff} alt="" />
        </button>
    );
};

    export default WishToggleButton;
