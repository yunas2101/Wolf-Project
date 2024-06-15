/** 페이지 로드 이후 동작해야 할 스크립트 **/
$(() => {
	var pathname = window.location.pathname;
	
	// 이미지 미리보기
	if(pathname === "/page_game_insert.admin"){
        $("#admin_game_thumbnail").on("change", (e) => {
            const file = e.target.files[0];
            if(file){
                const reader = new FileReader();
                reader.onload = function(e) {
                    $("#imagePreview").attr("src", e.target.result);
                    $("#imagePreview").show();
                 	$("#imagePreviewBtn").show();
                }
                reader.readAsDataURL(file);
            } else {
                $("#imagePreview").attr("src", "");
                $("#imagePreview").hide();
                $("#imagePreviewBtn").hide();
			}
        });
    }
    
    // Game Insert Validation
    $("#admin_game_insert").on("submit", () => {
		$("#game_discription").val($("#div_game_discription").html().trim);
		$("#game_contents").val($("#div_game_contents").html().trim);
		
		if($("#admin_game_thumbnail").val() === ""){
			alert("thumbnail 이미지 없음!");
			return false;
		}
		
		if($("#game_title").val() === ""){
			alert("제목을 읿력하세요");
			return false;
		}
		
		if($("#game_discription").val() === ""){
			alert("요약 내용을 입력하세요");
			return false;
		}
		
		if($("#game_contents").val() === ""){
			alert("상세 내용을 입력하세요.");
			return false;
		}
	});
	
	const gameInsertValidation = () => {
		$("#game_discription").val($("#div_game_discription").html().trim);
		$("#game_contents").val($("#div_game_contents").html().trim);
		
		if($("#admin_game_thumbnail").val() === ""){
			alert("thumbnail 이미지 없음!");
			return false;
		}
		
		if($("#game_title").val() === ""){
			alert("제목을 읿력하세요");
			return false;
		}
		
		if($("#game_discription").val() === ""){
			alert("요약 내용을 입력하세요");
			return false;
		}
		
		if($("#game_contents").val() === ""){
			alert("상세 내용을 입력하세요.");
			return false;
		}
	}
    
    
});


// ====================================== [ 멤버 ] ===========================================

// Member 정보를 수정할 수 있게 폼을 바꾸는 함수
const adminMemberEdit = (defaultValue) => {
	$('#grade_select').val(defaultValue); 
	$('#grade_select').css({"display": "inline-block"});
	$('#grade').css({"display": "none"});
	
	// 버튼
	$(".btn-box1").css({"display":"none"});
	$(".btn-box2").css({"display": "flex", "justify-content": "space-evenly", "align-items": "center"});
}

// Member의 등급을 수정하는 함수
const adminMemberUpdate = (id) => {
	if($("#grade_select").val() === "99" || $("#grade_select").val() === "98"){
		if(confirm("정말 관리자로 변경하시겠습니까?")){
		} else return false;
	}
	
	$.ajax({
		url: "/members_update.admin",
		method: "post",
		data:{
			grade: $("#grade_select").val(),
			id: id
		}
	})
	.done((res)=> {
		console.log("res === ", res);
		if(res === "ok"){
			location.href = `members_detail.admin?id=${id}`;
		}
	});
}

// ====================================== [ 게 임 ] ===========================================

const previewImageDelete = () => {
	$("#admin_game_thumbnail").val("");
	$("#imagePreview").attr("src", "");
	$("#imagePreview").hide();
	$("#imagePreviewBtn").hide();
}


// Game 정보를 수정할 수 있게 폼을 바꾸는 함수
const adminGameEdit = () => {
	$(".admin-game-btn").css({"display": "none"});
	$(".admin-game-update-btn").css({
		"display": "flex", 
		"justify-content": "space-evenly", 
		"align-items": "center"
	});

}

// Game 정보를 수정하는 함수
const amdinGameUpdate = () => {
	$.ajax({
		url: "/game_update.admin",
		method: "psot",
		data: {
			
		}
	})
	.done((res) => {
		console.log("res ==== ", res);
	});
}

// Game정보를 삭제하는 함수
const adminGameDelete = (seq) => {
	if(confirm("정말로 삭제하시겠습니까?")){
		$.ajax({
			url: "/game_delete.admin",
			method: "post",
			data:{
				seq
			}
		})
		.done((res)=> {
			if(res === "ok"){
				location.href = "/game_list.admin";
			}
		});
	}
}

// ====================================== [ 공 통 ] ===========================================

/** 페이지 네비게이션 함수 **/
const pagenation = (cpage, recordTotalCount, recordCountPerPage, naviCountPerPage, url) => {
	
	// 총 페이지 수
	let pageTotalCount = 0;
	if(recordTotalCount % recordCountPerPage > 0) pageTotalCount = recordTotalCount / recordCountPerPage + 1;
	else pageTotalCount = recordTotalCount / recordCountPerPage;
	
	// 네비게이터의 시작 번호
	let startNavi = Math.floor((cpage - 1) / naviCountPerPage) * naviCountPerPage + 1
	
	// 네비게이터의 마지막 번호
	let endNavi = startNavi + naviCountPerPage - 1;
	
	if(endNavi > pageTotalCount) endNavi = pageTotalCount;
	
	let needNext = true;
	let needPrev = true;
	
	if(startNavi == 1) needPrev = false;
	if(endNavi == pageTotalCount) needNext = false;
	
	if(needPrev){
		let prev = `<a href='${url}?cpage=${(startNavi - 1)}'> < </a>`;
		$('.page-navigation').append(prev);
	}
	
	for(let i = startNavi; i <= endNavi; i++){
		if(cpage === i){
			let items = `<a href='${url}?cpage=${i}'> ${i} </a>`;
    		$('.page-navigation').append(items);
		} else {
			let items = `<a href='${url}?cpage=${i}'> ${i} </a>`;
    		$('.page-navigation').append(items);	
		}
	}
	
	if(needNext) {
		let next = `<a href='${url}?cpage=${(endNavi + 1)}'> > </a>`;
		$('.page-navigation').append(next);
	}
	
}