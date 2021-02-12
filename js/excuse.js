            // display employee first name and last name when he inter
            document.getElementById('adminname').innerText = " " + localStorage.getItem("admin_firstname") + " " + localStorage.getItem('admin_lastname') + " ";

            let attendance_time = "";
            let excuse = 0;
            let new_excuse_times = 0;

            $.ajax({
                url: "../db/db.json",
                method: "get",
                dataType: "json",
                success: function(data) {
                    document.getElementById('confirmexcuse').addEventListener('submit', function(e) {
                        e.preventDefault();
                        let uname = document.getElementById('username').value;

                        for (let i = 0; i < data.employees.length; i++) {
                            // check username of the employee
                            if (data.employees[i].username == uname) {

                                // interring date
                                let interDate = new Date();
                                attendance_time = interDate.toLocaleTimeString();
                                attendance_day = interDate.toDateString();

                                localStorage.setItem("emp_attendance_time", attendance_time);
                                localStorage.setItem("employee_username", uname);
                                localStorage.setItem("employee_firstname", data.employees[i].firstname);
                                localStorage.setItem("employee_lastname", data.employees[i].lastname);
                                excuse++;

                                // calculate new attendance times
                                new_excuse_times = eval(data.employees[i].excuse_times) + excuse;

                                // change old values with new value into the json file
                                $.ajax({
                                    url: `http://localhost:3000/employees/${data.employees[i].username}`,
                                    method: "PATCH",
                                    dataType: "json",
                                    data: {
                                        "attendace_time": attendance_time,
                                        "excuse_times": new_excuse_times,
                                        "today_date": attendance_day,
                                        "attendace_state": "Absent - with Excuse"
                                    },
                                    success: function(data) {
                                        console.log("success");
                                        document.getElementById('confirmmasseage').style.display = "block";
                                        alert("Success");
                                    },
                                    error: function(error) {
                                        console.log(error)
                                    }
                                });
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