debugger
document.addEventListener('DOMContentLoaded',function(){
    fetchData();
});
function fetchData(){
    fetch('http://localhost/yeartwo.php',{
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
    //console.log(data[0].sname);
    const departments = [... new Set(data.map(student => student.sdepartment))];
    let studentByDepartment = {};
    departments.forEach(department => {
        studentByDepartment[department] = data.filter(student => student.sdepartment === department);
    });
    const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    for(const department in studentByDepartment){
        let depElement = document.createElement('div');
        let heading = document.createElement('h2');
        heading.textContent = '${sdepartment}';
        depElement.appendChild(heading);
        studentByDepartment[department].forEach((row) => {
            const tr = document.createElement('tr');
            tr.classList.add("rowdata");
            tr.innerHTML=`<td>${row.studentid}</td><td>${row.sname}</td><td>${row.semail}</td><td>${row.spassword}</td><td>${row.syear}</td><td>${row.saddress}</td><td>${row.sdepartment}</td><td>${row.sfaculty}</td><td>${row.sphonenum}</td><td><button onclick="editrow(${row.studentid},'${row.sname}','${row.semail}','${row.spassword}',${row.syear},'${row.saddress}','${row.sdepartment}','${row.sfaculty}',${row.sphonenum})" class="editbutton">Edit</button><td><button onclick="delrow(${row.studentid})" class="editbutton">Delete</button></td>`;
            table.appendChild(tr);
        });
    }
}
function fetchPostData(filterValue){
    fetch('http://localhost/yeartwo.php',{
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
            
            location.reload();
        })
        .catch(error => {
            console.log('there was a problem with the fetch operation:',error);
    });
}
function editrow(id,name,email,password,year,address,department,faculty,phone){
    document.getElementById('popup').style.display = 'block';
    document.getElementById('editsid').value = id;
    document.getElementById('editsname').value = name;
    document.getElementById('editsmail').value = email;
    document.getElementById('editspass').value = password;
    document.getElementById('editsaddress').value = address;
    document.getElementById('editsdep').value = department;
    document.getElementById('editsfaculty').value = faculty;
    document.getElementById('editsnum').value = phone;
    document.getElementById('editsyear').value = year;
    document.getElementById('id').value = id;
    console.log(id,name,email,password,address,department,faculty,phone,year);
}
function upsubmit(){
        var id = document.getElementById('editsid').value;
        var name = document.getElementById('editsname').value;
        var email = document.getElementById('editsmail').value;
        var password = document.getElementById('editspass').value;
        var address = document.getElementById('editsaddress').value;
        var department = document.getElementById('editsdep').value;
        var faculty = document.getElementById('editsfaculty').value;
        var phone = document.getElementById('editsnum').value;
        var year = document.getElementById('editsyear').value;
        var aid = document.getElementById('id').value;
        console.log(id,name,email,password,address,department,faculty,phone,year);
        var jsonObject = {
            "method":"edit",
            "id":id,
            "name":name,
            "email":email,
            "password":password,
            "address":address,
            "department":department,
            "faculty":faculty,
            "phone":phone,
            "year":year,
            "aid":aid
        }
        console.log(JSON.stringify(jsonObject));
        fetchPostData(jsonObject);
        alert("edited sucessfully");
        location.reload();
}
function close() {
    document.querySelector('.popup').style.display = 'none';
}
function addNew(){
    document.querySelector('.popup').style.display = 'block';
}
function submission(){
    var id = document.getElementById('editid').value;
    var name = document.getElementById('editname').value;
    var mail = document.getElementById('editmail').value;
    var password = document.getElementById('editpass').value;
    var address = document.getElementById('editadress').value;
    var dep = document.getElementById('editdep').value;
    var faculty = document.getElementById('editfaculty').value;
    var num = document.getElementById('editnum').value;
    var syear = document.getElementById('edityear').value;
    var addJson = {
        "method":"add",
        "id":id,
        "name":name,
        "mail":mail,
        "password":password,
        "address":address,
        "department":dep,
        "faculty":faculty,
        "phone":num,
        "year":syear
    }
    console.log(JSON.stringify(addJson));
    fetchPostData(addJson);
    alert("added Successfully");
    location.reload();
}
function delrow(id){
    console.log(id);
    var jsonObject ={
        "method":"delete",
        "sid":id
    }
    fetchPostData(jsonObject);
    alert("deleted Successfully");
    location.reload();
}
function report(){
    filter = "yeartwo";
    window.location.href = 'A:/mini web/admin/report.html' + '?filter=' + filter;
}