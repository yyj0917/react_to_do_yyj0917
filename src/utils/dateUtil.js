// 요일 풀 네임 가져오는 유틸함수
export const getDayName = (date) => {
    return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
};
