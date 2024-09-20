debugger
document.addEventListener('DOMContentLoaded',function(){
    var filter;
    filter = document.location.search.replace(/^.*?\=/,'');
    console.log(filter);
    var json = {
        "method":"fetch",
        "filter":filter
    }
    fetchData(json);
});
function fetchData(filter){
    fetch('http://localhost/facultystudent.php',{
        method:'POST',
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
            datastud(data);
        })
        .catch(error => {
            console.log('there was a problem with the fetch operation:',error);
    });
}
function datastud(data){
    data =JSON.parse(data);
    let progress = document.querySelector('.outer');
    const element = document.getElementById('img3');
    let progressvalue = 0;
    let endvalue = data.length;
    let speed = 100;
    let prcess = setInterval(() =>{
        progressvalue++;
        element.innerHTML = `<h1 class = "numbers">${progressvalue}</h1>`;
        progress.style.background =`conic-gradient(#006DA4 ${progressvalue * 30.6}deg ,#ededed 0deg)`;
        if(progressvalue == endvalue){
            clearInterval(prcess);
        }
    },speed)
}

function fetchAtten(){
    fetch('http://localhost/facultyatten.php',{
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
            dataatten(data);
        })
        .catch(error => {
            console.log('there was a problem with the fetch operation:',error);
    });
}
function dataatten(data){
    data =JSON.parse(data);
    const table = document.getElementById('present').getElementsByTagName('tbody')[0];
    const tableabs = document.getElementById('absent').getElementsByTagName('tbody')[0];
    const tableon = document.getElementById('onduty').getElementsByTagName('tbody')[0];
    data.forEach(row => {
        if(row.astatus == "present"){
            const tr = document.createElement('tr');
            tr.classList.add('rowdata');
            tr.innerHTML =  `<td id="row">${row.sname}</td>`;
            table.appendChild(tr);
        }
        else if(row.astatus == "absent"){
            const tr = document.createElement('tr');
            tr.classList.add('rowdata');
            tr.innerHTML =  `<td id="row">${row.sname}</td>`;
            tableabs.appendChild(tr);
        }
        else if(row.astatus == "on duty"){
            const tr = document.createElement('tr');
            tr.classList.add('rowdata');
            tr.innerHTML =  `<td>${row.sname}</td>`;
            tableon.appendChild(tr);
        }
    });
}
function submission(){
    var name = document.location.search.replace(/^.*?\=/,'');
    var announ = document.querySelector('.Announcement-div').value;
    var json = {"method":"anoun","name":name,"value":announ};
    fetchData(json);
    alert("Announcement Sucess");
    location.reload();
}
function delanoun(){
    var name = document.location.search.replace(/^.*?\=/,'');
    var json = {"method":"delanoun","name":name};
    fetchData(json)
    alert("Announcement Sucess");
    location.reload();
}
function direct(){
    var name = document.location.search.replace(/^.*?\=/,'');
    console.log(name);
    window.location.href = 'A:/mini web/faculty/student.html' + '?filter=' + name;
}
function mark(){
    var name = document.location.search.replace(/^.*?\=/,'');
    console.log(name);
    window.location.href = 'A:/mini web/faculty/mark.html' + '?filter=' + name;
}
function upmark(){
    var name = document.location.search.replace(/^.*?\=/,'');
    console.log(name);
    window.location.href = 'A:/mini web/faculty/marks.html' + '?filter=' + name;
}
    var filter;
    filter = document.location.search.replace(/^.*?\=/,'');
    var json = {
        "method":"fetch",
        "filter":filter
    }
    fetchAtten(json);