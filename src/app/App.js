import React, { useState } from 'react';
import './App.css';
import CalendarContainer from '../component/Calendar/CalendarContainer';
import Task from '../component/Task/Task';
import styled from 'styled-components';

function App() {
  // 선택된 날짜 상태 -> Date 객체 정의
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  // 날짜 선택 핸들러
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsTaskModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsTaskModalOpen(false); // 모달 닫기
  };

  return (
    <>      
      <Container>
        {/* Task가 보이는 상태면 달력을 숨기고, 그렇지 않으면 달력을 표시 */}
        {!isTaskModalOpen ? (
          <CalendarContainer onDateChange={handleDateChange} />
        ) : (
          <>
            <Task selectedDate={selectedDate} handleCloseModal={handleCloseModal} />
          </>
        )}
      </Container>
    </>
  );
}
const Container = styled.div`
  z-index: 1;
  width: 560px;
  height: 560px;
  border-radius: 28px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: width 0.5s ease;

  @media (max-width: 768px) {
    width: 360px;
  }
`;

export default App;
