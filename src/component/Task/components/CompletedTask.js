import React, { useEffect } from 'react';
import styled from "styled-components";
import { getTasksFromLocalStorage, saveTasksToLocalStorage } from '../../../utils/LocalStorageUtil';


export default function CompletedTask({ tasks, setTasks, handleDeleteTask, selectedDate }) {
    
    useEffect(() => {
        const formattedDate = selectedDate.toISOString().split('T')[0]; // YYYY-MM-DD 형식
        const loadedTasks = getTasksFromLocalStorage(formattedDate);

        // Map으로 taskId와 task를 매핑
        const newTaskMap = new Map();
        loadedTasks.forEach(task => newTaskMap.set(task.id, task));

        setTasks(newTaskMap);
    }, [selectedDate, setTasks]);

    const handleCancelTask = (taskId) => {
        const formattedDate = selectedDate.toISOString().split('T')[0];
        if (tasks.has(taskId)) {
            if (window.confirm('완료된 할 일을 취소하시겠습니까?')) {  // 완료 확인
                const task = tasks.get(taskId); // 기존 task 복사
                const updatedTask = {
                    ...task,
                    completed: !task.completed,
                    completedTime: null,
                };
            
                tasks.set(taskId, updatedTask); // 기존 Map 수정
            
                setTasks(new Map(tasks)); // 새로운 Map을 생성하지 않고 기존 Map을 수정한 후 상태를 업데이트
                saveTasksToLocalStorage(formattedDate, Array.from(tasks.values()));
            }
        }
    };
    // 완료 시간 순으로 정렬된 Completed Tasks
    const sortedCompletedTasks = Array.from(tasks.values())
        .filter((task) => task.completed)
        .sort((a, b) => new Date(a.completedTime) - new Date(b.completedTime));

  return (
        <TaskItemsContainer>
            {/* 작업이 없을 때 메시지 출력 */}
            {sortedCompletedTasks.length === 0 && (
                <p style={{'margin': 'auto', 'fontSize': '1.2rem', 'color': 'gray'}}>
                    Complete your tasks
                </p>
                )}
            {/* 작업 리스트 출력 */}
            {sortedCompletedTasks.map((task) => (
                <TaskItem
                    key={task.id}
                    className={task.completed ? 'completed' : ''}
                >
                    <p className='task-text'>
                        {task.text}                                        
                    </p>
                    <p className='task-time'>
                        <span className='util-btn'>
                            <button onClick={() => handleCancelTask(task.id)}>Cancel</button>
                            <button onClick={()=>handleDeleteTask(task.id)}>Delete</button>
                        </span>
                        <span>완료시간 : {task.completedTime}</span>
                    </p>
                </TaskItem>
            ))}
        </TaskItemsContainer>
  );
}
const TaskItemsContainer = styled.div`
    margin-top: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    height: 100%; 
    overflow-y: auto; 
    /* 스크롤바 숨기기 */
    &::-webkit-scrollbar {
        display: none; /* 크롬, 사파리, 엣지에서 스크롤바 숨기기 */
    }
    -ms-overflow-style: none;  /* IE와 Edge에서 스크롤바 숨기기 */
    scrollbar-width: none;  /* Firefox에서 스크롤바 숨기기 */
`;


const TaskItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: auto;
    height: auto;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px; 
    &:hover {
        background-color: #f0f0f0;
    }
    transition: all 0.5s ease; 
    .task-text {
        margin: 0;
        font-size: 1rem;
        display: flex;
        justify-content: space-between;
        overflow-wrap: break-word;
    }
    .task-time {
        display: flex;
        justify-content: flex-end;
        gap: 5px;
        margin: 0;
        font-size: 0.8rem;
        color: gray;
    }
    .util-btn {
        display: flex;
        cursor: pointer;
        button {
            border: none;
            background-color: transparent;
            color: #007bff;
            cursor: pointer;
            &:hover {
                text-decoration: underline;
            }
        }
    }
    @media (max-width: 768px) {
        .task-text {
            font-size: 0.9rem;
        }
        .task-time {
            font-size: 0.7rem;
        }
    }

`;