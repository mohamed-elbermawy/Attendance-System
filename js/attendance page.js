// exact Date to inter the system
let exactDate = new Date();

// late date of intering the system
let lateDate = new Date();

// exact time
let exactTime = exactDate.setHours(9, 0, 0, 0);

// late time
let lateTime = lateDate.setHours(9, 30, 0, 0);
let attendance_time = "";
let attend = 0;
let late = 0;
let absent = 0;
let new_attendace_times = 0;
let new_late_times = 0;
let new_absent_times = 0;

$.ajax({
    url: "../db/db.json",
    method: "get",
    dataType: "json",
    success: function(data) {
        document.getElementById('confirmattendance').addEventListener('submit', function(e) {
            let uname = document.getElementById('username').value;
            let localstorageuname = localStorage.getItem("employee_username");

            for (let i = 0; i < data.employees.length; i++) {
                // check username of the employee
                if (data.employees[i].username == uname && localstorageuname == uname) {

                    // interring date
                    let interDate = new Date();
                    attendance_time = interDate.toLocaleTimeString();
                    attendance_day = interDate.toDateString();

                    // check interring date to catculate if the employee attend or late or absent
                    if (interDate <= exactDate) {
                        localStorage.setItem("emp_attendance_time", attendance_time);
                        localStorage.setItem("emp_attendance_status", "Attend");
                        attend++;

                        // calculate new attendance times
                        new_attendace_times = eval(data.employees[i].attendace_times) + attend;

                        // change old values with new value into the json file
                        $.ajax({
                            url: `http://localhost:3000/employees/${data.employees[i].username}`,
                            method: "PATCH",
                            dataType: "json",
                            data: {
                                "attendace_time": attendance_time,
                                "attendace_times": new_attendace_times,
                                "today_date": attendance_day,
                                "attendace_state": "Attend"
                            },
                            success: function(data) {
                                console.log("success");
                                // document.getElementById('confirmattendance').action = "daily report.html";
                                window.location.replace("../pages/daily report.html");
                            },
                            error: function(error) {
                                console.log(error)
                            }
                        });
                        // redirect to employee to daily report
                        // document.getElementById('confirmattendance').action = "daily report.html";
                    } else if (interDate > exactDate && interDate <= lateDate) {
                        localStorage.setItem("emp_attendance_time", attendance_time);
                        localStorage.setItem("emp_attendance_status", "Late");
                        late++;

                        // calculate new late times
                        new_late_times = eval(data.employees[i].late_times) + late;

                        // change old values with new value into the json file
                        $.ajax({
                            url: `http://localhost:3000/employees/${data.employees[i].username}`,
                            method: "PATCH",
                            dataType: "json",
                            data: {
                                "attendace_time": attendance_time,
                                "late_times": new_late_times,
                                "today_date": attendance_day,
                                "attendace_state": "Late"
                            },
                            success: function(data) {
                                console.log("success");
                                // document.getElementById('confirmattendance').action = "daily report.html";
                                window.location.replace("../pages/daily report.html")
                            },
                            error: function(error) {
                                console.log(error)
                            }
                        });

                        // redirect to employee to daily report
                        // document.getElementById('confirmattendance').action = "daily report.html";
                    } else {
                        localStorage.setItem("emp_attendance_time", attendance_time);
                        localStorage.setItem("emp_attendance_status", "Absent");
                        absent++;

                        // calculate new absent times
                        new_absent_times = eval(data.employees[i].absence_times) + absent;

                        // change old values with new value into the json file
                        $.ajax({
                            url: `http://localhost:3000/employees/${data.employees[i].username}`,
                            method: "PATCH",
                            dataType: "json",
                            data: {
                                "attendace_time": attendance_time,
                                "absence_times": new_absent_times,
                                "today_date": attendance_day,
                                "attendace_state": "Absent"
                            },
                            success: function(data) {
                                console.log("success");
                                // document.getElementById('confirmattendance').action = "daily report.html";
                                window.location.replace("../pages/daily report.html")
                            },
                            error: function(error) {
                                console.log(error)
                            }
                        });
                        // redirect to employee to daily report
                        // document.getElementById('confirmattendance').action = "daily report.html";
                    }
                    return;
                }
            }

            // if not valid
            e.preventDefault();
            document.getElementById('invalidusername').style.display = "block";
        });
    },
    error: function(error) {
        console.log("error");
    }
});

// user logout
document.getElementById('logout').addEventListener('click', logout);

// user logout
function logout() {
    localStorage.removeItem("admin_username");
    localStorage.removeItem("admin_firstname");
    localStorage.removeItem("admin_lastname");
    window.location.replace("../login.html");
}