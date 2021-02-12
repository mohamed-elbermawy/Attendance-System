// when submit the form store function will fire
document.getElementsByTagName('form')[0].addEventListener('submit', store);

// Store Employee Data in local Storage
function store(e) {
    e.preventDefault();

    // user inputs
    let fname = document.getElementById('firstname').value;
    let lname = document.getElementById('lastname').value;
    let add = document.getElementById('address').value;
    let em = document.getElementById('email').value;
    let ag = document.getElementById('age').value;
    let randomusername = "Emp_" + fname.length + fname.charAt(2) + geneerateRondomUsername(1, 9999) + fname.charAt(1) + lname.charAt(1);
    let randompassword = em.charAt(1) + "@" + geneerateRondomPassword(9999, 99999999999999) + add.charAt(2) + "_" + lname.length;
    let flpattern = /^[a-zA-Z]{3,30}$/;
    let adpattern = /^[a-zA-Z0-9]{5,50}$/;
    let empattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // validate firstname
    if (fname.match(flpattern)) {
        console.log("matched");
        document.getElementById('invalidfirstname').style.visibility = "hidden";
    } else {
        e.preventDefault();
        document.getElementById('invalidfirstname').style.visibility = "visible";
        document.getElementById('invalidfirstname').blur();
        document.getElementById('invalidfirstname').focus();
        return;
    }

    // validate lastname
    if (lname.match(flpattern)) {
        console.log("matched");
        document.getElementById('invalidlastname').style.visibility = "hidden";
    } else {
        e.preventDefault();
        document.getElementById('invalidlastname').style.visibility = "visible";
        document.getElementById('invalidlastname').blur();
        document.getElementById('invalidlastname').focus();
        return;
    }

    // validate address
    if (add.match(adpattern)) {
        console.log("matched");
        document.getElementById('invalidaddress').style.visibility = "hidden";
    } else {
        e.preventDefault();
        document.getElementById('invalidaddress').style.visibility = "visible";
        document.getElementById('invalidaddress').blur();
        document.getElementById('invalidaddress').focus();
        return;
    }

    // validate email
    if (em.match(empattern)) {
        console.log("matched");
        document.getElementById('invalidemail').style.visibility = "hidden";
    } else {
        e.preventDefault();
        document.getElementById('invalidemail').style.visibility = "visible";
        document.getElementById('invalidemail').blur();
        document.getElementById('invalidemail').focus();
        return;
    }

    // object hold employee information
    let data = {
        "id": randomusername,
        "flag": 0,
        "today_date": "",
        "attendace_state": "",
        "attendace_time": 0,
        "absence_times": 0,
        "attendace_times": 0,
        "excuse_times": 0,
        "late_times": 0,
        "firstname": fname,
        "lastname": lname,
        "address": add,
        "email": em,
        "age": ag,
        "username": randomusername,
        "password": randompassword
    };

    localStorage.setItem('employeedata', JSON.stringify(data));

    // Send Email to admin with employee data
    sendMail(fname, lname, add, em, ag, randomusername, randompassword);
    document.forms[0].reset();
}

// Generate Rondom Username
function geneerateRondomUsername(min, max) {
    return Math.floor(Math.random() * (max - min + 3)) + min;
}

// Generate Rondom Password
function geneerateRondomPassword(min, max) {
    return Math.floor(Math.random() * (max - min + 5)) + min;
}

// Send Email to admin with employee data
function sendMail(fname, lname, add, em, ag, randomusername, randompassword) {
    let confirmmasseage = document.getElementById('confirmmasseage');
    Email.send({
        Host: "smtp.gmail.com",
        Username: "test0123app@gmail.com",
        Password: "cmfnukepwnvzjqgl",
        To: 'test0123app@gmail.com',
        From: `${em}`,
        Subject: `${fname} ${lname} want to autherize to the system`,
        Body: `First Name : ${fname} <br/> Last Name : ${lname} <br/> Address : ${add} <br/> Email : ${em} <br/> Age : ${ag}<br/> Random Username : ${randomusername} <br/> Random Password : ${randompassword} <br/>`
    }).then((message) => confirmmasseage.style.visibility = "visible");
}