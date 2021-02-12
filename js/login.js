$(function() {
    $.ajax({
        url: "../db/db.json",
        method: "get",
        dataType: "json",
        success: function(data) {
            // after sumbit form
            document.getElementById('formlogin').addEventListener('submit', function(e) {
                let uname = document.getElementById('username').value;
                let passwd = document.getElementById('password').value;
                let interDate = new Date();
                attendance_day = interDate.toDateString();

                // loop emplyee data
                for (let i = 0; i < data.employees.length; i++) {

                    // check username and password of the employee
                    if (data.employees[i].username == uname && data.employees[i].password == passwd && data.employees[i].flag == 0 && data.employees[i].today_date == attendance_day) {

                        // redirct to attendance page for employee
                        document.getElementById('formlogin').action = "../pages/daily report.html";

                        // store some data of employee in localstorage 
                        localStorage.setItem("employee_username", data.employees[i].username);
                        localStorage.setItem("employee_firstname", data.employees[i].firstname);
                        localStorage.setItem("employee_lastname", data.employees[i].lastname);
                        return;
                    }

                    if (data.employees[i].username == uname && data.employees[i].password == passwd && data.employees[i].flag == 0 && data.employees[i].today_date != attendance_day) {

                        // redirct to attendance page for employee
                        document.getElementById('formlogin').action = "../pages/attendance page.html";

                        // store some data of employee in localstorage 
                        localStorage.setItem("employee_username", data.employees[i].username);
                        localStorage.setItem("employee_firstname", data.employees[i].firstname);
                        localStorage.setItem("employee_lastname", data.employees[i].lastname);
                        return;
                    }
                }

                // loop admin data
                for (let i = 0; i < data.admin.length; i++) {

                    // check username and password of the admin
                    if (data.admin[i].username == uname && data.admin[i].password == passwd && data.admin[i].flag == 1) {

                        // redirct to admin panel page for admin
                        document.getElementById('formlogin').action = "../pages/admin panel.html";

                        // store some data of employee in localstorage 
                        localStorage.setItem("admin_username", data.admin[i].username);
                        localStorage.setItem("admin_firstname", data.admin[i].firstname);
                        localStorage.setItem("admin_lastname", data.admin[i].lastname);
                        return;
                    }
                }

                // if not valid
                e.preventDefault();
                document.getElementById('invalidpassword').style.display = "block";
                document.getElementById('invalidusername').style.display = "block";
            });
        },
        error: function(error) {
            console.log("error");
        }
    });
});