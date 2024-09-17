import React, { useState } from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import './custom-calendar.css'; // 커스텀 CSS 파일
import { getTodoProgressForDate } from '../../utils/LocalStorageUtil';
import CustomHeader from './components/CustomHeader';


function CalendarContainer({ onDateChange }) {
  const [date, setDate] = useState(new Date());
  const [month, setMonth] = useState(date.getMonth());

  const handleChange = (selectedDate) => {
    setDate(selectedDate);
    onDateChange(selectedDate); // 부모 컴포넌트로 선택된 날짜 전달
  };
  // 월 변경 핸들러
  const handleMonthChange = (e) => {
    const selectedMonth = parseInt(e.target.value);
    const newDate = new Date(date.getFullYear(), selectedMonth, 1);
    setDate(newDate);
    setMonth(selectedMonth);
  };
  // 각 타일에 내용을 추가하는 함수
  const tileContent = ({ date, view }) => {
    if (view === 'month') { // 월간 뷰일 때만 표시
      const { completed, total } = getTodoProgressForDate(date); // 성취도 계산
      if (total > 0) { // 할 일이 있는 경우에만 표시
        return (
          <TodoProgress>
            {completed}/{total}
          </TodoProgress>
        );
      }
    }
    return null;
  };

  // 특정 조건에 따라 날짜에 클래스 이름을 할당하는 함수
  const getTileClassName = ({ date, view }) => {
    if (view === 'month') {
      const { completed, total } = getTodoProgressForDate(date); // 성취도 계산
      if (date === new Date().toISOString().split('T')[0]) {
        return 'today'; // 오늘 날짜를 하이라이트
        } else if (completed === total && completed > 0 && total > 0) {
          return 'great'; // 모든 할 일이 완료된 경우
      } else if (completed !== total && total > 0) {
        return 'sorry'; // 할 일이 없는 경우
      } else if (completed === 0 && total === 0) {
        return 'none'; // 할 일이 없는 경우
      }
    }
    return null;
  };

  return (
    <>      
      <Wrapper>
        <CustomHeader
          date={date} 
          month={month} 
          setDate={setDate} 
          handleMonthChange={handleMonthChange} 
        />
        <Calendar
          locale='en-GB' // 영국 버전 -> 월요일부터 시작
          onChange={handleChange}
          value={date}
          tileContent={tileContent} // 타일 콘텐츠 추가
          tileClassName={getTileClassName} // tileClassName 속성 사용
          showNeighboringMonth={true} // 이전 및 다음 달 날짜 표시
          showNavigation={false}  // 기본 네비게이션 숨기기
        />
      </Wrapper>
    </>
  );
}
const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin: auto;
  background-color: white; /* 배경 색상 */
  border-radius: 28px;
  padding: 20px;
`;
const TodoProgress = styled.div`
  position: absolute;
  top: 40px;
  font-size: 0.75rem;
  color: #666;
  margin-top: 5px;

`;
export default CalendarContainer;
