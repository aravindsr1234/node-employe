var maxCountOnPage;

const maxCount = document.getElementById('pageSize');
maxCount.addEventListener('change', () => {
    maxCountOnPage = maxCount.value;
    fetchemployee();
});

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


modal.addEventListener("click", function () {
    modalbg.classList.add('bg_active');
});
modalclose.addEventListener("click", function () {
    modalbg.classList.remove('bg_active');
})
editmodal.addEventListener("click", function () {
    editbg.classList.add('edit_active');
})
editclose.addEventListener("click", function () {
    editbg.classList.remove('edit_active');
})
dltEmp.addEventListener("click", function () {
    delete_bg.classList.add('delete_active');
})
deleteClose.addEventListener("click", function () {
    delete_bg.classList.remove('delete_active');
})
delete_close_btn.addEventListener("click", function () {
    delete_bg.classList.remove('delete_active');
})



function fetchemployee() {
    fetch("http://localhost:3001/api/users")
        .then((res) => res.json())
        .then((employees) => {
            console.log(employees);

            const tableBody = document.querySelector('#employeeTable');
            let temp = '';

            let totalPage = Math.ceil(employees.length / maxCountOnPage);
            const currentPage = Pagination(totalPage);

            var i = 1;
            for (i = (currentPage - 1) * maxCountOnPage; i < Math.min(currentPage * maxCountOnPage, employees.length); i++) {
                const employee = employees[i];

                temp += `
        <tr>
            <td>${i + 1}</td>
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

            }
            tableBody.innerHTML = temp;
        })
}

// functon display Pagination
var currentPage = 1;

function Pagination(totalPage) {
    const pagination = document.getElementById('pagination');

    if (totalPage > 1) {

        pagination.style.display = 'flex';

        var temp = `<button id="prev-btn"><span class="material-symbols-outlined">navigate_before</span></button>`;

        for (var i = 1; i <= totalPage; i++) {
            temp += ` <button id="page${i}">${i}</button>`;
        }

        temp += `<button id="next-btn"><span class="material-symbols-outlined">navigate_next</span></button>`;

        pagination.innerHTML = temp;

        for (var i = 1; i <= totalPage; i++) {
            (function (pageNumber) {
                const pageCounter = document.getElementById(`page${pageNumber}`);
                pageCounter.addEventListener('click', function (e) {
                    currentPage = pageNumber;
                    fetchemployee();
                });
            })(i);
        }
    }
    const currentPageBtn = document.getElementById(`page${currentPage}`);
    currentPageBtn.style.backgroundColor = '#4318FF';
    currentPageBtn.style.color = '#FFF';

    const PrevBtn = document.getElementById('prev-btn');
    if (currentPage == 1) {
        PrevBtn.style.display = 'none';
    }
    PrevBtn.addEventListener('click', function (e) {
        if (currentPage > 1) {

            PrevBtn.style.backgroundColor = '#4318FF';
            PrevBtn.style.color = '#FFF';

            currentPage--;
            fetchemployee();
        }
    });

    const NextBtn = document.getElementById('next-btn');
    if (currentPage == totalPage) {
        NextBtn.style.display = 'none';
    }
    NextBtn.addEventListener('click', function (e) {
        if (currentPage < totalPage) {
            NextBtn.style.backgroundColor = '#4318FF';
            NextBtn.style.color = '#FFF';
            currentPage++;
            fetchemployee();
        }
    });

    return currentPage;
}




// async function fetchemployee() {
//     try {
//         const response = await fetch('http://localhost:3001/api/users');
//         const employees = await response.json();

//         let temp = "";
//         let maxCountOnPage = 4;

//         let totalPage = Math.ceil(employees.length / maxCountOnPage);
//         const currentPage = Pagination(totalPage);

//         for (var i = (currentPage - 1) * maxCountOnPage; i < Math.min(empData.length, currentPage * maxCountOnPage); i++) {

//             const employee = employees[i];
//             // const imageUrl = await getImage(emp.id);

//             const tableBody = document.querySelector('#employeeTable');


//             tableBody.innerHTML += `sfdasfas asf  as
//             <tr>
//                 <td>${i}</td>
//                 <td id="alignImage"><img src="${employee.image}" width="50" id="fetchImage">${employee.firstname}</td>
//                 <td>${employee.email}</td>
//                 <td>${employee.number}</td>
//                 <td>${employee.gender}</td>
//                 <td>${employee.dob}</td>
//                 <td>${employee.country}</td>
//                 <td>
//                 <button id="dropdownAction-${employee.id}" onclick="openbtn(event)">...</button>
//                  <div class="buttonDropdown">
//                  <button class="action" onclick="viewEmployee('${employee._id}')"><i class="fa fa-sharp fa-light fa-eye" id="buttonDropdown_action"></i>View Details</button>
//                  <button class="action" onclick="editEmployee('${employee._id}')"><i class="fa fa-sharp fa-light fa-pen" id="buttonDropdown_action"></i>Edit</button>
//                  <button class="action" onclick="deleteEmployee('${employee._id}')"><i class="fa fa-sharp fa-light fa-trash" id="buttonDropdown_action"></i>Delete</button>
//                  </div>
//                 </td>
//             </tr>

//             `
//         }

//         document.getElementById('table_body').innerHTML = temp;

//     } catch (error) {
//         console.error("Error fetching employee data:", error);
//     }
// }





// EDIT
function editEmployee(id) {
    console.log(id);
    document.getElementById('edit_modal_btn').click();

    fetch(`http://localhost:3001/api/users/?${id}`, {
        method: "GET",
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
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(updatedEmp),
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
    dlt.addEventListener("click", function () {
        fetch(`http://localhost:3001/api/users/${id}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (response.ok) {
                    console.log(response);
                    // alert("Employee deleted successfully");

                    delete_bg.classList.remove('delete_active');
                    location.reload()
                    Alert("delete");
                }
            })
    })
}

function viewEmployee(employeeId) {
    const url = 'http://localhost:3001/details?';
    // const id = employeeId;
    window.location.href = url + employeeId;
}


function openbtn(event) {
    targetElement = event.target.nextElementSibling;
    targetElement.classList.toggle("selected");
}


function uploadfiles() {
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


//function to show Alerts 

async function Alert(type) {
    const alert = document.getElementById('alert');
    const alertIcon = document.getElementById('alertIcon');
    const alertMsg = document.getElementById('alertMsg');

    alert.classList.add('show');
    alert.classList.remove('hide');
    alert.classList.add('showAlert');
    setTimeout(() => {
        alert.classList.remove('show');
        alert.classList.add('hide');
    }, 5000);

    if (type === "delete") {
        alert.classList.add('bg-danger');
        // alertIcon.textContent = "delete";
        alertMsg.textContent = "Employee data is deleted!!!"
    } else if (type === "add") {
        alert.classList.add('bg-success');
        alertIcon.textContent = "done_all";
        alertMsg.textContent = "New Employee is added!!!"
    } else if (type === "update") {
        alert.classList.add('bg-warning');
        alertIcon.textContent = "account_circle";
        alertMsg.textContent = "Employee data updated!!!"
    }

}


const searchInput = document.getElementById('searchInput');
const searchResult = document.getElementById('searchResult');

searchInput.addEventListener('input', async () => {
    const searchTerm = searchInput.value;

    try {
        if (searchTerm) {
            const response = await fetch(`/search?term=${searchTerm}`);
            const data = await response.json();

            if (data.message) {
                searchResult.textContent = data.message;
            } else {
                const resultHTML = `
              <h2>Employee Found</h2>
              <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Position:</strong> ${data.position}</p>
            `;
                searchResult.innerHTML = resultHTML;
            }
        } else {
            searchResult.textContent = ''; // Clear the result if input is empty
        }
    } catch (error) {
        console.error('Error:', error);
        searchResult.textContent = 'An error occurred while searching.';
    }
});


fetchemployee();