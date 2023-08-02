let params = new URLSearchParams(document.location.search);
let id = params.get("id");
console.log(id);

function  detailsEmployee(id) {
    fetch(`http://localhost:3000/employees/${id}`, {
        method:"GET",
    })
    .then(res => res.json())
    .then(employee => {
        console.log(employee);

        const employeeDetails = document.getElementById('employee-details');

        employeeDetails.innerHTML = `
        <div class=" name_email">
            <h3>${employee.firstName}</h3>
            <h4>${employee.email}</h4>
        </div>
    <div class="details_col_3">    
        <div class="details_view">
            <h3>Gender</h3>
            <h4>${employee.gender}</h4>
        </div>
        <div class="details_view">
            <h3>age</h3>
            <h4>38</h4>
        </div>
        <div class="details_view">
            <h3>Date of Birth</h3>
            <h4>${employee.dod}</h4>
        </div>
    </div>
    <div class="details_col_2">
        <div class="details_view">
            <h3>Mobile Number</h3>
            <h4>${employee.number}</h4>
        </div>
        <div class="details_view">
            <h3>Qualifications</h3>
            <h4>${employee.qualifications}</h4>
        </div>
    </div>
    <div class="details_col_2">
        <div class="details_view">
            <h3>Address</h3>
            <h4>${employee.address}</h4>
        </div>
        <div class="details_view">
            <h3>Username</h3>
            <h4>${employee.firstName}</h4>
        </div>
    </div>
    <div class="details_actions">
        <button>Edit Details</button>
    </div>
        `

          
    })
}

detailsEmployee(id); 