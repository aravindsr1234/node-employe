var modal = document.querySelector("#addBtn");
var modalbg = document.querySelector(".add_modal_bg");
var edit_modal = document.querySelector('#edit_btn');
var editbg = document.querySelector(".edit_modal_bg");
var editmodal = document.querySelector("#edit_modal_btn");
var editclose = document.querySelector('.editclose');

modal.addEventListener("click", function(){
    modalbg.classList.add('bg_active');
});
edit_modal.addEventListener("click",function() {
    editbg.classList.add('edit_active')
})

function editEmp(){
    alert('hello');
}




