import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TooltipContainer = styled.div`
  position: absolute;
  background-color: rgba(12, 0, 0, 0.75);
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 10px;
  top: -30px; /* 조정 필요 */
  left: 50%; /* 조정 필요 */
  transform: translateX(-50%);
  white-space: nowrap;
  z-index: 1000;
`;
function Tooltip({ text }) {
  return <TooltipContainer>{text}</TooltipContainer>;
}

// PropType 정의
Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
};
export default Tooltip;
