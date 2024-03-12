import {Pagination} from '/js/common.js'
//페이징 객체 생성
const pagination = new Pagination(10, 10); // 한페이지에 보여줄 레코드건수,한페이지에 보여줄 페이지수
let  $productList = '';  // 목록 엘리먼트를 타겟
let  $loaddingImg = '';  // 로딩 이미지
renderHTML();

function renderHTML(){
    const $div = document.createElement('div');
      $div.innerHTML = `
         <div id='productList'></div>
         <div id='pagination'></div>
         <img id='loadding' src='/img/loadding.svg'>
        `;
        document.body.appendChild($div);
    if(window.chacklog){
          $div.innerHTML += `
             <div>
                   <form id='frm'>
                     <h3>댓글창</h3>
                     <div hidden>
                       <label for="email">이메일</label>
                       <input id='email' name='email' type="text" value=${window.logemail} readonly >
                     </div>
                     <div>
                       <label for="pname">유저명</label>
                       <input id='pname' name='pname' type="text" value=${window.logmember} readonly>
                     </div>
                     <div>
                       <label for="quantity">댓글</label>
                       <input id='quantity' name='quantity' type="text">
                     </div>
                    <div><button id='addBtn' type='button'>등록</button></div>
                   </form>
             </div>
            `;
            document.body.appendChild($div);
            const $addBtn = $div.querySelector('#addBtn');
            $addBtn.addEventListener('click',evt=>{
              console.log('등록');
              const formData = new FormData($div.querySelector('#frm'));
              const tester = {

                nickname : formData.get('pname'),
                tesetlog : formData.get('quantity'),
                email : formData.get('email')
              }
              console.log(tester);
              add(tester);
            });
    }

  //상품목록
  $productList = $div.querySelector('#productList');

  //로딩 이미지
  $loaddingImg = $div.querySelector('#loadding');
  $loaddingImg.style.position = 'absolute';
  $loaddingImg.style.top = '50vh';
  $loaddingImg.style.left = '50vw';
  $loaddingImg.style.transform = 'translate(-50%,-50%)';
  $loaddingImg.style.display = 'none';
  list();
}

//목록
async function list() {
  const reqPage = pagination.currentPage;   //요청 페이지
  const reqCnt = pagination.recordsPerPage; //페이지당 레코드수

  $loaddingImg.style.display = 'block';
  const url = `http://localhost:9080/api/products?reqPage=${reqPage}&reqCnt=${reqCnt}`;
  const option = {
    method:'GET',
    headers:{
      accept:'application/json'
    }
  };
  try {
    const res = await fetch(url,option);
    if(!res.ok) return new Error('서버응답오류')
    const result = await res.json(); //응답메세지 바디를 읽어 json포맷 문자열=>js객체
    if(result.header.rtcd == '00'){
      console.log(result.body);
      const str = result.body.map(item=>
                                 `<div >
                                 <span id="tester_id" hidden>${item.tester_id}</span>
                                 <span id="email" hidden>${item.email}</span>
                                  <span id="nickname">${item.nickname}</span>
                                  <span id="tesetlog">${item.tesetlog}</span>
                                  <span id="udate">수정날짜: ${item.udate}</span>
                                  <span><button class="minimodifyBtn">수정</button></span>
                                  <span><button class="minidelBtn">삭제</button></span>
                                </div>`).join('');
      $productList.innerHTML = str;

      //총 레코드 건수
      pagination.setTotalRecords(result.totalCnt);
      pagination.displayPagination(list);

    }else{
      new Error('목록 실패!');
    }
  }catch(err){
    console.error(err.message);
  }finally{
    $loaddingImg.style.display = 'none';
  }
}
// list();
//등록
async function add(Tester) {
  const url = `http://localhost:9080/api/products`;
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify(Tester),   // js객체=>json포맷 문자열
  };
  try {
    const res = await fetch(url, option);
    if (!res.ok) return new Error('서버응답오류');
    const result = await res.json(); //응답메세지 바디를 읽어 json포맷 문자열=>js객체
    if (result.header.rtcd == '00') {
      console.log(result.body);
      list();
    } else {
      new Error('등록 실패!');
    }
  } catch (err) {
    console.error(err.message);
  }
}
// product = {
//   pname: '컴퓨터',
//   quantity: '10',
//   price: 100,
// };

//수정
async function update(pid,tester) {
  const url = `http://localhost:9080/api/products/${pid}`;
  const option = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',  // 요청메세지 바디의 데이터포맷 타입
      accept: 'application/json',          // 응답메세지 바다의 데이터포맷 타입
    },
    body: JSON.stringify(tester), // js객체=>json포맷 문자열
  };
  try {
    const res = await fetch(url, option);
    console.log(res);
    if (!res.ok) return new Error('서버응답오류');
    const result = await res.json(); //응답메세지 바디를 읽어 json포맷 문자열=>js객체
    console.log(result.header.rtcd);
    if (result.header.rtcd == '00') {
      console.log(result.body);
      list();
    } else {
      new Error('수정 실패!');
    }
  } catch (err) {
    console.error(err.message);
  }
}
// const product = {
//   pname:'만년필',
//   quantity:10,
//   price:100000
// }
// update(263,product);
//삭제
async function deleteById(pid) {

  const url = `http://localhost:9080/api/products/${pid}`;
  const option = {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
    },
  };
  try {
    const res = await fetch(url, option);
    console.log(res);
    if (!res.ok) return new Error('서버응답오류');
    const result = await res.json(); //응답메세지 바디를 읽어 json포맷 문자열=>js객체
    console.log(result.header.rtcd);
    if (result.header.rtcd == '00') {
      console.log(result.body);
      list();
    } else {
      new Error('삭제 실패!');
    }
  } catch (err) {
    console.error(err.message);
  }
}
async function cancel(){
        console.log('취소');
        list();
    }
async function modify(evt){
      console.log('수정');
      const $div = evt.target.closest('div');
      const $tester_id = evt.target.closest('div').querySelector('#tester_id').innerText;
      const $email = evt.target.closest('div').querySelector('#email').innerText;
      const $nickname = evt.target.closest('div').querySelector('#nickname').innerText;
      const $tesetlog = evt.target.closest('div').querySelector('#tesetlog').innerText;
      console.log(evt.target.closest('div').querySelector('#udate').innerText);
      const str = `<div>
                    <form id='data'>
                    <span id="tester_id" hidden><input id='tester_id' name='tester_id' type="text" value= ${$tester_id} readonly ></span>
                    <span id="email" hidden><input id='email' name='email' type="text" value= ${$email} readonly ></span>
                    <span id="nickname"><input id='nickname' name='nickname' type="text" value=${$nickname} readonly></span>
                    <span id="tesetlog"><input id='tesetlog' name='tesetlog' type="text" value=${$tesetlog} ></span>
                    <span><button type='button' class="minisaveBtn">저장</button></span>
                    <span><button type='button' class="minicancelBtn">취소</button></span>
                  </form>
                  </div>`;
      $div.innerHTML = str;
    }
document.querySelector('#productList').addEventListener('click',evt=>{
      if(evt.target.tagName !== 'BUTTON') return;
      switch(evt.target.classList[0]){
        //수정
        case "minimodifyBtn" : modify(evt); break;
        //삭제
        case "minidelBtn" : deleteById(parseInt(evt.target.closest('div').querySelector('#tester_id').innerText)); break;
        //저장
        case "minisaveBtn" :
            const formData = new FormData(document.querySelector('#data'));
            const tester = {
                            nickname : formData.get('nickname'),
                            tesetlog : formData.get('tesetlog'),
                            email : formData.get('email')
                          };
            update(parseInt(formData.get('tester_id')),tester);
            break;
        //취소
        case "minicancelBtn" : cancel(); break;
      }
    });
// deleteById(263);
// findById(263);