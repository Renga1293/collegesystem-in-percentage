debugger
var filter;
filter = document.location.search.replace(/^.*?\=/,'');
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
function report(){
    var filter;
    filter = document.location.search.replace(/^.*?\=/,'');
    window.location.href = 'A:/mini web/student/home.html' + '?filter='+filter;
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
            console.log(data);
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
        tr.innerHTML=`<td><h4>StudentID</h4></td><td>${row.studentid}</td><td><h4>Address</h4></td><td>${row.saddress}</td>`;
        table.appendChild(tr);
        tr = document.createElement('tr');
        tr.classList.add("rowdata");
        tr.innerHTML=`<td><h4>Name</h4></td><td>${row.sname}</td><td><h4>Department</h4></td><td id ="dept">${row.sdepartment}</td>`;
        table.appendChild(tr);
        tr = document.createElement('tr');
        tr.classList.add("rowdata");
        tr.innerHTML=`<td><h4>Mail Id</h4></td><td>${row.semail}</td><td><h4>Class Incharge</h4></td><td>${row.sfaculty}</td>`;
        table.appendChild(tr);
        tr = document.createElement('tr');
        tr.classList.add("rowdata");
        tr.innerHTML=`<td><h4>Password</h4></td><td>${row.spassword}</td><td><h4>Phone Number</h4></td><td>${row.sphonenum}</td>`;
        table.appendChild(tr);
        var dept = document.getElementById('dept');
        console.log(dept.innerText);
    })
    var Incharge = {"method":"anoun","filter":data[0].sfaculty};
    anoun(Incharge);
}
function anoun(filter){
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
            console.log(data);
            dataanoun(data);
        })
        .catch(error => {
            console.log('there was a problem with the fetch operation:',error);
    });
}

function dataanoun(data){
    data = JSON.parse(data);
    var facuty = data[0].name;
    var admin = data[1].name;
    var faculanoun = document.getElementById('facultyanoun');
    var adminon = document.getElementById('adminon');
    if(data[0].name == facuty){
        if(data[0].announcement == ""){
            faculanoun.innerHTML = `<p class = "ptag">Threre is no announcement today</p>`;
        }
        else if(data[0].announcement != ""){
            faculanoun.innerHTML = `<p class = "ptag">${data[0].announcement}</p>`;
        }
    }
    if(data[1].name == admin){
        if(data[1].announcement == ""){
            adminon.innerHTML = `<p class = "ptag">Threre is no announcement today</p>`;
        }
        else if(data[0].announcement != ""){
            adminon.innerHTML = `<p class = "ptag">${data[1].announcement}</p>`;
        }
    }
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
            console.log(data);
            dataatten(data);
        })
        .catch(error => {
            console.log('there was a problem with the fetch operation:',error);
    });
}
function dataatten(data){
    data = JSON.parse(data);
    let progress = document.querySelector('.outer');
    let abs = document.getElementById('outer1');
    let on = document.getElementById('outer2');
    let percentdiv = document.getElementById('outer3');
    const absentinsert = document.getElementById('img4');
    const element = document.getElementById('img3');
    const ondutyinsert = document.getElementById('img5');
    const percentimg = document.getElementById('img6');
    let progressvalue = 0;
    let endvalue = data[0].attendclasses;
    let speed = 100;
    let prcess = setInterval(() =>{
        if(data[0].attendclasses != null){
            element.innerHTML = `<h1 class = "numbers">${data[0].attendclasses}</h1>`;
            progress.style.background =`conic-gradient(#006DA4 ${data[0].attendclasses * 30.6}deg ,#ededed 0deg)`;
        }
        else if(data[0].attendclasses == null){
            element.innerHTML = `<h1 class = "numbers">${0}</h1>`;
            progress.style.background =`conic-gradient(#006DA4 ${0 * 30.6}deg ,#ededed 0deg)`;
        }
        progressvalue++;
        if(progressvalue == endvalue){
            clearInterval(prcess);
        }
    },speed)
    j = 0;
    end = data[0].absentclasses;
    let prcoess = setInterval(() =>{
        if(data[0].absentclasses != null){
            absentinsert.innerHTML = `<h1 class = "numbers">${data[0].absentclasses}</h1>`;
            abs.style.background =`conic-gradient(#006DA4 ${data[0].absentclasses * 30.6}deg ,#ededed 0deg)`;
        }
        else if(data[0].absentclasses == null){
            absentinsert.innerHTML = `<h1 class = "numbers">${0}</h1>`;
            abs.style.background =`conic-gradient(#006DA4 ${0 * 30.6}deg ,#ededed 0deg)`;
        }
        j++;
        if(progressvalue == end){
            clearInterval(prcoess);
        }
    },speed)
    n = 0;
    endon = data[0].ondutyclasses;
    let prcoss = setInterval(() =>{    
        if(data[0].ondutyclasses != null){
            ondutyinsert.innerHTML = `<h1 class = "numbers">${data[0].ondutyclasses}</h1>`;
            on.style.background = `conic-gradient(#006DA4 ${data[0].ondutyclasses * 30.6}deg ,#ededed 0deg)`;
        }
        else if(data[0].ondutyclasses == null){
            ondutyinsert.innerHTML = `<h1 class = "numbers">${0}</h1>`;
            on.style.background = `conic-gradient(#006DA4 ${0 * 30.6}deg ,#ededed 0deg)`;
        }
        n++;
        if(progressvalue == endon){
            clearInterval(prcoss);
        }
    },speed)
        var present = +data[0].attendclasses;
        var absent = +data[0].absentclasses;
        var tot = present + absent;
        var percent = (present / tot) * 100;
        var perround = Math.round(percent);
        let speedrun = 100;
        let i = 0;
        let back = document.querySelector('.inner3');
        let process = setInterval(() =>{
            i++;
            if(i < 50){
                percentimg.innerHTML = `<h1 class = "numbers">${i}%</h1>`;
                back.style.background = `red`;
                percentdiv.style.background = `conic-gradient(#006DA4 ${i * 3.24}deg ,#ededed 0deg)`;
            }
            if(i >= 50 && i <= 70){
                percentimg.innerHTML = `<h1 class = "numbers">${i}%</h1>`;
                back.style.background = `lightblue`;
                percentdiv.style.background = `conic-gradient(#006DA4 ${i * 3.24}deg ,#ededed 0deg)`;
            }
            if(i >= 70 && i <= 100){
                percentimg.innerHTML = `<h1 class = "numbers">${i}%</h1>`;
                back.style.background = `lightgreen`;
                percentdiv.style.background = `conic-gradient(#006DA4 ${i * 3.24}deg ,#ededed 0deg)`;
            }
            if(i == perround){
                clearInterval(process);
            }
        },speedrun)       
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
    
    data.forEach((row) => {
        if(row.mark1 != null && row.mark2 != null && row.mark3 != null && row.mark4 != null && row.mark5 != null)    
        {    
            var mark = document.getElementById('outer4');
            var innerark = document.getElementById('img7');
            var inner = document.querySelector('.inner4');
            var mark1 = +row.mark1;
            var mark2 = +row.mark2;
            var mark3 = +row.mark3;
            var mark4 = +row.mark4;
            var mark5 = +row.mark5;
            var tot = mark1+mark2+mark3+mark4+mark5;
            var percent = (tot/500)*100;
            var end = Math.round(percent);
            var i = 0;
            var speed = 100;
            var process = setInterval(() =>{
                i++;
                if(i < 50){
                    inner.style.background = `red`;
                    innerark.innerHTML = `<h3 class = "numbers">${i}%</h3>`;
                    mark.style.background = `conic-gradient(#006DA4 ${i * 3.24}deg ,#ededed 0deg)`;
                }
                if(i >= 50 && i<=70){
                    inner.style.background = `red`;
                    innerark.innerHTML = `<h3 class = "numbers">${i}%</h3>`;
                    mark.style.background = `conic-gradient(#006DA4 ${i * 3.24}deg ,#ededed 0deg)`;
                }
                if(i > 90){
                    inner.style.background = `red`;
                    innerark.innerHTML = `<h3 class = "numbers">${i}%</h3>`;
                    mark.style.background = `conic-gradient(#006DA4 ${i * 3.24}deg ,#ededed 0deg)`;
                }
                if(i == end){
                    clearInterval(process);
                }
            },speed)
        }
        else if(row.mark1 != null && row.mark2 != null && row.mark3 != null && row.mark4 != null)    
        {    
            var mark = document.getElementById('outer4');
            var innerark = document.getElementById('img7');
            var inner = document.querySelector('.inner4');
            var mark1 = +row.mark1;
            var mark2 = +row.mark2;
            var mark3 = +row.mark3;
            var mark4 = +row.mark4;
            var tot = mark1+mark2+mark3+mark4;
            var percent = (tot/400)*100;
            var speed = 100
            var i =0;
            var end = Math.round(percent);
            var process = setInterval(() =>{
                i++;
                if(i < 50){
                    inner.style.background = `red`;
                    innerark.innerHTML = `<h3 class = "numbers">${i}%</h3>`;
                    mark.style.background = `conic-gradient(#006DA4 ${i * 3.24}deg ,#ededed 0deg)`;
                }
                if(i >= 50 && i<=70){
                    inner.style.background = `red`;
                    innerark.innerHTML = `<h3 class = "numbers">${i}%</h3>`;
                    mark.style.background = `conic-gradient(#006DA4 ${i * 3.24}deg ,#ededed 0deg)`;
                }
                if(i > 90){
                    inner.style.background = `red`;
                    innerark.innerHTML = `<h3 class = "numbers">${i}%</h3>`;
                    mark.style.background = `conic-gradient(#006DA4 ${i * 3.24}deg ,#ededed 0deg)`;
                }
                if(i == end){
                    clearInterval(process);
                }
            },speed)
        }
        else if(row.mark1 != null && row.mark2 != null && row.mark3 != null)    
        {    
            var mark = document.getElementById('outer4');
            var innerark = document.getElementById('img7');
            var inner = document.querySelector('.inner4');
            var mark1 = +row.mark1;
            var mark2 = +row.mark2;
            var mark3 = +row.mark3;
            var tot = mark1+mark2+mark3;
            var percent = (tot/300)*100;
            var speed = 100;
            var i =0;
            var end = Math.round(percent);
            var process = setInterval(() =>{
                i++;
                if(i < 50){
                    inner.style.background = `red`;
                    innerark.innerHTML = `<h3 class = "numbers">${i}%</h3>`;
                    mark.style.background = `conic-gradient(#006DA4 ${i * 3.24}deg ,#ededed 0deg)`;
                }
                if(i >= 50 && i<=70){
                    inner.style.background = `lightblue`;
                    innerark.innerHTML = `<h3 class = "numbers">${i}%</h3>`;
                    mark.style.background = `conic-gradient(#006DA4 ${i * 3.24}deg ,#ededed 0deg)`;
                }
                if(i > 70){
                    inner.style.background = `lightgreen`;
                    innerark.innerHTML = `<h3 class = "numbers">${i}%</h3>`;
                    mark.style.background = `conic-gradient(#006DA4 ${i * 3.24}deg ,#ededed 0deg)`;
                }
                if(i == end){
                    clearInterval(process);
                }
            },speed)
        }
        if(row.sem1 != null && row.sem2 != null && row.sem3 != null && row.sem4 != null && row.sem5 != null && row.sem6 != null){
            var sem = document.getElementById('outer5');
            var innersem = document.getElementById('img8');
            var seminner = document.querySelector('.inner5');
            var sem1 = +row.sem1;
            var sem2 = +row.sem2;
            var sem3 = +row.sem3;
            var sem4 = +row.sem4;
            var sem5 = +row.sem5;
            var sem6 = +row.sem6;
            var tot = sem1+sem2+sem3+sem4+sem5+sem6;
            var speed = 100;
            var i = 0;
            if(dept == "computer science" || dept == "micro biology" || dept == "bio chenistry"){
                percent = (tot/2200) * 100;
                var end = Math.round(percent);
                i = 0;
                var process = setInterval(() => {
                    if(i < 50){
                        innersem.innerHTML = `<h3 class = "numbers">${i}</h3>`;
                        seminner.style.background = `red`;
                        sem.style.background = `conic-gradient(#006DA4 ${i * 3.24}deg ,#ededed 0deg)`;
                    }
                    if(i >= 50 && i<=70){
                        innersem.innerHTML = `<h3 class = "numbers">${i}</h3>`;
                        seminner.style.background = `lightblue`;
                        sem.style.background = `conic-gradient(#006DA4 ${i * 3.24}deg ,#ededed 0deg)`;
                    }
                    if(i >= 70){
                        innersem.innerHTML = `<h3 class = "numbers">${i}</h3>`;
                        seminner.style.background = `lightgreen`;
                        sem.style.background = `conic-gradient(#006DA4 ${i * 3.24}deg ,#ededed 0deg)`;
                    }
                    if(i == end){
                        clearInterval(process);
                    }
                },speed)
            }
            else if(dept == "B.com" || dept == "Bcom" || dept == "Bcom a&f"){
                percent = (tot/2600) * 100;
                var end = Math.round(percent);
                var i = 0;
                var speed = 100;
                var process = setInterval(() => {
                    if(i < 50){
                        innersem.innerHTML = `<h3 class = "numbers">${i}</h3>`;
                        seminner.style.background = `red`;
                        sem.style.background = `conic-gradient(#006DA4 ${i * 3.24}deg ,#ededed 0deg)`;
                    }
                    if(i >= 50 && i<=70){
                        innersem.innerHTML = `<h3 class = "numbers">${i}</h3>`;
                        seminner.style.background = `lightblue`;
                        sem.style.background = `conic-gradient(#006DA4 ${i * 3.24}deg ,#ededed 0deg)`;
                    }
                    if(i >= 70){
                        innersem.innerHTML = `<h3 class = "numbers">${i}</h3>`;
                        seminner.style.background = `lightgreen`;
                        sem.style.background = `conic-gradient(#006DA4 ${i * 3.24}deg ,#ededed 0deg)`;
                    }
                    if(i == end){
                        clearInterval(process);
                    }
                },speed)
            }
        }
        else if(row.sem1 != null && row.sem2 != null && row.sem3 != null && row.sem4 != null && row.sem5 != null){
            var sem = document.getElementById('outer5');
            var innersem = document.getElementById('img8');
            var seminner = document.querySelector('.inner5');
            var sem1 = +row.sem1;
            var sem2 = +row.sem2;
            var sem3 = +row.sem3;
            var sem4 = +row.sem4;
            var sem5 = +row.sem5;
            var tot = sem1+sem2+sem3+sem4+sem5;
            var speed = 100;
            var i = 0;
            if(dept == "computer science" || dept == "micro biology" || dept == "bio chenistry"){
                percent = (tot/1700) * 100;
                var end = Math.round(percent);
                var i = 0;
                var process = setInterval(() => {
                    if(i < 50){
                        innersem.innerHTML = `<h3 class = "numbers">${i}</h3>`;
                        seminner.style.background = `red`;
                        sem.style.background = `conic-gradient(#006DA4 ${i * 3.24}deg ,#ededed 0deg)`;
                    }
                    if(i >= 50 && i<=70){
                        innersem.innerHTML = `<h3 class = "numbers">${i}</h3>`;
                        seminner.style.background = `lightblue`;
                        sem.style.background = `conic-gradient(#006DA4 ${i * 3.24}deg ,#ededed 0deg)`;
                    }
                    if(i >= 70){
                        innersem.innerHTML = `<h3 class = "numbers">${i}</h3>`;
                        seminner.style.background = `lightgreen`;
                        sem.style.background = `conic-gradient(#006DA4 ${i * 3.24}deg ,#ededed 0deg)`;
                    }
                    if(i == end){
                        clearInterval(process);
                    }
                },speed)
            }
            else if(dept == "B.com" || dept == "Bcom" || dept == "Bcom a&f"){
                percent = (tot/2100) * 100;
                var end = Math.round(percent);
                var speed = 100;
                var i = 0;
                var process = setInterval(() => {
                    if(i < 50){
                        innersem.innerHTML = `<h3 class = "numbers">${i}</h3>`;
                        seminner.style.background = `red`;
                        sem.style.background = `conic-gradient(#006DA4 ${i * 3.24}deg ,#ededed 0deg)`;
                    }
                    if(i >= 50 && i<=70){
                        innersem.innerHTML = `<h3 class = "numbers">${i}</h3>`;
                        seminner.style.background = `lightblue`;
                        sem.style.background = `conic-gradient(#006DA4 ${i * 3.24}deg ,#ededed 0deg)`;
                    }
                    if(i >= 70){
                        innersem.innerHTML = `<h3 class = "numbers">${i}</h3>`;
                        seminner.style.background = `lightgreen`;
                        sem.style.background = `conic-gradient(#006DA4 ${i * 3.24}deg ,#ededed 0deg)`;
                    }
                    if(i == end){
                        clearInterval(process);
                    }
                },speed)
            }
        }
        else if(row.sem1 != null && row.sem2 != null && row.sem3 != null && row.sem4 != null){
            var sem = document.getElementById('outer5');
            var innersem = document.getElementById('img8');
            var seminner = document.querySelector('.inner5');
            var sem1 = +row.sem1;
            var sem2 = +row.sem2;
            var sem3 = +row.sem3;
            var sem4 = +row.sem4;
            var tot = sem1+sem2+sem3+sem4;
            var speed = 100;
            var i = 0;
            if(dept == "computer science" || dept == "micro biology" || dept == "bio chenistry"){
                percent = (tot/1200) * 100;
                var end = Math.round(percent);
                var process = setInterval(() => {
                    if(i < 50){
                        innersem.innerHTML = `<h3 class = "numbers">${i}</h3>`;
                        seminner.style.background = `red`;
                        sem.style.background = `conic-gradient(#006DA4 ${i * 3.24}deg ,#ededed 0deg)`;
                    }
                    if(i >= 50 && i<=70){
                        innersem.innerHTML = `<h3 class = "numbers">${i}</h3>`;
                        seminner.style.background = `lightblue`;
                        sem.style.background = `conic-gradient(#006DA4 ${i * 3.24}deg ,#ededed 0deg)`;
                    }
                    if(i >= 70){
                        innersem.innerHTML = `<h3 class = "numbers">${i}</h3>`;
                        seminner.style.background = `lightgreen`;
                        sem.style.background = `conic-gradient(#006DA4 ${i * 3.24}deg ,#ededed 0deg)`;
                    }
                    if(i == end){
                        clearInterval(process);
                    }
                },speed)
            }
            else if(dept == "B.com" || dept == "Bcom" || dept == "Bcom a&f"){
                percent = (tot/1600) * 100;
                var end = Math.round(percent);
                var process = setInterval(() => {
                    if(i < 50){
                        innersem.innerHTML = `<h3 class = "numbers">${i}</h3>`;
                        seminner.style.background = `red`;
                        sem.style.background = `conic-gradient(#006DA4 ${i * 3.24}deg ,#ededed 0deg)`;
                    }
                    if(i >= 50 && i<=70){
                        innersem.innerHTML = `<h3 class = "numbers">${i}</h3>`;
                        seminner.style.background = `lightblue`;
                        sem.style.background = `conic-gradient(#006DA4 ${i * 3.24}deg ,#ededed 0deg)`;
                    }
                    if(i >= 70){
                        innersem.innerHTML = `<h3 class = "numbers">${i}</h3>`;
                        seminner.style.background = `lightgreen`;
                        sem.style.background = `conic-gradient(#006DA4 ${i * 3.24}deg ,#ededed 0deg)`;
                    }
                    if(i == end){
                        clearInterval(process);
                    }
                },speed)
            }
        }
        else if(row.sem1 != null && row.sem2 != null && row.sem3 != null){
            var sem = document.getElementById('outer5');
            var innersem = document.getElementById('img8');
            var seminner = document.querySelector('.inner5');
            var sem1 = +row.sem1;
            var sem2 = +row.sem2;
            var sem3 = +row.sem3;
            var tot = sem1+sem2+sem3;
            var speed = 100;
            var i = 0;
            if(dept == "computer science" || dept == "micro biology" || dept == "bio chenistry"){
                percent = (tot/900) * 100;
                var end = Math.round(percent);
                var process = setInterval(() => {
                    if(i < 50){
                        innersem.innerHTML = `<h3 class = "numbers">${i}</h3>`;
                        seminner.style.background = `red`;
                        sem.style.background = `conic-gradient(#006DA4 ${i * 3.24}deg ,#ededed 0deg)`;
                    }
                    if(i >= 50 && i<=70){
                        innersem.innerHTML = `<h3 class = "numbers">${i}</h3>`;
                        seminner.style.background = `lightblue`;
                        sem.style.background = `conic-gradient(#006DA4 ${i * 3.24}deg ,#ededed 0deg)`;
                    }
                    if(i >= 70){
                        innersem.innerHTML = `<h3 class = "numbers">${i}</h3>`;
                        seminner.style.background = `lightgreen`;
                        sem.style.background = `conic-gradient(#006DA4 ${i * 3.24}deg ,#ededed 0deg)`;
                    }
                    if(i == end){
                        clearInterval(process);
                    }
                },speed)
            }
            else if(dept == "B.com" || dept == "Bcom" || dept == "Bcom a&f"){
                percent = (tot/1100) * 100;
                var end = Math.round(percent);
                var speed = 100;
                var i = 0;
                var process = setInterval(() => {
                    if(i < 50){
                        innersem.innerHTML = `<h3 class = "numbers">${i}</h3>`;
                        seminner.style.background = `red`;
                        sem.style.background = `conic-gradient(#006DA4 ${i * 3.24}deg ,#ededed 0deg)`;
                    }
                    if(i >= 50 && i<=70){
                        innersem.innerHTML = `<h3 class = "numbers">${i}</h3>`;
                        seminner.style.background = `lightblue`;
                        sem.style.background = `conic-gradient(#006DA4 ${i * 3.24}deg ,#ededed 0deg)`;
                    }
                    if(i >= 70){
                        innersem.innerHTML = `<h3 class = "numbers">${i}</h3>`;
                        seminner.style.background = `lightgreen`;
                        sem.style.background = `conic-gradient(#006DA4 ${i * 3.24}deg ,#ededed 0deg)`;
                    }
                    if(i == end){
                        clearInterval(process);
                    }
                },speed)
            }
        }
        else if(row.sem1 != null && row.sem2 != null){
            var sem = document.getElementById('outer5');
            var innersem = document.getElementById('img8');
            var seminner = document.querySelector('.inner5');
            var sem1 = +row.sem1;
            var sem2 = +row.sem2;
            var tot = sem1+sem2;
            var speed = 100;
            var i = 0;
            if(dept == "computer science" || dept == "micro biology" || dept == "bio chenistry"){
                percent = (tot/600) * 100;
                var end = Math.round(percent);
                var process = setInterval(() => {
                    if(i < 50){
                        innersem.innerHTML = `<h3 class = "numbers">${i}</h3>`;
                        seminner.style.background = `red`;
                        sem.style.background = `conic-gradient(#006DA4 ${i * 3.24}deg ,#ededed 0deg)`;
                    }
                    if(i >= 50 && i<=70){
                        innersem.innerHTML = `<h3 class = "numbers">${i}</h3>`;
                        seminner.style.background = `lightblue`;
                        sem.style.background = `conic-gradient(#006DA4 ${i * 3.24}deg ,#ededed 0deg)`;
                    }
                    if(i >= 70){
                        innersem.innerHTML = `<h3 class = "numbers">${i}</h3>`;
                        seminner.style.background = `lightgreen`;
                        sem.style.background = `conic-gradient(#006DA4 ${i * 3.24}deg ,#ededed 0deg)`;
                    }
                    if(i == end){
                        clearInterval(process);
                    }
                },speed)
            }
            else if(dept == "B.com" || dept == "Bcom" || dept == "Bcom a&f"){
                percent = (tot/600) * 100;
                var end = Math.round(percent);
                var process = setInterval(() => {
                    if(i < 50){
                        innersem.innerHTML = `<h3 class = "numbers">${i}</h3>`;
                        seminner.style.background = `red`;
                        sem.style.background = `conic-gradient(#006DA4 ${i * 3.24}deg ,#ededed 0deg)`;
                    }
                    if(i >= 50 && i<=70){
                        innersem.innerHTML = `<h3 class = "numbers">${i}</h3>`;
                        seminner.style.background = `lightblue`;
                        sem.style.background = `conic-gradient(#006DA4 ${i * 3.24}deg ,#ededed 0deg)`;
                    }
                    if(i >= 70){
                        innersem.innerHTML = `<h3 class = "numbers">${i}</h3>`;
                        seminner.style.background = `lightgreen`;
                        sem.style.background = `conic-gradient(#006DA4 ${i * 3.24}deg ,#ededed 0deg)`;
                    }
                    if(i == end){
                        clearInterval(process);
                    }
                },speed)
            }
        }
        else if(row.sem1 != null){
            var sem = document.getElementById('outer5');
            var innersem = document.getElementById('img8');
            var seminner = document.querySelector('.inner5');
            var sem1 = +row.sem1;
            var tot = sem1;
            var speed = 100;
            var i = 0;
            if(dept == "computer science" || dept == "micro biology" || dept == "bio chenistry"){
                percent = (tot/300) * 100;
                var end = Math.round(percent);
                var process = setInterval(() => {
                    if(i < 50){
                        innersem.innerHTML = `<h3 class = "numbers">${i}</h3>`;
                        seminner.style.background = `red`;
                        sem.style.background = `conic-gradient(#006DA4 ${i * 3.24}deg ,#ededed 0deg)`;
                    }
                    if(i >= 50 && i<=70){
                        innersem.innerHTML = `<h3 class = "numbers">${i}</h3>`;
                        seminner.style.background = `lightblue`;
                        sem.style.background = `conic-gradient(#006DA4 ${i * 3.24}deg ,#ededed 0deg)`;
                    }
                    if(i >= 70){
                        innersem.innerHTML = `<h3 class = "numbers">${i}</h3>`;
                        seminner.style.background = `lightgreen`;
                        sem.style.background = `conic-gradient(#006DA4 ${i * 3.24}deg ,#ededed 0deg)`;
                    }
                    if(i == end){
                        clearInterval(process);
                    }
                },speed)
            }
            else if(dept == "B.com" || dept == "Bcom" || dept == "Bcom a&f"){
                percent = (tot/300) * 100;
                var end = Math.round(percent);
                var process = setInterval(() => {
                    if(i < 50){
                        innersem.innerHTML = `<h3 class = "numbers">${i}</h3>`;
                        seminner.style.background = `red`;
                        sem.style.background = `conic-gradient(#006DA4 ${i * 3.24}deg ,#ededed 0deg)`;
                    }
                    if(i >= 50 && i<=70){
                        innersem.innerHTML = `<h3 class = "numbers">${i}</h3>`;
                        seminner.style.background = `lightblue`;
                        sem.style.background = `conic-gradient(#006DA4 ${i * 3.24}deg ,#ededed 0deg)`;
                    }
                    if(i >= 70){
                        innersem.innerHTML = `<h3 class = "numbers">${i}</h3>`;
                        seminner.style.background = `lightgreen`;
                        sem.style.background = `conic-gradient(#006DA4 ${i * 3.24}deg ,#ededed 0deg)`;
                    }
                    if(i == end){
                        clearInterval(process);
                    }
                },speed)
            }
        }
    })
}
fetchDetail(json);
fetchattend(json1);
fetchMark(json2);