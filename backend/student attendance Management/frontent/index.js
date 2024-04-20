const baseUrl = 'http://localhost:3000/attendance';

function searchAttendance() {
    const selectedDate = document.getElementById('date').value;

    const studentAttendanceData = [
        { name: 'joe'},
        { name: 'maya' },
        { name: 'jaya' },
        { name: 'maie' }
    ];

    const attendanceTable = document.getElementById('attendanceTable');
    const attendanceTableBody = document.getElementById('attendanceTableBody');
    attendanceTableBody.innerHTML = ''; // Clear previous content

    studentAttendanceData.forEach(student => {
        const row = attendanceTableBody.insertRow();
        const nameCell = row.insertCell(0);
        const attendanceCell = row.insertCell(1);

        nameCell.textContent = student.name;

        const presentRadio = document.createElement('input');
        presentRadio.type = 'radio';
        presentRadio.name = student.name;
        presentRadio.value = 'present';

        const absentRadio = document.createElement('input');
        absentRadio.type = 'radio';
        absentRadio.name = student.name;
        absentRadio.value = 'absent';

        const radioContainer = document.createElement('div');
        radioContainer.classList.add('attendance-radio');
        radioContainer.appendChild(presentRadio);
        radioContainer.appendChild(document.createTextNode('Present'));
        radioContainer.appendChild(document.createElement('br'));
        radioContainer.appendChild(absentRadio);
        radioContainer.appendChild(document.createTextNode('Absent'));

        attendanceCell.appendChild(radioContainer);

        submitBtn.style.display = 'block';
    });

    attendanceTable.style.display = 'table'; // Show the attendance table
}

async function submitAttendance() {
    try {
        const selectedDate = document.getElementById('date').value;
        const attendanceData = [];

        const tableRows = document.querySelectorAll('#attendanceTableBody tr');
        tableRows.forEach(row => {
            const name = row.cells[0].textContent;
            const attendance = row.cells[1].querySelector('input:checked').value;
            attendanceData.push({ name, attendance });
        });

        const requestBody = {
            date: selectedDate,
            attendance: attendanceData
        };
        
        const response = await axios.post(baseUrl, requestBody);
        displayAttendanceStatus(response.data)
    } catch (error) {
        console.error('Error submitting attendance:', error);
    }
}

function displayAttendanceStatus(attendanceRecord) {

    const attendanceTableBody = document.getElementById('attendanceTableBody');
    attendanceTableBody.innerHTML = ''; // Clear previous content

    Object.keys(attendanceRecord).forEach(key => {
        if (key !== 'date' && key !== 'createdAt' && key !== 'updatedAt') {
            const row = document.createElement('tr');

            const nameCell = document.createElement('td');
            nameCell.textContent = key; 

            const statusCell = document.createElement('td');
            const dotElement = document.createElement('div');
            dotElement.classList.add(attendanceRecord[key] ? 'green-dot' : 'red-dot');
            statusCell.appendChild(dotElement);
            statusCell.appendChild(document.createTextNode(attendanceRecord[key] ? 'present' : 'absent'));

            row.appendChild(nameCell);
            row.appendChild(statusCell);
            attendanceTableBody.appendChild(row);
        }
    });
}

async function showAttendanceReport() {
    try{
        const response = await axios.get(baseUrl);
        const reportData=response.data;           

        const attendanceTableBody = document.getElementById('attendanceTableBody');
        attendanceTableBody.innerHTML = ''; // Clear previous content

        Object.keys(reportData).forEach(studentName => {
            if (studentName !== 'dates') {
                const row = attendanceTableBody.insertRow();
                const nameCell = row.insertCell(0);
                const attendanceCell = row.insertCell(1);
                const percentageCell = row.insertCell(2);

                const totalClasses = reportData.dates;
                const attendedClasses = reportData[studentName];
                const attendancePercentage = (attendedClasses / totalClasses) * 100;

                nameCell.textContent = studentName;
                attendanceCell.textContent = `${attendedClasses}/${totalClasses}`;
                percentageCell.textContent = `${attendancePercentage.toFixed(0)}%`;
            }
        });

        const attendanceTable = document.getElementById('attendanceTable');
        attendanceTable.style.display = 'table'; // Show the attendance table

    } catch(err){
        console.log(err)
    }
}