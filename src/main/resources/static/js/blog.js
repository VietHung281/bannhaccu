var size = 6;

async function getBlogTrangChu() {
    var url = 'http://localhost:8080/api/public/find-all-instruct-page?size=3&page=0';
    const response = await fetch(url, {
        method: 'GET'
    });
    var result = await response.json();
    var list =result.content;
    var main = '';
    for(i=0;i<list.length; i++){
        main += `<div class="col-sm-4">
        <div class="singlebloglist">
            <a href="blogdetail?id=${list[i].id}"><img src="${list[i].imageBanner}" class="anhbloglist"></a>
            <div class="noidungbvlist">
                <a href="blogdetail?id=${list[i].id}" class="tieudebvlist">${list[i].title}</a>
                <span class="ngaydangbvlist">${list[i].createdDate}</span>
                <span class="motabvlist">${list[i].description}</span>
            </div>
        </div>
    </div>`
    }
    document.getElementById("blofindex").innerHTML = main;
}

async function loadChiTietBaiViet(){
    var uls = new URL(document.URL)
    var id = uls.searchParams.get("id");
    var url = 'http://localhost:8080/api/public/instructById?id='+id;
    const response = await fetch(url, {
        method: 'GET'
    });
    var result = await response.json();
    document.getElementById("titlebg").innerHTML = result.title
    document.getElementById("anhctbaiviet").src = result.imageBanner
    document.getElementById("noidungctbaiviet").innerHTML = result.content
}

async function loadAllBlogList(page) {
    var url = 'http://localhost:8080/api/public/find-all-instruct-page?page=' + page + '&size=' + size+'&sort=id,desc';
    const response = await fetch(url, {
        method: 'GET'
    });
    var result = await response.json();
    console.log(result)
    var list = result.content;
    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<div class="col-sm-4">
        <div class="singlebloglist">
            <a href="blogdetail?id=${list[i].id}"><img src="${list[i].imageBanner}" class="anhbloglist"></a>
            <div class="noidungbvlist">
                <a href="blogdetail?id=${list[i].id}" class="tieudebvlist">${list[i].title}</a>
                <span class="ngaydangbvlist">${list[i].createdDate}</span>
                <span class="motabvlist">${list[i].description}</span>
            </div>
        </div>
    </div>`
    }
    document.getElementById("blogchinh").innerHTML += main

    if(result.last == false){
        document.getElementById("btnbaiviet").onclick=function(){
            loadAllBlogList(Number(page) + Number(1));
        }
    }
    else{
        document.getElementById("btnbaiviet").onclick=function(){
            toastr.warning("Đã hết kết quả tìm kiếm");
        }
    }
}