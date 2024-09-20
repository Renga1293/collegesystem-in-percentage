debugger
document.addEventListener('DOMContentLoaded',function(){
    fetchData();
});
function fetchData(){
    fetch('http://localhost/adminConc.php',{
    method:'GET',
    headers:{
        'Content-Type':'appplication/json',
    },
    // body: JSON.stringify(user),
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
    const table = document.createElement('table');
    table.id = 'dataTable';
    table.className = 'departmenttable';
    var tr = document.createElement('tr');
    tr.innerHTML = `<th>Email</th><th>Password</th><th>Action</th>`;
    table.appendChild(tr);
    tr = document.createElement('tr');
    tr.classList.add("rowdata");
    tr.innerHTML=`<td class = "rowmail" id = "mail">${data[0].email}</td><td class = "row" >${data[0].password}</td><td><button class="btn" onclick="update('${data[0].email}','${data[0].password}')">Edit</button></td>`;
    table.appendChild(tr);
    tablecontainer.appendChild(table);
}
function update(mail,password){
    document.getElementById('popup').style.display = 'block';
    document.getElementById('editmail').value = mail;
    document.getElementById('editpassword').value = password;
}
function close(){
    document.getElementById('popup').style.display = 'none';
}
function postFetchData(filterValue){
    fetch('http://localhost/adminConc.php',{
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
            // location.reload();
        })
        .catch(error => {
            console.log('there was a problem with the fetch operation:',error);
    });
}
function submission(){
    var mail = document.getElementById('editmail').value;
    var password = document.getElementById('editpassword').value;
    var json = {"method":"update","mail":mail,"pass":password};
    postFetchData(json);
    alert("updated sucessfully");
    location.reload();
}