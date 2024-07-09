var exceptionCode = 417;
var token = localStorage.getItem("token");
var user = localStorage.getItem('user');
async function loadMenu(){
    var authen = `<a href="login" class="pointermenu">Đăng nhập</a>`;
    if(token != null){
      authen =`
      <li class="nav-item dropdown" style="list-style: none; margin-right: 15px;">
      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="fa fa-user maincolor"></i>
      </a>
      <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
        <li><a class="dropdown-item" href="accounts">Tài khoản</a></li>
        <li><hr class="dropdown-divider"></li>
        <li onclick="logout()"><a class="dropdown-item" href="#">Đăng xuất</a></li>
      </ul>
  </li>
      `;
    }
    var menu = `<!-- <div class="topheader">-->
<!--&lt;!&ndash;    <div class="container">&ndash;&gt;-->
<!--&lt;!&ndash;        <div class="contenttopheader">&ndash;&gt;-->
<!--&lt;!&ndash;            <div class="div-align-right">&ndash;&gt;-->
<!--&lt;!&ndash;                <a href="blog" class="linktopheader"><i class="fa fa-edit"></i> Xem bài viết</a>&ndash;&gt;-->
<!--&lt;!&ndash;                <a href="contact" rel="noopener" class="linktopheader"><i class="fa fa-envelope contact-icon"></i> Liên hệ với chúng tôi</a>&ndash;&gt;-->
<!--&lt;!&ndash;                <a href="#" class="linktopheader"><i class="fab fa-facebook-messenger"></i> Chat với chúng tôi trên Messenger</a>&ndash;&gt;-->
<!--&lt;!&ndash;            </div>&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--</div>-->
<div class="bottomheader">
    <div class="container">
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
                <a href="index" class="navbar-brand"><img class="logoheader" src="image/logonew.jpg" alt=""></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <a href="cart">
                    <i style="border: none;" class="fa fa-shopping-bag navbar-toggler text-white"> <span class="slcartmenusm" id="slcartmenumobile">0</span></i>
                </a>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <div class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item"><a class="nav-link menulinkheader" href="index">Trang chủ</a></li>
                    <li class="nav-item"><a class="nav-link menulinkheader" href="product">Sản phẩm</a></li>
                    <li class="nav-item"><a class="nav-link menulinkheader" href="blog">Bài viết</a></li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle menulinkheader" href="#" id="navbarDropdownDm" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                          Danh mục
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdownDm" id="categoryheader">
                          <li><a class="dropdown-item" href="accounts">Tài khoản</a></li>
                        </ul>
                    </li>
                    <li class="nav-item"><a class="nav-link menulinkheader" href="instruction">Giới thiệu</a></li>
                </div>
                <div class="f-flex">
                    ${authen}
                </div>
                <div class="f-flex">
                    <a href="cart" class="pointermenu maincolor"><i class="fa fa-shopping-bag"><span class="slcartmenu" id="slcartmenu">0</span></i></a>
                </div>
                <div class="f-flex">
                    <div class="divsearchheader">
                        <form action="product" class="formsearchheader">
                            <input name="search" class="ipsearchheader" placeholder="TÌm kiếm">
                            <button class="btnsearchheader"><i class="fa fa-search"></i></button>
                        </form>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</div>`
document.getElementById("menu").innerHTML = menu
loadCategoryHeader();
loadCartMenu();
loadFooter();
}


function loadFooter(){
    var footer = 
    ` <footer class="text-center text-lg-start text-muted">
    <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
      <div class="me-5 d-none d-lg-block"><span>Theo dõi chúng tôi tại:</span></div>
      <div>
        <a href="" class="me-4 text-reset"><i class="fab fa-facebook-f"></i></a>
<!--        <a href="" class="me-4 text-reset"><i class="fab fa-twitter"></i></a>-->
<!--        <a href="" class="me-4 text-reset"><i class="fab fa-google"></i></a>-->
<!--        <a href="" class="me-4 text-reset"><i class="fab fa-instagram"></i></a>-->
<!--        <a href="" class="me-4 text-reset"><i class="fab fa-linkedin"></i></a>-->
<!--        <a href="" class="me-4 text-reset"><i class="fab fa-github"></i></a>-->
      </div>
    </section>
    <section class="">
      <div class=" text-center text-md-start mt-5">
      </div>
    </section>`
    try {
      document.getElementById("footer").innerHTML = footer
    } catch (error) {
      
    }
}

async function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.replace('login')
}

function formatmoney(money) {
  const VND = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
  });
  return VND.format(money);
}

async function loadCartMenu() {
  var listcart = localStorage.getItem("cartstore");
  if (listcart == null) {
      return;
  }
  var list = JSON.parse(localStorage.getItem("cartstore"));
  document.getElementById("slcartmenu").innerHTML = list.length
  document.getElementById("slcartmenumobile").innerHTML = list.length
}


async function loadCategoryHeader() {
  var url = 'http://localhost:8080/api/public/allcategory';
  const response = await fetch(url, {
      method: 'GET'
  });
  var list = await response.json();
  var main = '';
  for (i = 0; i < list.length; i++) {
      main += `<li><a class="dropdown-item" href="product?category=${list[i].id}">${list[i].name}</a></li>`
  }
  document.getElementById("categoryheader").innerHTML = main;
}

