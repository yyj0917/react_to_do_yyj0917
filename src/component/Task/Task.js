import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // 고유 ID 생성을 위해 uuid 사용
import styled from 'styled-components';
import { getTodoProgressForDate, saveTasksToLocalStorage } from '../../utils/LocalStorageUtil';
import { CalendarDays, CopyPlus, Medal, Plus, Undo2 } from 'lucide-react';
import PendingTask from './components/PendingTask';
import CompletedTask from './components/CompletedTask';
import TabIndicator from './components/TabIndicator';
import Tooltip from '../../utils/Tooltip';
import Swal from 'sweetalert2';
import { getDayName } from '../../utils/dateUtil';



function Task({ selectedDate, handleCloseModal }) {
    const [tasks, setTasks] = useState(new Map()); // 해시맵 구조로 tasks를 관리
    const [newTask, setNewTask] = useState('');
    const [addModal, setAddModal] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [tooltip, setTooltip] = useState(null); // tooltip 상태
    const { completed, total } = getTodoProgressForDate(selectedDate); // 성취도 계산
    const formattedDate = selectedDate.toISOString().split('T')[0];

    const updateTasks = (newTasks) => {
        setTasks(new Map(newTasks)); // 중복 제거
        saveTasksToLocalStorage(formattedDate, Array.from(newTasks.values()));
    };
    
    
    const handleAddTask = () => {
        if (newTask.trim() === '') return;
        const taskId = uuidv4();
        const createdTime = new window.Date().toLocaleTimeString(); 
    
        const newTaskObj = { 
          id: taskId, 
          text: newTask, 
          completed: false, 
          completedTime: null,
          createdTime: createdTime // 작성 시간 추가
        };
    
        // 기존 Map 수정 후 상태 업데이트
        tasks.set(taskId, newTaskObj);
        setNewTask('');
        updateTasks(tasks);
    };

    const handleDeleteTask = (taskId) => {        
        if (window.confirm('정말로 삭제하시겠습니까?')) { // 삭제 확인
            if (tasks.has(taskId)) {
                tasks.delete(taskId); // 해당 task 삭제
                
                updateTasks(tasks);
            }
        }
    };

    // Alert 창 커스텀 유틸 함수
    const showAlert = (title, text, icon, confirmButtonText) => {
        Swal.fire({
            title,
            text,
            icon,
            confirmButtonText,
            width: '360px',
            position: 'center',
            customClass: {
                popup: 'custom-popup',
            },
            heightAuto: false,
        });
    };

    const handleTodoCheck = () => {
        if (completed === total && total > 0) {
            showAlert('축하합니다!', '모든 할 일이 완료되었습니다!', 'success', '오예!');
        } else if (completed !== total && total > 0) {
            showAlert('아쉽습니다!', '아직 할 일을 다 완료하지 못하였습니다.', 'warning', '그래..');
        } else if (total === 0) {
            showAlert('할 일이 없습니다!', '할 일을 추가해보세요.', 'info', '넵!');
        }
    };
    
    // tooltip function
    const showTooltip = (text) => setTooltip(text);
    const hideTooltip = () => setTooltip(null);
    
    return (
        <>      
            <Wrapper>
                <Date>
                    {getDayName(selectedDate)}, {selectedDate.getDate()}th
                </Date>
                <TaskList>
                    <TabContainer>
                        <TabIndicator 
                            activeIndex={activeIndex} 
                            setActiveIndex={setActiveIndex} 
                            />
                    </TabContainer>
                    <TabContent>
                        {/* Pending Tasks 컨텐츠 */}
                        {activeIndex === 0 && (
                            <PendingTask 
                                tasks={tasks} 
                                setTasks={setTasks} 
                                handleDeleteTask={handleDeleteTask}
                                selectedDate={selectedDate}
                                />
                        )}

                        {/* Completed Tasks 컨텐츠 */}
                        {activeIndex === 1 && (
                            <CompletedTask 
                                tasks={tasks} 
                                setTasks={setTasks} 
                                handleDeleteTask={handleDeleteTask}
                                selectedDate={selectedDate}
                                />
                        )}
                    </TabContent>
                </TaskList>
                <TaskFooter>
                    {addModal ? 
                        <AddTask>
                            <input
                                type="text"
                                value={newTask}
                                onChange={(e) => setNewTask(e.target.value)}
                                placeholder="Add a new task"
                                required
                                autoComplete='on'
                                onKeyUp={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();  // 기본 Enter 키 동작 막기
                                        handleAddTask();
                                    }
                                }}
                            />
                            <span 
                                onClick={handleAddTask}
                                onMouseEnter={() => showTooltip('추가하기')}
                                onMouseLeave={hideTooltip}>
                                <CopyPlus/>
                                {tooltip === '추가하기' && <Tooltip text="추가하기" />}
                            </span>
                            <span 
                                onClick={() => setAddModal(false)}
                                onMouseEnter={() => showTooltip('뒤로가기')}
                                onMouseLeave={hideTooltip}>
                                <Undo2/>
                                {tooltip === '뒤로가기' && <Tooltip text="뒤로가기" />}
                            </span>
                        </AddTask>
                    : 
                        <BtnSpan>
                            <span 
                                className='calendar' 
                                onClick={handleCloseModal}
                                onMouseEnter={() => showTooltip('캘린더이동')}
                                onMouseLeave={hideTooltip}>
                                <CalendarDays/>
                                {tooltip === '캘린더이동' && <Tooltip text="캘린더이동" />}
                            </span>
                            <span 
                                className='acheive' 
                                onClick={handleTodoCheck}
                                onMouseEnter={() => showTooltip('성취도확인')}
                                onMouseLeave={hideTooltip}>
                                <Medal/>
                                <p>
                                    {completed} / {total}
                                </p>
                                {tooltip === '성취도확인' && <Tooltip text="성취도확인" />}
                            </span>
                            <span 
                                className='add' 
                                onClick={() => setAddModal(true)}
                                onMouseEnter={() => showTooltip('추가하기')}
                                onMouseLeave={hideTooltip}>
                                <Plus/>
                                {tooltip === '추가하기' && <Tooltip text="추가하기" />}
                            </span>
                        </BtnSpan>
                    }
                </TaskFooter>
            </Wrapper>
        </>
    );
}

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
`;
const Date = styled.div`
    position: relative;
    width: 100%;
    height: 15%;
    font-size: 1.5rem;
    font-weight: bold;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #ccc;
`;
const TaskList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 70%;
`;
const TabContainer = styled.div`
  display: flex;
  background-color: whitesmoke;
  border-radius: 25px;
  overflow: hidden;
  position: relative;
  margin-top: 10px;
  width: 80%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;
const TabContent = styled.div`
  width: 80%;
  height: 85%;
  margin: auto;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
`;
const TaskFooter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 15%;
    padding: 0 10px;
    border-top: 1px solid #ccc;
`;
const AddTask = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    gap: 10px;
    input {
        width: 50%;
        height: 100%;
        padding: 10px;
        border: none;
        box-shadow: inset 0px -1px 0px 0px rgb(62, 76, 247);
        font-size: 1rem;
        &::placeholder {
            color: rgb(62, 76, 247);
        }
    }
    span {
        position: relative;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        color: rgb(62, 76, 247);
        border-radius: 50%;
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        &:hover {
            background-color: #f0f0f0;
        }
    }
`;
const BtnSpan = styled.div`
    padding: 20px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    gap: 10px;
    span {
        position: relative;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid rgb(62, 76, 247);
        background-color: #fff;
        color:  rgb(62, 76, 247);
        cursor: pointer;
        &:hover {
            background-color: #f0f0f0;
        }
    }
    .acheive {
            padding: 0 20px;
            width: auto;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            border: 2px solid rgb(62, 76, 247);
            color: rgb(62, 76, 247);
            border-radius: 28px;
            cursor: pointer;
            &:hover {
                background-color: #f0f0f0;
            }
        }
`;  

export default Task;
