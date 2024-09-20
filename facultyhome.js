
document.addEventListener('DOMContentLoaded',function(){
    fetchData();
});

function fetchData(){
    fetch('http://localhost/facultylog.php',{
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
    var filtermail;
    // console.log(data[0].email);
    document.getElementById('loginForm').addEventListener('submit',function(event){
        event.preventDefault();
        var enteredMail = document.getElementById('email').value;
        var enterPassword = document.getElementById('password').value;
        if(data && Array.isArray(data) && data.length>0){
            var userFound = false;
            for(i = 0;i < data.length;i++){
                if(enteredMail === data[i].facultyemail && enterPassword === data[i].facultypassword){
                    userFound = true;
                    var filtermail = enteredMail;
                    var filtername = data[i].facultyname;
                    console.log(filtermail);
                    break;
                }
            }
            if(userFound){
                alert("login successfully");
                window.location.href ='A:/mini web/faculty/facultyhome.html' + '?filtername=' + filtername;
            }
            else if(enteredMail == ""){
                document.querySelector('.mail').style.borderColor = "red";
                alert("Please enter the Mail ID");
            }
            else if(enterPassword == ""){
                document.querySelector('.mail1').style.borderColor = "red";
                alert("Please enter the password");
            }
            else{
                alert("wrong information");
            }
        }
    });
}