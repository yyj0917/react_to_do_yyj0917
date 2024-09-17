import React from "react";
import styled from "styled-components";

export default function CustomHeader({ date, setDate, month, handleMonthChange }) {
  return (
    <Wrapper>
        <ColorBox>
            <span className='today'>Today</span>
            <span className='great'>Great</span>
            <span className='sorry'>Sorry</span>
        </ColorBox>
        <Title>
            <h2>To Do Calendar</h2>
            <span>({date.toISOString().split('T')[0]})</span>
        </Title>
        <SelectMonth value={month} onChange={handleMonthChange}>
            {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i}>
                {new Date(0, i).toLocaleString('en-US', { month: 'long' })} {/* 월 이름 표시 */}
                </option>
            ))}
        </SelectMonth>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  align-items: center;
  width: 100%;
  height: 10%;
  margin-top: 10px;
  margin-bottom: 10px;
`;
const ColorBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 5px;
  span {
    width: 50px;
    height: 20px;
    border-radius: 10px;
    padding: 5px;
    text-align: center;
    font-size: 0.75rem;
    color: white;
  }
  @media (max-width: 768px) {
    span {
      width: 35px;
      height: 15px;
      font-size: 0.5rem;

    }
  }
  .today {
    background-color: #FF8200;
  }
  .great {
    background-color: #32AAFF;
  }
  .sorry {
    background-color: #FF5A5A;
  }
`;
const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  font-family: "Sofadi One", system-ui;
  font-weight: 400;
  font-style: normal;
  color: rgb(62, 76, 247);
  h2 {
    font-size: 1.5rem;
    margin: 0;
    @media (max-width: 768px) {
      font-size: 1.0rem;
    }
  }
  span {
    font-size: 0.75rem;
    @media (max-width: 768px) {
      font-size: 0.6rem;
    }
  }
`;

const SelectMonth = styled.select`
  padding: 5px;
  font-size: 1rem;
  border: none;
  color: rgb(62, 76, 247);
  background-color: transparent;
  box-shadow: inset 0 -1px 0 0 rgb(62, 76, 247);
  &:focus {
    outline: none;
  }
  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;
