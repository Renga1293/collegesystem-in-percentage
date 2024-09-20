debugger
var filter;
filter = document.location.search.replace(/^.*?\=/,'');
console.log(filter);
var json = {
    "method":"detail",
    "id":filter
}
var json1 = {
    "method":"attend",
    "id":filter
}
var json2 = {
    "method":"mark",
    "id":filter
}
function fetchDetail(filter){
    fetch('http://localhost/students.php',{
        method:'POSt',
        headers:{
            'Content-Type':'application/json',
            },
            body: JSON.stringify(filter),
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
    const tablecontainer = document.getElementById('tablecontainer');
    const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    data.forEach((row) => {
        var tr = document.createElement('tr');
        tr.classList.add("rowdata");
        tr.innerHTML=`<td><h4>StudentID</h4></td><td>${row.studentid}</td>`;
        table.appendChild(tr);
        tr = document.createElement('tr');
        tr.classList.add("rowdata");
        tr.innerHTML=`<td><h4>Name</h4></td><td>${row.sname}</td>`;
        table.appendChild(tr);
        tr = document.createElement('tr');
        tr.classList.add("rowdata");
        tr.innerHTML=`<td><h4>Mail Id</h4></td><td>${row.semail}</td>`;
        table.appendChild(tr);
        tr = document.createElement('tr');
        tr.classList.add("rowdata");
        tr.innerHTML=`<td><h4>Password</h4></td><td>${row.spassword}</td>`;
        table.appendChild(tr);
        tr = document.createElement('tr');
        tr.classList.add("rowdata");
        tr.innerHTML=`<td><h4>Year</h4></td><td>${row.syear}</td>`;
        table.appendChild(tr);
        tr = document.createElement('tr');
        tr.classList.add("rowdata");
        tr.innerHTML=`<td><h4>Address</h4></td><td>${row.saddress}</td>`;
        table.appendChild(tr);
        tr = document.createElement('tr');
        tr.classList.add("rowdata");
        tr.innerHTML=`<td><h4>Department</h4></td><td class="dept">${row.sdepartment}</td>`;
        table.appendChild(tr);
        tr = document.createElement('tr');
        tr.classList.add("rowdata");
        tr.innerHTML=`<td><h4>Class Incharge</h4></td><td>${row.sfaculty}</td>`;
        table.appendChild(tr);
        tr = document.createElement('tr');
        tr.classList.add("rowdata");
        tr.innerHTML=`<td><h4>Phone Number</h4></td><td>${row.sphonenum}</td>`;
        table.appendChild(tr);
    })
}
function fetchattend(filter){
    fetch('http://localhost/students.php',{
        method:'POSt',
        headers:{
            'Content-Type':'application/json',
            },
            body: JSON.stringify(filter),
        })
        .then(response => {
            if(!response.ok ) {
                throw new Error('network response was not ok!');
            }
            return response.text();
        })
        .then(data => {
            dataatten(data);
        })
        .catch(error => {
            console.log('there was a problem with the fetch operation:',error);
    });
}
function dataatten(data){
    data = JSON.parse(data);
    const tablecontainer = document.getElementById('tablecontainer');
    const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    data.forEach((row) => {
        var tr = document.createElement('tr');
        tr.classList.add("rowdata");
        tr.innerHTML=`<td><h4>AttendClasses</h4></td><td>${row.attendclasses}</td>`;
        table.appendChild(tr);
        tr = document.createElement('tr');
        tr.classList.add("rowdata");
        tr.innerHTML=`<td><h4>AbsentClasses</h4></td><td>${row.absentclasses}</td>`;
        table.appendChild(tr);
        tr = document.createElement('tr');
        tr.classList.add("rowdata");
        tr.innerHTML=`<td><h4>Ondutyclasses</h4></td><td>${row.ondutyclasses}</td>`;
        table.appendChild(tr);
        tr = document.createElement('tr');
        tr.classList.add("rowdata");
        tr.innerHTML=`<td><h4>TodayStatus</h4></td><td>${row.astatus}</td>`;
        table.appendChild(tr);
        tr = document.createElement('tr');
        tr.classList.add("rowdata");
        tr.innerHTML=`<td><h4>Updated at</h4></td><td>${row.updatedat}</td>`;
        table.appendChild(tr);
        var present = +data[0].attendclasses;
        var absent = +data[0].absentclasses;
        var tot = present + absent;
        var percent = (present / tot) * 100;
        var perround = Math.round(percent);
        tr = document.createElement('tr');
        tr.classList.add("rowdata");
        tr.innerHTML=`<td><h4>Percentage</h4></td><td>${perround}%</td>`;
        table.appendChild(tr);
    })   
}

function fetchMark(filter){
    fetch('http://localhost/students.php',{
        method:'POSt',
        headers:{
            'Content-Type':'application/json',
            },
            body: JSON.stringify(filter),
        })
        .then(response => {
            if(!response.ok ) {
                throw new Error('network response was not ok!');
            }
            return response.text();
        })
        .then(data => {
            datamark(data);
        })
        .catch(error => {
            console.log('there was a problem with the fetch operation:',error);
    });   
}
function datamark(data){
    data = JSON.parse(data);
    var depart = document.querySelector('.dept');
    var dept = depart.innerText;
    const tablecontainer = document.getElementById('tablecontainer');
    const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    data.forEach((row) => {
        if(row.mark1 != null && row.mark2 != null && row.mark3 != null && row.mark4 != null && row.mark5 != null)    
        {    
            var mark1 = +row.mark1;
            var mark2 = +row.mark2;
            var mark3 = +row.mark3;
            var mark4 = +row.mark4;
            var mark5 = +row.mark5;
            var tot = mark1+mark2+mark3+mark4+mark5;
            var percent = (tot/500)*100;
            var tr = document.createElement('tr');
            tr.classList.add("rowdata");
            tr.innerHTML=`<td><h4>Last Semester Marks</h4></td><td>${row.mark1},${row.mark2},${row.mark3},${row.mark4},${row.mark5}</td>`;
            table.appendChild(tr);
            var tr = document.createElement('tr');
            tr.classList.add("rowdata");
            tr.innerHTML=`<td><h4>Last semster percentage</h4></td><td>${percent}%</td>`;
            table.appendChild(tr);
        }
        else if(row.mark1 != null && row.mark2 != null && row.mark3 != null && row.mark4 != null)    
        {    
            var mark1 = +row.mark1;
            var mark2 = +row.mark2;
            var mark3 = +row.mark3;
            var mark4 = +row.mark4;
            var tot = mark1+mark2+mark3+mark4;
            var percent = (tot/400)*100;
            var tr = document.createElement('tr');
            tr.classList.add("rowdata");
            tr.innerHTML=`<td><h4>Marks</h4></td><td>${row.mark1},${row.mark2},${row.mark3},${row.mark4}</td>`;
            table.appendChild(tr);
            var tr = document.createElement('tr');
            tr.classList.add("rowdata");
            tr.innerHTML=`<td><h4>Last semster percentage</h4></td><td>${percent}%</td>`;
            table.appendChild(tr);
        }
        else if(row.mark1 != null && row.mark2 != null && row.mark3 != null)    
        {    
            var mark1 = +row.mark1;
            var mark2 = +row.mark2;
            var mark3 = +row.mark3;
            var tot = mark1+mark2+mark3;
            var percent = (tot/300)*100;
            var tr = document.createElement('tr');
            var tr = document.createElement('tr');
            tr.classList.add("rowdata");
            tr.innerHTML=`<td><h4>Marks</h4></td><td>${row.mark1},${row.mark2},${row.mark3}</td>`;
            table.appendChild(tr);
            var tr = document.createElement('tr');
            tr.classList.add("rowdata");
            tr.innerHTML=`<td><h4>Last semster percentage</h4></td><td>${percent}%</td>`;
            table.appendChild(tr);
        }
        if(row.sem1 != null && row.sem2 != null && row.sem3 != null && row.sem4 != null && row.sem5 != null && row.sem6 != null){
            var tr = document.createElement('tr');
            tr.classList.add("rowdata");
            tr.innerHTML=`<td><h4>1st Semester Total</h4></td><td>${row.sem1}</td>`;
            table.appendChild(tr);
            var tr = document.createElement('tr');
            tr.classList.add("rowdata");
            tr.innerHTML=`<td><h4>2nd Semester Total</h4></td><td>${row.sem2}</td>`;
            table.appendChild(tr);
            var tr = document.createElement('tr');
            tr.classList.add("rowdata");
            tr.innerHTML=`<td><h4>3rd Semester Total</h4></td><td>${row.sem3}</td>`;
            table.appendChild(tr);
            var tr = document.createElement('tr');
            tr.classList.add("rowdata");
            tr.innerHTML=`<td><h4>4th Semester Total</h4></td><td>${row.sem4}</td>`;
            table.appendChild(tr);
            var tr = document.createElement('tr');
            tr.classList.add("rowdata");
            tr.innerHTML=`<td><h4>5th Semester Total</h4></td><td>${row.sem5}</td>`;
            table.appendChild(tr);
            var tr = document.createElement('tr');
            tr.classList.add("rowdata");
            tr.innerHTML=`<td><h4>6th Semester Total</h4></td><td>${row.sem6}</td>`;
            table.appendChild(tr);
            var sem1 = +row.sem1;
            var sem2 = +row.sem2;
            var sem3 = +row.sem3;
            var sem4 = +row.sem4;
            var sem5 = +row.sem5;
            var sem6 = +row.sem6;
            var tot = sem1+sem2+sem3+sem4+sem5+sem6;
            if(dept == "computer science" || dept == "micro biology" || dept == "bio chenistry"){
                percent = (tot/2200) * 100;
                var end = Math.round(percent);
                var tr = document.createElement('tr');
                tr.classList.add("rowdata");
                tr.innerHTML=`<td><h4>Overall Percentage</h4></td><td>${end}</td>`;
                table.appendChild(tr);
            }
            else if(dept == "B.com" || dept == "Bcom" || dept == "Bcom a&f"){
                percent = (tot/2600) * 100;
                var end = Math.round(percent);
                var tr = document.createElement('tr');
                tr.classList.add("rowdata");
                tr.innerHTML=`<td><h4>Overall Percentage</h4></td><td>${end}</td>`;
                table.appendChild(tr);
            }
        }
        else if(row.sem1 != null && row.sem2 != null && row.sem3 != null && row.sem4 != null && row.sem5 != null){
            var tr = document.createElement('tr');
            tr.classList.add("rowdata");
            tr.innerHTML=`<td><h4>1st Semester Total</h4></td><td>${row.sem1}</td>`;
            table.appendChild(tr);
            var tr = document.createElement('tr');
            tr.classList.add("rowdata");
            tr.innerHTML=`<td><h4>2nd Semester Total</h4></td><td>${row.sem2}</td>`;
            table.appendChild(tr);
            var tr = document.createElement('tr');
            tr.classList.add("rowdata");
            tr.innerHTML=`<td><h4>3rd Semester Total</h4></td><td>${row.sem3}</td>`;
            table.appendChild(tr);
            var tr = document.createElement('tr');
            tr.classList.add("rowdata");
            tr.innerHTML=`<td><h4>4th Semester Total</h4></td><td>${row.sem4}</td>`;
            table.appendChild(tr);
            var tr = document.createElement('tr');
            tr.classList.add("rowdata");
            tr.innerHTML=`<td><h4>5th Semester Total</h4></td><td>${row.sem5}</td>`;
            table.appendChild(tr);
            var sem1 = +row.sem1;
            var sem2 = +row.sem2;
            var sem3 = +row.sem3;
            var sem4 = +row.sem4;
            var sem5 = +row.sem5;
            var tot = sem1+sem2+sem3+sem4+sem5;
            if(dept == "computer science" || dept == "micro biology" || dept == "bio chenistry"){
                percent = (tot/1700) * 100;
                var end = Math.round(percent);
                var tr = document.createElement('tr');
                tr.classList.add("rowdata");
                tr.innerHTML=`<td><h4>Overall percentage</h4></td><td>${end}</td>`;
                table.appendChild(tr);
            }
            else if(dept == "B.com" || dept == "Bcom" || dept == "Bcom a&f"){
                percent = (tot/2100) * 100;
                var end = Math.round(percent);
                var tr = document.createElement('tr');
                tr.classList.add("rowdata");
                tr.innerHTML=`<td><h4>Overall percentage</h4></td><td>${end}</td>`;
                table.appendChild(tr);
            }
        }
        else if(row.sem1 != null && row.sem2 != null && row.sem3 != null && row.sem4 != null){
            var tr = document.createElement('tr');
            tr.classList.add("rowdata");
            tr.innerHTML=`<td><h4>1st Semester Total</h4></td><td>${row.sem1}</td>`;
            table.appendChild(tr);
            var tr = document.createElement('tr');
            tr.classList.add("rowdata");
            tr.innerHTML=`<td><h4>2nd Semester Total</h4></td><td>${row.sem2}</td>`;
            table.appendChild(tr);
            var tr = document.createElement('tr');
            tr.classList.add("rowdata");
            tr.innerHTML=`<td><h4>3rd Semester Total</h4></td><td>${row.sem3}</td>`;
            table.appendChild(tr);
            var tr = document.createElement('tr');
            tr.classList.add("rowdata");
            tr.innerHTML=`<td><h4>4th Semester Total</h4></td><td>${row.sem4}</td>`;
            table.appendChild(tr);
            var sem1 = +row.sem1;
            var sem2 = +row.sem2;
            var sem3 = +row.sem3;
            var sem4 = +row.sem4;
            var tot = sem1+sem2+sem3+sem4;
            if(dept == "computer science" || dept == "micro biology" || dept == "bio chenistry"){
                percent = (tot/1200) * 100;
                var end = Math.round(percent);
                var tr = document.createElement('tr');
                tr.classList.add("rowdata");
                tr.innerHTML=`<td><h4>Overall Percentage</h4></td><td>${end}</td>`;
                table.appendChild(tr);
            }
            else if(dept == "B.com" || dept == "Bcom" || dept == "Bcom a&f"){
                percent = (tot/1600) * 100;
                var end = Math.round(percent);
                var tr = document.createElement('tr');
                tr.classList.add("rowdata");
                tr.innerHTML=`<td><h4>Overall Percentage</h4></td><td>${end}</td>`;
                table.appendChild(tr);
            }
        }
        else if(row.sem1 != null && row.sem2 != null && row.sem3 != null){
            var tr = document.createElement('tr');
            tr.classList.add("rowdata");
            tr.innerHTML=`<td><h4>1st Semester Total</h4></td><td>${row.sem1}</td>`;
            table.appendChild(tr);
            var tr = document.createElement('tr');
            tr.classList.add("rowdata");
            tr.innerHTML=`<td><h4>2nd Semester Total</h4></td><td>${row.sem2}</td>`;
            table.appendChild(tr);
            var tr = document.createElement('tr');
            tr.classList.add("rowdata");
            tr.innerHTML=`<td><h4>3rd Semester Total</h4></td><td>${row.sem3}</td>`;
            table.appendChild(tr);
            var sem1 = +row.sem1;
            var sem2 = +row.sem2;
            var sem3 = +row.sem3;
            var tot = sem1+sem2+sem3;
            if(dept == "computer science" || dept == "micro biology" || dept == "bio chenistry"){
                var percent = (tot/900) * 100;
                var end = Math.round(percent);
                var tr = document.createElement('tr');
                tr.classList.add("rowdata");
                tr.innerHTML=`<td><h4>Overall percentage</h4></td><td>${end}</td>`;
                table.appendChild(tr);
            }
            else if(dept == "B.com" || dept == "Bcom" || dept == "Bcom a&f"){
                percent = (tot/1100) * 100;
                var end = Math.round(percent);
                var tr = document.createElement('tr');
                tr.classList.add("rowdata");
                tr.innerHTML=`<td><h4>Overall percentage</h4></td><td>${end}</td>`;
                table.appendChild(tr);
            }
        }
        else if(row.sem1 != null && row.sem2 != null){
            var tr = document.createElement('tr');
            tr.classList.add("rowdata");
            tr.innerHTML=`<td><h4>1st Semester Total</h4></td><td>${row.sem1}</td>`;
            table.appendChild(tr);
            var tr = document.createElement('tr');
            tr.classList.add("rowdata");
            tr.innerHTML=`<td><h4>2nd Semester Total</h4></td><td>${row.sem2}</td>`;
            table.appendChild(tr);
            var sem1 = +row.sem1;
            var sem2 = +row.sem2;
            var tot = sem1+sem2;
            if(dept == "computer science" || dept == "micro biology" || dept == "bio chenistry"){
                percent = (tot/600) * 100;
                var tr = document.createElement('tr');
                tr.classList.add("rowdata");
                tr.innerHTML=`<td><h4>Overall percentage</h4></td><td>${end}</td>`;
                table.appendChild(tr);
            }
            else if(dept == "B.com" || dept == "Bcom" || dept == "Bcom a&f"){
                percent = (tot/600) * 100;
                var end = Math.round(percent);
                var tr = document.createElement('tr');
                tr.classList.add("rowdata");
                tr.innerHTML=`<td><h4>Overall percentage</h4></td><td>${end}</td>`;
                table.appendChild(tr);
            }
        }
        else if(row.sem1 != null){
            var tr = document.createElement('tr');
            tr.classList.add("rowdata");
            tr.innerHTML=`<td><h4>1st Semester Total</h4></td><td>${row.sem1}</td>`;
            table.appendChild(tr);
            var sem1 = +row.sem1;
            var tot = sem1;
            if(dept == "computer science" || dept == "micro biology" || dept == "bio chenistry"){
                percent = (tot/300) * 100;
                var end = Math.round(percent);
                var tr = document.createElement('tr');
                tr.classList.add("rowdata");
                tr.innerHTML=`<td><h4>Overall percentage</h4></td><td>${end}</td>`;
                table.appendChild(tr);
            }
            else if(dept == "B.com" || dept == "Bcom" || dept == "Bcom a&f"){
                percent = (tot/300) * 100;
                var end = Math.round(percent);
                var tr = document.createElement('tr');
                tr.classList.add("rowdata");
                tr.innerHTML=`<td><h4>Overall percentage</h4></td><td>${end}</td>`;
                table.appendChild(tr);
            }
        }
    })
}
fetchDetail(json);
fetchattend(json1);
fetchMark(json2);