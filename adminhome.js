document.addEventListener('DOMContentLoaded',function(){
    fetchData();
});
function fetchData(){
    fetch('http://localhost/adminhome.php',{
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
function fetchFacul(filterValue){
    fetch('http://localhost/adminhome.php',{
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
            datalog(data);
        })
        .catch(error => {
            console.log('there was a problem with the fetch operation:',error);
    });
}
async function datalog(data){
    data =JSON.parse(data);
    let progress = document.querySelector('#outer');
    const element = document.getElementById('img4');
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
function fetchDataAnoun(filter){
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
function submission(){
    var name = "admin";
    var announ = document.querySelector('.Announcement-div').value;
    var json = {"method":"anoun","name":name,"value":announ};
    fetchDataAnoun(json);
    alert("Announcement Sucess");
    location.reload();
}
function delanoun(){
    var name = "admin";
    var json = {"method":"delanoun","name":name};
    fetchDataAnoun(json);
    alert("Deleted Sucessfully");
    location.reload();
}
function stud(){
    window.location.href="A:/mini web/admin/Courses.html"
}
function facul(){
    window.location.href="A:/mini web/admin/faculty.html";
}
function attend(){
    window.location.href="A:/mini web/admin/atten.html";
}
function mark(){
    window.location.href = "A:/mini web/admin/mark.html";
}
function admin(){
    window.location.href = 'A:/mini web/admin/admin.html';
}
filter = {"method":"faculty"};
fetchFacul(filter);