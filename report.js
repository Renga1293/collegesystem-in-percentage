document.addEventListener('DOMContentLoaded',function(){
    var name = document.location.search.replace(/^.*?\=/,'');
    if(name == "yearone"){
        filter = 'http://localhost/yearone.php';
        fetchData(filter);
    }
    else if(name == "yeartwo"){
        filter = 'http://localhost/yeartwo.php';
        fetchData(filter);
    }
    else if(name == "yearthree"){
        filter = 'http://localhost/yearthree.php';
        fetchData(filter);
    }
    else if(name == "attenone"){
        filter = 'http://localhost/atten.php';
        fetchAtten(filter);
    }
    else if(name == "attentwo"){
        filter = 'http://localhost/attentwo.php';
        fetchAtten(filter);
    }
    else if(name == "attenthree"){
        filter = 'http://localhost/attenthree.php';
        fetchAtten(filter);
    }
    else if(name == "markone"){
        filter = 'http://localhost/mark.php';
        fetchmark(filter);
    }
    else if(name == "marktwo"){
        filter = 'http://localhost/marktwo.php';
        fetchmark(filter);
    }
    else if(name == "markthree"){
        filter = 'http://localhost/markthree.php';
        fetchmark(filter);
    }
});
function fetchData(filter){
    fetch(filter,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            },
            // body: JSON.stringify(filterValue),
        })
        .then(response => {
            if(!response.ok ) {
                throw new Error('network response was not ok!');
            }
            return response.text();
        })
        .then(data => {
            dataLog(data);
        })
        .catch(error => {
            console.log('there was a problem with the fetch operation:',error);
    });
}
function dataLog(data){
    data = JSON.parse(data);
    var year = data[0].syear;
    console.log(year);
    const departments = [... new Set(data.map(student => student.sdepartment))];
    let studentByDepartment = {};
    departments.forEach(department => {
        studentByDepartment[department] = data.filter(student => student.sdepartment === department);
    });
    if(year == "1" || year == "2" || year == "3"){
            const tablecontainer = document.getElementById('tablecontainer');
                var title = document.querySelector('.heading');
                var heading = document.createElement('h1');
                heading.textContent = "Students Report";
                title.appendChild(heading);
                const table = document.createElement('table');
                table.id = 'dataTable';
                table.className = 'departmenttable';
                const tr = document.createElement('tr');
                tr.innerHTML = `<th>Student Id</th><th>Name</th><th>Email</th><th>Password</th><th>Year</th><th>Address</th><th>Department</th><th>Faculty</th><th>Phone number</th>`;
                table.appendChild(tr);
                data.forEach((row) => {
                    const tr = document.createElement('tr');
                    tr.classList.add("rowdata");
                    tr.innerHTML=`<td>${row.studentid}</td><td>${row.sname}</td><td>${row.semail}</td><td>${row.spassword}</td><td>${row.syear}</td><td>${row.saddress}</td><td>${row.sdepartment}</td><td>${row.sfaculty}</td><td>${row.sphonenum}</td>`;
                    table.appendChild(tr);
                });
                tablecontainer.appendChild(table);
            }
}
function fetchAtten(filter){
    fetch(filter,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            },
            // body: JSON.stringify(filterValue),
        })
        .then(response => {
            if(!response.ok ) {
                throw new Error('network response was not ok!');
            }
            return response.text();
        })
        .then(data => {
            atten(data);
        })
        .catch(error => {
            console.log('there was a problem with the fetch operation:',error);
    });
}
function atten(data){
    data = JSON.parse(data);
    var year = data[0].syear;
    console.log(year);
    const departments = [... new Set(data.map(student => student.sdepartment))];
    let studentByDepartment = {};
    departments.forEach(department => {
        studentByDepartment[department] = data.filter(student => student.sdepartment === department);
    });
    if(year == "1" || year == "2" || year == "3"){
            const tablecontainer = document.getElementById('tablecontainer');
                var title = document.querySelector('.heading');
                var heading = document.createElement('h1');
                heading.textContent = "Students Report";
                title.appendChild(heading);
                const table = document.createElement('table');
                table.id = 'dataTable';
                table.className = 'departmenttable';
                const tr = document.createElement('tr');
                tr.innerHTML = `<th>Student Id</th><th>Name</th><th>Department</th><th>Year</th><th>Attendclasses</th><th>Absentclasses</th><th>Ondutyclasses</th><th>Status</th><th>Updated at</th>`;
                table.appendChild(tr);
                data.forEach((row) => {
                    const tr = document.createElement('tr');
                    tr.classList.add("rowdata");
                    tr.innerHTML=`<td>${row.studentid}</td><td>${row.sname}</td><td>${row.sdepartment}</td><td>${row.syear}</td><td>${row.attendclasses}</td><td>${row.absentclasses}</td><td>${row.ondutyclasses}</td><td>${row.astatus}</td><td>${row.updatedat}</td>`;
                    table.appendChild(tr);
                });
                tablecontainer.appendChild(table);
            }   
}
function fetchmark(filter){
    fetch(filter,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            },
            // body: JSON.stringify(filterValue),
        })
        .then(response => {
            if(!response.ok ) {
                throw new Error('network response was not ok!');
            }
            return response.text();
        })
        .then(data => {
            mark(data);
        })
        .catch(error => {
            console.log('there was a problem with the fetch operation:',error);
    });
}
function mark(data){
    data = JSON.parse(data);
    var year = data[0].syear;
    console.log(year);
    const departments = [... new Set(data.map(student => student.sdepartment))];
    let studentByDepartment = {};
    departments.forEach(department => {
        studentByDepartment[department] = data.filter(student => student.sdepartment === department);
    });
    if(year == "1"){
            const tablecontainer = document.getElementById('tablecontainer');
                var title = document.querySelector('.heading');
                var heading = document.createElement('h1');
                heading.textContent = "Students Report";
                title.appendChild(heading);
                const table = document.createElement('table');
                table.id = 'dataTable';
                table.className = 'departmenttable';
                const tr = document.createElement('tr');
                tr.innerHTML = `<th>Student Id</th><th>Name</th><th>Department</th><th>Year</th><th>Mark1</th><th>Mark2</th><th>Mark3</th>`;
                table.appendChild(tr);
                data.forEach((row) => {
                    const tr = document.createElement('tr');
                    tr.classList.add("rowdata");
                    tr.innerHTML=`<td>${row.student_id}</td><td>${row.sname}</td><td>${row.sdepartment}</td><td>${row.syear}</td><td>${row.mark1}</td><td>${row.mark2}</td><td>${row.mark3}</td>`;
                    table.appendChild(tr);
                });
                tablecontainer.appendChild(table);
            }   
    else if( year == "2" || year == "3"){
        const tablecontainer = document.getElementById('tablecontainer');
                var title = document.querySelector('.heading');
                var heading = document.createElement('h1');
                heading.textContent = "Students Report";
                title.appendChild(heading);
                const table = document.createElement('table');
                table.id = 'dataTable';
                table.className = 'departmenttable';
                const tr = document.createElement('tr');
                tr.innerHTML = `<th>Student Id</th><th>Name</th><th>Department</th><th>Year</th><th>Mark1</th><th>Mark2</th><th>Mark3</th><th>Mark4</th><th>Mark5</th>`;
                table.appendChild(tr);
                data.forEach((row) => {
                    const tr = document.createElement('tr');
                    tr.classList.add("rowdata");
                    tr.innerHTML=`<td>${row.student_id}</td><td>${row.sname}</td><td>${row.sdepartment}</td><td>${row.syear}</td><td>${row.mark1}</td><td>${row.mark2}</td><td>${row.mark3}</td><td>${row.mark4}</td><td>${row.mark5}</td>`;
                    table.appendChild(tr);
                });
                tablecontainer.appendChild(table);
            }  
}