document.addEventListener('DOMContentLoaded',function(){
    fetchData();
});
function fetchData(){
    fetch('http://localhost/attenthree.php',{
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
            tr.innerHTML=`<td>${row.studentid}</td><td>${row.sname}</td><td>${row.sdepartment}</td><td>${row.syear}</td><td><input type="radio" name="${row.studentid}" value="present"></td><td><input type="radio" name="${row.studentid}" value="absent"></td><td><input type="radio" name="${row.studentid}" value="on duty"></td>`;
            table.appendChild(tr);
        });
}
function fetchPostData(filterValue){
    fetch('http://localhost/atten.php',{
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
            alert("updated sucessdully");
            location.reload();
        })
        .catch(error => {
            console.log('there was a problem with the fetch operation:',error);
    });
}
var attendancedata = [];
document.getElementById('dataTable').addEventListener('click',function(event){
   if(event.target.type == "radio"){
    var nameAttribute = event.target.name;
    var status = event.target.value;
    var existing = attendancedata.findIndex(function(student){
        return student.studentid === nameAttribute;
    });
    if(existing !== -1){
        attendancedata[existing].status = status;
    }else{
        attendancedata.push({"studentid":nameAttribute,"status":status});
    }
   } 
});
function markattendance(){
    console.log(attendancedata);
   fetchPostData(attendancedata);
}
function report(){
    var filter = "attenthree";
    window.location.href = 'A:/mini web/admin/report.html' + '?filter=' +filter;
}