// display first name and last name when user inter
document.getElementById('adminname').innerText = " " + localStorage.getItem("admin_firstname") + " " + localStorage.getItem('admin_lastname') + " ";
let data = JSON.parse(localStorage.getItem('employeedata'));
let createdrow = "";
let count = 1;

// check if there is a user register and display that data to approve it or not
if (data != null) {
    createdrow = $('<tr><th scope="row">' + count + '</th><td>' + data.id + '</td><td>' + data.firstname + '</td><td>' + data.lastname + '</td><td>' + data.address + '</td><td>' + data.email + '</td><td>' + data.age + '</td><td>' + data.username + '</td><td>' + data.password + '</td><td><button class="btn btn-success" id="add" name="add">Approve</button></td><td><button class="btn btn-danger" id="delete" name="delete">Delete</button></td></tr>');
    $("table:eq(0) > tbody").append(createdrow);
} else {
    createdrow = $('<p class="lead">No Result</p>');
    $(".table-responsive").append(createdrow);
}

// check if there is data and then add it to json file
if (data != null) {
    document.getElementById('add').addEventListener('click', addDatoToDBFile);
}

// check if there is data and then delete it from localstorage
if (data != null) {
    document.getElementById('delete').addEventListener('click', deleteFromLocalStorage);
}

// add the register user into json file after approve
function addDatoToDBFile() {

    //json file url
    let db_url = "http://localhost:3000/employees";

    // employee data
    let obj = {
        "id": data.id,
        "absence_times": 0,
        "address": data.address,
        "age": data.age,
        "attendace_state": "",
        "today_date": "",
        "attendace_time": 0,
        "attendace_times": 0,
        "email": data.email,
        "excuse_times": 0,
        "firstname": data.firstname,
        "flag": 0,
        "lastname": data.lastname,
        "late_times": 0,
        "password": data.password,
        "username": data.username
    };

    //Add employee Data To Json File
    $.post(db_url, obj);

    //send mail to employee with username and password
    sendMail(obj.firstname, obj.lastname, obj.username, obj.password, obj.email);

    // remove the record from table after approve
    $("table:eq(0) > tbody > tr").remove();

    // remove employee data from localstorage after approve
    localStorage.removeItem('employeedata');

    // show massage after adding employee into json file
    createdrow = $('<p class="lead">Added successfully</p>');
    $(".table-responsive").append(createdrow);

}

// check if there is data and then delete it from localstorage
function deleteFromLocalStorage() {
    localStorage.removeItem('employeedata');
    $("table:eq(0) > tbody > tr").remove();
    createdrow = $('<p class="lead">Deleted successfully</p>');
    $(".table-responsive").append(createdrow);

}

// Send Email to Employee with username and password
function sendMail(fname, lname, randomusername, randompassword, email) {
    Email.send({
        Host: "smtp.gmail.com",
        Username: "test0123app@gmail.com",
        Password: "cmfnukepwnvzjqgl",
        To: `${email}`,
        From: 'test0123app@gmail.com',
        Subject: `Attendance System Admins`,
        Body: `Wellcome ${fname} ${lname} <br/> Your username : <B>${randomusername}</B> Your Password : <B>${randompassword}</B> You can Login To the System Now Be <B>CAREFUL</B> And Keep them <B>secret</B> <br/>`
    }).then((message) => console.log("sucess send mail"));
}

// user logout
document.getElementById('logout').addEventListener('click', logout);

// user logout
function logout() {
    localStorage.removeItem("admin_username");
    localStorage.removeItem("admin_firstname");
    localStorage.removeItem("admin_lastname");
    window.location.replace("../login.html");
}