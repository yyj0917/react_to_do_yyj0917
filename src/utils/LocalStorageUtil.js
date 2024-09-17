// 로컬스토리지에서 투두리스트 가져오기
export const getTasksFromLocalStorage = (date) => {
    const tasks = localStorage.getItem(`tasks-${date}`);
    return tasks ? JSON.parse(tasks) : [];
  };
  
// 로컬스토리지에 투두리스트 저장하기
export const saveTasksToLocalStorage = (date, tasks) => {
localStorage.setItem(`tasks-${date}`, JSON.stringify(tasks));
};

// 날짜에 맞는 투두리스트를 가져와 성취도를 계산하는 함수
export const getTodoProgressForDate = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    const tasksKey = `tasks-${formattedDate}`; // 로컬 스토리지 키
    const tasks = JSON.parse(localStorage.getItem(tasksKey)) || []; // 로컬 스토리지에서 데이터 가져오기
  
    // 완료된 항목 수와 총 항목 수 계산
    const completed = tasks.filter((task) => task.completed).length;
    const total = tasks.length;
  
    return { completed, total };
  };
  
  