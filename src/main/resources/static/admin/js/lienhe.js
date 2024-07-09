async function loadLienHe() {
    $('#example').DataTable().destroy();
    var url = 'http://localhost:8080/api/contact/admin/find-all';
    if(document.getElementById("checklienhe").checked == true){
        url = 'http://localhost:8080/api/contact/admin/not-read';
    }
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    var list = await response.json();
    var main = '';
    for (i = 0; i < list.length; i++) {
        var dadoc = `<label class="checkbox-custom">
        <input id="inpcheck${list[i].id}" onchange="xacNhanDoc(${list[i].id})" type="checkbox">
        <span class="checkmark-checkbox"></span>`
        if(list[i].read == true){
            dadoc = `<label class="checkbox-custom">
            <input type="checkbox" checked disabled>
            <span class="checkmark-checkbox"></span>`
        }
        main += ` <tr>
                    <td>${list[i].fullName}</td>
                    <td>${list[i].phone}</td>
                    <td>${list[i].email}</td>
                    <td>${list[i].content}</td>
                    <td>${list[i].createdDate}</td>
                    <td class="sticky-col">
                        ${dadoc}
                    </td>
                </tr>`
    }
    document.getElementById("listblog").innerHTML = main;
    $('#example').DataTable();
}



async function xacNhanDoc(id) {
    var url = 'http://localhost:8080/api/contact/admin/read-accept?id=' + id;
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    if (response.status < 300) {
        toastr.success("Thành công");
        document.getElementById("inpcheck"+id).disabled = true
    } else {
        toastr.error("Thất bại");
    }
}
