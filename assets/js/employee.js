

var modal = document.querySelector("#addBtn");
var modalbg = document.querySelector(".add_modal_bg");
var modalclose = document.querySelector(".add_modal_close");
var edit_modal = document.querySelector('#edit_btn');
var editbg = document.querySelector(".edit_modal_bg");
var editmodal = document.querySelector("#edit_modal_btn");
var editclose = document.querySelector('.editclose');
var dltEmp = document.querySelector("#let");
var delete_bg = document.querySelector(".delete_bg");
var deleteClose = document.querySelector(".delete_close_btn");
var delete_close_btn = document.querySelector("#delete_close_btn");


modal.addEventListener("click", function(){
    modalbg.classList.add('bg_active');
});
modalclose.addEventListener("click", function() {
    modalbg.classList.remove('bg_active');
})
editmodal.addEventListener("click", function() {
    editbg.classList.add('edit_active');
})
editclose.addEventListener("click", function() {
    editbg.classList.remove('edit_active');
})
dltEmp.addEventListener("click", function() {
    delete_bg.classList.add('delete_active');
})
deleteClose.addEventListener("click", function() {
    delete_bg.classList.remove('delete_active');
})
delete_close_btn.addEventListener("click", function() {
    delete_bg.classList.remove('delete_active');
})



function fetchemployee() {
    fetch("http://localhost:3001/api/users")
    .then((res) => res.json())
    .then((employees) => {
        console.log(employees);
        
        const tableBody = document.querySelector('#employeeTable');

        // var pageNumber =Pagination();
        // for(var i=(pageNumber-1)*10;i<(pageNumber*10)||employees.length;i++){
        //     const employee = employees[i];
        // }
        var i=1;
        employees.forEach(employee => {
           
        tableBody.innerHTML +=`
        <tr>
            <td>${i}</td>
            <td id="alignImage"><img src="${employee.image}" width="50" id="fetchImage">${employee.firstname}</td>
            <td>${employee.email}</td>
            <td>${employee.number}</td>
            <td>${employee.gender}</td>
            <td>${employee.dob}</td>
            <td>${employee.country}</td>
            <td>
            <button id="dropdownAction-${employee.id}" onclick="openbtn(event)">...</button>
             <div class="buttonDropdown">
             <button class="action" onclick="viewEmployee('${employee._id}')"><i class="fa fa-sharp fa-light fa-eye" id="buttonDropdown_action"></i>View Details</button>
             <button class="action" onclick="editEmployee('${employee._id}')"><i class="fa fa-sharp fa-light fa-pen" id="buttonDropdown_action"></i>Edit</button>
             <button class="action" onclick="deleteEmployee('${employee._id}')"><i class="fa fa-sharp fa-light fa-trash" id="buttonDropdown_action"></i>Delete</button>
             </div>
            </td>
        </tr>
       
        `
        i++;})
        

       
    })
}





// EDIT
function editEmployee(id){
    console.log(id);
    document.getElementById('edit_modal_btn').click();
    
    fetch(`http://localhost:3001/api/users/?${id}`, {
        method:"GET",
    })
    .then(res => res.json())
    .then(employee => {
        console.log(employee);

        document.getElementById('salutation_edit').value = employee.salutation;
        document.getElementById('fname_edit').value = employee.firstname;
        document.getElementById('lastName_edit').value = employee.lastname;
        document.getElementById('email_edit').value = employee.email;
        document.getElementById('number_edit').value = employee.number;
        document.getElementById('dob_edit').value = employee.dob;
        // document.getElementsByName('Gender').value = employee.gender;
        document.getElementById('qualification_edit').value = employee.qualification;
        document.getElementById('country_edit').value = employee.country; 
        document.getElementById('state_edit').value = employee.state;
        document.getElementById('city_edit').value = employee.city; 
        document.getElementById('address_edit').value = employee.address;
    })

    const upForm = document.getElementById('edit_form');
    upForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const updatedEmp = {
            salutation: document.getElementById('salutation_edit').value,
            number: document.getElementById('number_edit').value,
            address: document.getElementById('address_edit').value,
            firstname: document.getElementById('fname_edit').value,
            email: document.getElementById('email_edit').value,
            lastname: document.getElementById('lastName_edit').value,
            dob: document.getElementById('dob_edit').value,
            // gender:getElementsByName('gender').value,
            qualification: document.getElementById('qualification_edit').value,
            city: document.getElementById('city_edit').value,
            state: document.getElementById('state_edit').value,
            country: document.getElementById('country_edit').value,
        }

        console.log(updatedEmp);

        fetch(`http://localhost:3001/api/users/${id}`, {
            method:"PUT",
            headers: {
                "content-type":"application/json",
            },
            body:JSON.stringify(updatedEmp),
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            
        })
    })
   
}


// DELETE
function deleteEmployee(id) {
    document.getElementById('let').click();
    const dlt = document.getElementById("dlt");
    dlt.addEventListener("click", function() {
        fetch(`http://localhost:3001/api/users/${id}`, {
            method: "DELETE",            
        })                
        .then((response) => {
            if(response.ok) {
                console.log(response);
                // alert("Employee deleted successfully");
                
                delete_bg.classList.remove('delete_active');
                location.reload()
            }            
        })
    })
}

function viewEmployee(employeeId) {
    const url = 'http://localhost:3001/details?';
    const id = employeeId;
    
    window.location.href = url + id;
}


function openbtn(event){
    targetElement = event.target.nextElementSibling;
    targetElement.classList.toggle("selected");
}


function uploadfiles(){
    document.getElementById('formFile').click();
}


// const uploadUserImage = document.getElementById('upload_user_image');
const uploadUserImage = document.getElementById('formFile');
const fileInput = document.getElementById('upload');
const imageSection = document.getElementById('imageSection');
const imagePreview = document.getElementById('image_preview');

uploadUserImage.addEventListener('change', function (e) {
    const selectedImage = uploadUserImage.files[0];
    if (selectedImage) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const imageUrl = event.target.result;
            const imgElement = document.createElement('img');
            imgElement.src = imageUrl;
            imagePreview.innerHTML = '';
            imagePreview.appendChild(imgElement);
            imageSection.style.display = 'flex';
            fileInput.style.display = 'none';
        };
        reader.readAsDataURL(selectedImage);
    }
});


fetchemployee();