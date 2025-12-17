import { useEffect } from 'react';

const ScrollHandler = () => {
    useEffect(() => {

    const handleScroll = () => {
        const scroll = window.scrollY;

        if (scroll >= 100) {
            if (document.body.scrollHeight - 100 > window.innerHeight) {
            document.body.classList.add('scrolling');
            }
        } else {
            document.body.classList.remove('scrolling');
        }
    };

    // 스크롤 이벤트 켜기
    window.addEventListener('scroll', handleScroll);

    // 처음 로딩될 때도 한 번 체크
    handleScroll();
    
    return () => {
        window.removeEventListener('scroll', handleScroll);
        document.body.classList.remove('scrolling');
        };
    }, []);

    return null;
};

export default ScrollHandler;
