// script.js
document.addEventListener('DOMContentLoaded', () => {
    const studentElements = document.querySelectorAll('.student');
    const presentBtn = document.getElementById('present-btn');
    const absentBtn = document.getElementById('absent-btn');
    const deleteBtn = document.getElementById('delete-btn');
    const presentCount = document.getElementById('present-count');
    const absentCount = document.getElementById('absent-count');
    const deleteCount = document.getElementById('delete-count');
    const historyLog = document.getElementById('history-log');

    let selectedStudents = [];

    studentElements.forEach(student => {
        student.addEventListener('click', () => {
            if (selectedStudents.includes(student)) {
                student.classList.remove('selected');
                selectedStudents = selectedStudents.filter(s => s !== student);
            } else {
                student.classList.add('selected');
                selectedStudents.push(student);
            }
        });
    });

    presentBtn.addEventListener('click', () => {
        selectedStudents.forEach(student => {
            student.classList.add('present');
            student.classList.remove('absent');
            student.classList.remove('selected');
            addHistoryEntry(student.textContent, 'Present');
        });
        updateCounts();
        selectedStudents = [];
    });

    absentBtn.addEventListener('click', () => {
        selectedStudents.forEach(student => {
            student.classList.add('absent');
            student.classList.remove('present');
            student.classList.remove('selected');
            addHistoryEntry(student.textContent, 'Absent');
        });
        updateCounts();
        selectedStudents = [];
    });

    deleteBtn.addEventListener('click', () => {
        selectedStudents.forEach(student => {
            student.remove();
            addHistoryEntry(student.textContent, 'Deleted');
        });
        updateCounts();
        selectedStudents = [];
    });

    function updateCounts() {
        const presentStudents = document.querySelectorAll('.student.present').length;
        const absentStudents = document.querySelectorAll('.student.absent').length;
        const totalStudents = document.querySelectorAll('.student').length;
        presentCount.textContent = presentStudents;
        absentCount.textContent = absentStudents;
        deleteCount.textContent = totalStudents - presentStudents - absentStudents;
    }

    function addHistoryEntry(name, action) {
        const listItem = document.createElement('li');
        listItem.textContent = `${name} marked as ${action}`;
        historyLog.appendChild(listItem);
    }
});
