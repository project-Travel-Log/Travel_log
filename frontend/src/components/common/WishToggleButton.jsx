import React from 'react';

const WishToggleButton = ({
    active = false,
    onToggle,
    className = '',
    imgOff = '/images/login/wishlist_w.png',
    imgOn = '/images/login/wishlist_r.png',
}) => {
    return (
        <button
            type="button"
            className={className}
            aria-pressed={active}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggle?.();  
            }}
        >
            <img src={active ? imgOn : imgOff} alt="" />
        </button>
    );
};

export default WishToggleButton;



//     import React, { useEffect, useState } from 'react';

// const WishToggleButton = ({
//     defaultWished = false,
//     onToggle,
//     className = '',
//     imgOff = '/images/login/wishlist_w.png',
//     imgOn = '/images/login/wishlist_r.png',
// }) => {
//     const [isWished, setIsWished] = useState(defaultWished);

//     useEffect(() => {
//         setIsWished(defaultWished);
//     }, [defaultWished]);

//     const handleClick = (e) => {
//         e.preventDefault();   // Link 이동 막기
//         e.stopPropagation();  // 이벤트 버블링 차단

//         setIsWished((prev) => {
//         // const next = !prev;
//         const next = !isWished;
//         onToggle?.(next);   // 필요할 때만 상위로 알림
//         return next;
//         });
//     };

//     return (
//         <button
//         type="button"
//         className={className}
//         aria-pressed={isWished}
//         // aria-label={isWished ? '위시리스트 해제' : '위시리스트 추가'}
//         onClick={handleClick}
//         >
//         <img src={isWished ? imgOn : imgOff} alt="" />
//         </button>
//     );
// };

//     export default WishToggleButton;