async function loadCategory() {
    var url = 'http://localhost:8080/api/public/allcategory';
    const response = await fetch(url, {
        method: 'GET'
    });
    var list = await response.json();
    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<a href="product?category=${list[i].id}" class="category-item maincolor"><i class="fa fa-caret-right"></i> ${list[i].name}</a>`
    }
    document.getElementById("listcategory").innerHTML = main;
}


async function loadCategorySelect() {
    var url = 'http://localhost:8080/api/public/allcategory';
    const response = await fetch(url, {
        method: 'GET'
    });
    var list = await response.json();
    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<div class="singlelistmenu">
        <label class="checkbox-custom cateparent">${list[i].name}</i>
            <input value="${list[i].id}" class="inputcheck" name="catesearch" type="checkbox">
            <span class="checkmark-checkbox"></span>
        </label>
    </div>`
    }
    document.getElementById("listsearchCategory").innerHTML = main;
}


async function danhMucTrangChu() {
    var url = 'http://localhost:8080/api/public/allcategory';
    const response = await fetch(url, {
        method: 'GET'
    });
    var list = await response.json();
    var main = `<div class="listdmindex owl-2-style"><div class="owl-carousel owl-2" id="listcategoryindex">`
    for (i = 0; i < list.length; i++) {
        main += `<div class="media-29101">
                    <a href="product?category=${list[i].id}"><img src="${list[i].image}" alt="Image" class="img-fluid"></a>
                    <h3><a href="product?category=${list[i].id}">${list[i].name}</a></h3>
                </div>`;
    }
    main += `</div></div>`
    document.getElementById("dsmh_index").innerHTML = main;
    loadCou();
}
