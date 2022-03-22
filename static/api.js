function createPost() {
    const writer = $("#formWriter").val();
    const pw = $("#formPw").val();
    const title = $("#formTitle").val();
    const description = $("#formDesc").val();
    const date = moment().format("YYYY-MM-DD");
  
    if (writer === "") {
      alert("이름을 입력해주세요.");
      return;
    } else if (pw === "") {
      alert("비밀번호를 입력해주세요.");
      return;
    } else if (title === "") {
      alert("제목을 입력해주세요.");
      return;
    } else if (description === "") {
      alert("내용을 입력해주세요.");
      return;
    }
  
    $.ajax({
      type: "POST",
      url: "/api/post",
      data: {
        writer: writer,
        pw: pw,
        title: title,
        description: description,
        date: date,
      },
      success: function (response) {
        alert(response["msg"]);
        location.href = "/";
      },
    });
  }
  
  function updatePost(id) {
    const _id = id;
    const writer = $("formWriter").val();
    const pw = $("#formPw").val();
    const title = $("#formTitle").val();
    const description = $("#formDesc").val();
  
    $.ajax({
      type: "PUT",
      url: "/api/update",
      data: {
        _id: _id,
        writer: writer,
        pw: pw,
        title: title,
        description: description,
      },
      success: function (response) {
        // location.href = "/";
        if (response["success"]) {
          alert(response["msg"]);
          location.href = "/detail/" + _id;
        } else {
          alert(response["msg"]);
        }
      },
    });
  }
  
  function deletePost(id) {
    const _id = id;
    const pw = $("#formPw").val();
  
    $.ajax({
      type: "DELETE",
      url: "/api/delete",
      data: {
        _id: _id,
        pw: pw,
      },
      success: function (response) {
        if (response["success"]) {
          alert(response["msg"]);
          location.href = "/";
        } else {
          alert(response["msg"]);
        }
      },
    });
  }