// display first name and last name when user inter
document.getElementById('adminname').innerText = " " + localStorage.getItem("admin_firstname") + " " + localStorage.getItem('admin_lastname') + " ";

// searching about employee
let searchvalue = "";
document.getElementById('search').addEventListener('click', function() {
    searchvalue = document.getElementById('valuesearch').value;
    $.ajax({
        url: "../db/db.json",
        method: "get",
        dataType: "json",
        success: function(data) {
            let createdrow = "";
            let count = 1;
            for (var i = 0; i < data.employees.length; i++) {
                if (searchvalue === data.employees[i].username) {
                    $("table:eq(0) > tbody > tr").remove();
                    $(".table-responsive > p").remove();
                    createdrow = $('<tr><th scope="row">' + count + '</th><td>' + data.employees[i].id + '</td><td>' + data.employees[i].firstname + '</td><td>' + data.employees[i].lastname + '</td><td>' + data.employees[i].address + '</td><td>' + data.employees[i].email + '</td><td>' + data.employees[i].age + '</td><td>' + data.employees[i].username + '</td><td>' + data.employees[i].password + '</td><td>' + data.employees[i].attendace_times + '</td><td>' + data.employees[i].absence_times + '</td><td>' + data.employees[i].late_times + '</td><td>' + data.employees[i].excuse_times + '</td></tr>');
                    $("table:eq(0) > tbody").append(createdrow);
                    count++;
                    return 0;
                }
            }
            $("table:eq(0) > tbody > tr").remove();
            createdrow = $('<p class="lead">No Result</p>');
            $(".table-responsive").append(createdrow);
        },
        error: function(error) {
            console.log("error");
        }
    });
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