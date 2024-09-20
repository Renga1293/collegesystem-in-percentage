debugger
document.addEventListener('DOMContentLoaded',function(){
    fetchData();
});
function fetchData(){
    fetch('http://localhost/faculty.php',{
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
    const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
        data.forEach((row) => {
            const tr = document.createElement('tr');
            tr.innerHTML=`<td>${row.facultyid}</td><td>${row.facultyname}</td><td>${row.facultyemail}</td><td>${row.facultypassword}</td><td>${row.facultydepartment}</td><td>${row.facultyaddress}</td><td>${row.facultyposition}</td><td>${row.facultyphone}</td><td>${row.facultyqualification}</td><td>${row.facultyyear}</td><td><button onclick = "editrow(${row.facultyid},'${row.facultyname}','${row.facultyemail}','${row.facultypassword}','${row.facultydepartment}','${row.facultyaddress}','${row.facultyposition}',${row.facultyphone},'${row.facultyqualification}',${row.facultyyear})"  class="editbutton">Edit</button><td><button class="editbutton" onclick="delrow(${row.facultyid})">Delete</button></td>`;
            table.appendChild(tr);
        });
}
function fetchPostData(filterValue){
    fetch('http://localhost/faculty.php',{
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

function editrow(id,name,email,password,department,address,position,phone,qualify,year){
    document.getElementById('popup').style.display = 'block';    
    document.getElementById('editfid').value = id;
    document.getElementById('editfname').value = name;
    document.getElementById('editfmail').value = email;
    document.getElementById('editfpass').value = password;
    document.getElementById('editfdep').value = department;
    document.getElementById('editfaddress').value = address;
    document.getElementById('editfposition').value = position;
    document.getElementById('editfnum').value = phone;
    document.getElementById('editfqualify').value = qualify;
    document.getElementById('editfyear').value = year;
    document.getElementById('id').value = id;
}
function upsubmit(){
    var id = document.getElementById('editfid').value;
    var name = document.getElementById('editfname').value;
    var mail = document.getElementById('editfmail').value;
    var password = document.getElementById('editfpass').value;
    var dep = document.getElementById('editfdep').value;
    var address = document.getElementById('editfaddress').value;
    var position = document.getElementById('editfposition').value;
    var num = document.getElementById('editfnum').value;
    var Qualification = document.getElementById('editfqualify').value;
    var syear = document.getElementById('editfyear').value;
    var aid = document.getElementById('id').value;
    var addJson = {
        "method":"edit",
        "id":id,
        "name":name,
        "mail":mail,
        "password":password,
        "department":dep,
        "address":address,
        "position":position,
        "phone":num,
        "qualify":Qualification,
        "year":syear,
        "aid":aid
    }
    fetchPostData(addJson);
    alert("edited sucessfully");
    location.reload();
}
function close(){
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
    var dep = document.getElementById('editdep').value;
    var address = document.getElementById('editaddress').value;
    var position = document.getElementById('editposition').value;
    var num = document.getElementById('editnum').value;
    var Qualification = document.getElementById('editqualify').value;
    var syear = document.getElementById('edityear').value;
    var addJson = {
        "method":"add",
        "id":id,
        "name":name,
        "mail":mail,
        "password":password,
        "department":dep,
        "address":address,
        "position":position,
        "phone":num,
        "qualify":Qualification,
        "year":syear
    }
    console.log(JSON.stringify(addJson));
    fetchPostData(addJson);
    alert("added sucessfully");
    location.reload();
}
function delrow(id){
    console.log(id);
    var jsonObject ={
        "method":"delete",
        "sid":id
    }
    fetchPostData(jsonObject);
    alert("deleted sucessfully");
    location.reload();
}
