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
function dataLog(data){
    data = JSON.parse(data);
    document.getElementById('loginForm').addEventListener('submit',function(event){
        event.preventDefault();
        var enteredMail = document.getElementById('email').value;
        var enterPassword = document.getElementById('password').value;
        if(data && Array.isArray(data) && data.length>0){
            var userFound = false;
            for(i = 0;i < data.length;i++){
                if(enteredMail === data[i].email && enterPassword === data[i].password){
                    userFound = true;
                    break;
                }
            }
            if(userFound){
                alert("login successfully");
                window.location.href ='A:/mini web/admin/home.html'
            }
            else if(enteredMail == ""){
                alert("Please enter the Mail ID");
            }
            else if(enterPassword == ""){
                alert("Please enter the password");
            }
            else{
                alert("Please enter the valid mail id and password");
            }
        }
    });
    
    
    //console.log(data);
}
