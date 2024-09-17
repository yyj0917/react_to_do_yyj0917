import React from 'react';
import styled from 'styled-components';

export default function TabIndicator({ activeIndex, setActiveIndex }) {
    return (
        <>
            {/* Pending Tasks 탭 */}
            <RadioInput
                type="radio"
                id="tab1"
                name="tab"
                checked={activeIndex === 0}
                onChange={() => setActiveIndex(0)}
            />
            <TabLabel htmlFor="tab1">Pending Tasks</TabLabel>
            <ActiveTabIndicator style={{ left: `calc(${activeIndex * 100}% / 2)` }} />

            {/* Completed Tasks 탭 */}
            <RadioInput
                type="radio"
                id="tab2"
                name="tab"
                checked={activeIndex === 1}
                onChange={() => setActiveIndex(1)}
            />
            <TabLabel htmlFor="tab2">Completed Tasks</TabLabel>
        </>
    );
}

const RadioInput = styled.input`
  display: none;

  &:checked + label {
    color: white;
  }

  &:checked + label + div {
    left: ${({ index }) => `calc(${index * 100}% / 2)`};
  }
`;

const TabLabel = styled.label`
  flex: 1;
  padding: 15px 20px;
  background-color: transparent;
  cursor: pointer;
  font-size: 16px;
  color: #333;
  text-align: center;
  position: relative;
  z-index: 1;
  transition: color 0.3s ease;

  &:hover {
    background-color: rgba(1, 0, 0, 0.01);
  }
  @media (max-width: 768px) {
    font-size: 12px;
  } 
`;

const ActiveTabIndicator = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% / 2);
  height: 100%;
  background-color: rgb(62, 76, 247);
  border-radius: 25px;
  transition: left 0.3s ease;
  z-index: 0;
`;