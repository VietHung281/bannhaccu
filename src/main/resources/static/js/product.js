var size = 5;
async function loadProductBanChayIndex(page) {
    var url = 'http://localhost:8080/api/public/product-by-param?page=' + page + '&size=' + size+'&sort=quantitySold,desc';
    const response = await fetch(url, {
        method: 'GET'
    });
    var result = await response.json();
    console.log(result)
    var list = result.content;

    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<div class="col-lg-20p col-md-4 col-sm-3 col-6">
        <div class="singleproductpage">
            <a href="detail?id=${list[i].id}"><img src="${list[i].imageBanner}" class="anhsplist"></a>
            <a href="detail?id=${list[i].id}" class="tensplist">${list[i].name}</a>
            <span class="soluongdabanlist">Đã bán: ${list[i].quantitySold}</span>
            <p class="giasplist">${formatmoney(list[i].price)}</p>
        </div>
    </div>`;
    }
    document.getElementById("listproductindex").innerHTML += main
    if(result.last == false){
        document.getElementById("btnsanphambanchay").onclick=function(){
            loadSanPhamBanChay(Number(page) + Number(1));
        }
    }
    else{
        document.getElementById("btnsanphambanchay").onclick=function(){
            toastr.warning("Đã hết kết quả tìm kiếm");
        }
    }
}

async function loadProductMoiNhatrIndex(page) {
    var url = 'http://localhost:8080/api/public/product-by-param?page=' + page + '&size=' + size+'&sort=id,desc';
    const response = await fetch(url, {
        method: 'GET'
    });
    var result = await response.json();
    console.log(result)
    var list = result.content;

    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<div class="col-lg-20p col-md-4 col-sm-3 col-6">
        <div class="singleproductpage">
            <a href="detail?id=${list[i].id}"><img src="${list[i].imageBanner}" class="anhsplist"></a>
            <a href="detail?id=${list[i].id}" class="tensplist">${list[i].name}</a>
            <span class="soluongdabanlist">Đã bán: ${list[i].quantitySold}</span>
            <p class="giasplist">${formatmoney(list[i].price)}</p>
        </div>
    </div>`;
    }
    document.getElementById("listproductmoiindex").innerHTML += main
    if(result.last == false){
        document.getElementById("btnsanphammoi").onclick=function(){
            loadProductMoiNhatrIndex(Number(page) + Number(1));
        }
    }
    else{
        document.getElementById("btnsanphammoi").onclick=function(){
            toastr.warning("Đã hết kết quả tìm kiếm");
        }
    }
}


async function loadSpBanChayGy() {
    var url = 'http://localhost:8080/api/public/product-by-param?page=0&size=3&sort=quantitySold,desc';
    const response = await fetch(url, {
        method: 'GET'
    });
    var result = await response.json();
    console.log(result)
    var list = result.content;

    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `
        <div class="singleproductpage">
            <a href="detail?id=${list[i].id}"><img src="${list[i].imageBanner}" class="anhsplist"></a>
            <a href="detail?id=${list[i].id}" class="tensplist">${list[i].name}</a>
            <span class="soluongdabanlist">Đã bán: ${list[i].quantitySold}</span>
            <p class="giasplist">${formatmoney(list[i].price)}</p>
        </div>`;
    }
    document.getElementById("listspgioiy").innerHTML = main
}


async function loadAproduct(){
    var uls = new URL(document.URL)
    var id = uls.searchParams.get("id");
    var url = 'http://localhost:8080/api/public/productByID?id='+id;
    const response = await fetch(url, {
        method: 'GET'
    });
    var result = await response.json();
    document.getElementById("detailnamepro").innerHTML = result.name
    document.getElementById("codepro").innerHTML = result.code
    document.getElementById("descriptiondetail").innerHTML = result.description
    document.getElementById("quansale").innerHTML = "Đã bán: "+result.quantitySold;
    var main = ''
    for(i=0; i<result.productImages.length; i++){
        main += `<div class="col-lg-20p col-md-3 col-sm-4 col-4 singdimg">
        <img onclick="clickImgdetail(this)" src="${result.productImages[i].linkImage}" class="imgldetail">
    </div>`
    }
    document.getElementById("listimgdetail").innerHTML = main


    document.getElementById("pricedetail").innerHTML = formatmoney(result.price)
    document.getElementById("imgdetailpro").src = result.imageBanner
    document.getElementById("btnaddcart").onclick = function(){
        addCart(result.id, document.getElementById("inputslcart").value);
    }
    
}


async function clickImgdetail(e) {
    var img = document.getElementsByClassName("imgldetail");
    for (i = 0; i < img.length; i++) {
        document.getElementsByClassName("imgldetail")[i].classList.remove('imgactive');
    }
    e.classList.add('imgactive')
    document.getElementById("imgdetailpro").src = e.src
}

async function loadProductSearch(){
    var uls = new URL(document.URL)
    var search = uls.searchParams.get("search");
    var category = uls.searchParams.get("category");
    if(search != null){
        loadProductByParam(0,search);
    }
    else if(category != null){
        loadProductByCategory(0,category);
    }
    else{
        loadProductMoiNhatrIndex(0); 
    }
}

async function loadProductByCategory(page,category){
    var cate = category;
    var url = 'http://localhost:8080/api/public/product-by-category-id?page=' + page + '&size=' + size+'&id='+cate;
    const response = await fetch(url, {
        method: 'GET'
    });
    var result = await response.json();
    var list = result.content;
    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<div class="col-lg-20p col-md-4 col-sm-3 col-6">
        <div class="singleproductpage">
            <a href="detail?id=${list[i].id}"><img src="${list[i].imageBanner}" class="anhsplist"></a>
            <a href="detail?id=${list[i].id}" class="tensplist">${list[i].name}</a>
            <span class="soluongdabanlist">Đã bán: ${list[i].quantitySold}</span>
            <p class="giasplist">${formatmoney(list[i].price)}</p>
        </div>
    </div>`;
    }
    document.getElementById("listproductmoiindex").innerHTML += main
   
    if(result.last == false){
        document.getElementById("btnsanphammoi").onclick=function(){
            loadProductByCategory(Number(page) + Number(1), category);
        }
    }
    else{
        document.getElementById("btnsanphammoi").onclick=function(){
            toastr.warning("Đã hết kết quả tìm kiếm");
        }
    }
}

async function loadProductByParam(page,search){
    var param = search;
    var url = 'http://localhost:8080/api/public/product-by-param?page=' + page + '&size=' + size+'&search='+param;
    const response = await fetch(url, {
        method: 'GET'
    });
    var result = await response.json();
    var list = result.content;

    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<div class="col-lg-20p col-md-4 col-sm-3 col-6">
        <div class="singleproductpage">
            <a href="detail?id=${list[i].id}"><img src="${list[i].imageBanner}" class="anhsplist"></a>
            <a href="detail?id=${list[i].id}" class="tensplist">${list[i].name}</a>
            <span class="soluongdabanlist">Đã bán: ${list[i].quantitySold}</span>
            <p class="giasplist">${formatmoney(list[i].price)}</p>
        </div>
    </div>`;
    }
    document.getElementById("listproductmoiindex").innerHTML += main
   
    if(result.last == false){
        document.getElementById("btnsanphammoi").onclick=function(){
            loadProductByParam(Number(page) + Number(1), search);
        }
    }
    else{
        document.getElementById("btnsanphammoi").onclick=function(){
            toastr.warning("Đã hết kết quả tìm kiếm");
        }
    }
}

async function loadFullProduct(page, check){
    if(check == false){
        document.getElementById("listproductmoiindex").innerHTML = '';
    }
    document.getElementById("loadingpage").style.display = 'block'
    var min_price = document.getElementById("min_price").value;
    var max_price = document.getElementById("max_price").value;
    var listCa = document.getElementById("listsearchCategory").getElementsByClassName("inputcheck");
    var listcate = [];
    for (i = 0; i < listCa.length; i++) {
        if (listCa[i].checked == true) {
            listcate.push(listCa[i].value);
        }
    }
    var obj = {
        "smallPrice":min_price,
        "largePrice":max_price,
        "listIdCategory":listcate
    }
    var url = 'http://localhost:8080/api/public/search-full-product?page=' + page + '&size=' + size;
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(obj)
    });
    var result = await response.json();
    var list = result.content;
    console.log(result);
    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<div class="col-lg-20p col-md-4 col-sm-3 col-6">
        <div class="singleproductpage">
            <a href="detail?id=${list[i].id}"><img src="${list[i].imageBanner}" class="anhsplist"></a>
            <a href="detail?id=${list[i].id}" class="tensplist">${list[i].name}</a>
            <span class="soluongdabanlist">Đã bán: ${list[i].quantitySold}</span>
            <p class="giasplist">${formatmoney(list[i].price)}</p>
        </div>
    </div>`;
    }
    document.getElementById("listproductmoiindex").innerHTML += main
   
    if(result.last == false){
        document.getElementById("btnsanphammoi").onclick=function(){
            loadFullProduct(Number(page) + Number(1), true);
        }
    }
    else{
        document.getElementById("btnsanphammoi").onclick=function(){
            toastr.warning("Đã hết kết quả tìm kiếm");
        }
    }

    await new Promise(r => setTimeout(r, 500));
    document.getElementById("loadingpage").style.display = 'none'
}

function onReady(callback) {
    var intervalId = window.setInterval(function() {
      if (document.getElementsByTagName('body')[0] !== undefined) {
        window.clearInterval(intervalId);
        callback.call(this);
      }
    }, 1000);
}

