debugger
document.addEventListener('DOMContentLoaded',function(){
    //fetchCourses();
    
    fetchData();
    
});
function fetchData(){
    fetch('http://localhost/markthree.php',{
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
function fetchCourses(){
    fetch('http://localhost/courses.php',{
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
            console.log(data);
        })
        .catch(error => {
            console.log('there was a problem with the fetch operation:',error);
    });   
}

function dataLog(data){
    data = JSON.parse(data);
    const departments = [... new Set(data.map(student => student.sdepartment))];
    let studentByDepartment = {};
    departments.forEach(department => {
        studentByDepartment[department] = data.filter(student => student.sdepartment === department);
    });
    for(const department in studentByDepartment){
        if(department == "computer science" ||department == "computerscience"||department == "cs"||department == "bca"||department == "bio chemistry"||department=="micro biology"||department == "bcom" || department=="bom a&f"){
            const tablecontainer = document.getElementById('tablecontainer');
            var heading = document.createElement('h2');
            heading.textContent = department;
            tablecontainer.appendChild(heading);
            const table = document.createElement('table');
            table.id = 'dataTable';
            const tr = document.createElement('tr');
            tr.innerHTML = `<th>Student ID</th><th>Name</th><th>Department</th><th>Year</th><th>Mark1</th><th>Mark2</th><th>Mark3</th><th>Mark4</th><th>Mark5</th><th>Semester</th>`;
            table.appendChild(tr);
            studentByDepartment[department].forEach((row) => {
                const tr = document.createElement('tr');
                tr.classList.add("rowdata");
                tr.innerHTML=`<td>${row.student_id}</td><td>${row.sname}</td><td>${row.sdepartment}</td><td>${row.syear}</td><td class="mark1"><input type="number" name="${row.student_id}_${row.sdepartment}" id="mark1" class="inputbut" ></td><td><input type="number" name="${row.student_id}" id="mark2" class="inputbut"></td><td><input type="number" name="${row.student_id}" id="mark3" class="inputbut"></td><td><input type="number" name="${row.student_id}" id="mark3" class="inputbut"></td><td><input type="number" name="${row.student_id}" id="mark3" class="inputbut"></td><td><input type="number" name="${row.student_id}" id="mark3" class="inputbut"></td>`;
                table.appendChild(tr);
            });
            tablecontainer.appendChild(table);
        }
    }
}
function submission(){
    var markData = [];
        var rows = document.querySelectorAll("tr.rowdata");
        console.log(rows.length);
        rows.forEach(function(row){
            var find = row.querySelector("input");
            var id = find.getAttribute("name").split('_')[0];
            var dep = find.getAttribute("name").split('_')[1];
            if(dep == "Bcom" || dep == "computer science"){
                var inputs = row.querySelectorAll("input[type = 'number']");
                var mark1,mark2,mark3,mark4,mark5,sem;
                inputs.forEach(function(input){
                    if(mark1 === undefined){
                        mark1 = input.value;
                    }
                    else if(mark2 === undefined){
                        mark2 = input.value
                    }
                    else if(mark3 === undefined){
                        mark3 = input.value;
                    }
                    else if(mark4 === undefined){
                        mark4 = input.value;
                    }
                    else if(mark5 === undefined ){
                        mark5 = input.value;
                    }
                    else if(sem === undefined){
                        sem = input.value;
                    }
                })
            }

        markData.push({"id":id,"department":dep,"mark1":mark1,"mark2":mark2,"mark3":mark3,"mark4":mark4,"mark5":mark5,"sem":sem});
    })
    fetchPostData(markData);
    alert("updated sucessfully");
    location.reload();
}
function fetchPostData(filterValue){
    fetch('http://localhost/markthree.php',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            },
            body: JSON.stringify(filterValue),
        })
        .then(response => {
            if(!response.ok ) {
                throw new Error('network response was not ok!');
            }
            return response.text();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log('there was a problem with the fetch operation:',error);
    });
}

function report(){
    var filter = "markthree";
    window.location.href = 'A:/mini web/admin/report.html' + '?filter=' + filter;
}