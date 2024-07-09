async function createLienHe() {
    var contact = {
        "phone": document.getElementById("phone").value,
        "fullName": document.getElementById("hoten").value,
        "email": document.getElementById("email").value,
        "content": document.getElementById("content").value,
    }
    const response = await fetch('http://localhost:8080/api/contact/public/create', {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(contact)
    });
    if (response.status < 300) {
        swal({title: "Thông báo", text: "Đã gửi liên hệ!",type: "success"},
        function(){ 
            window.location.reload();
        });
    }
    else {
        swal({title: "Thông báo", text: "Có lỗi xảy ra!",type: "error"},
        function(){ });
    }
}
