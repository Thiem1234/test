var socket = io("http://localhost:3000");
socket.on("server-send-dki-thatbai",function(){
    alert("Ten dang nhap da ton tai!!");
});
socket.on("server-send-dki-thanhcong",function(data){
    $("#currentUser").html(data);
    $("#loginForm").hide(2000);
    $("#chatForm").show(1000);
});

socket.on("server-send-mesage",function(data){
    $("#listMessages").append("<div class='ms'>"+data.un+": "+data.nd+"</div>");
});

socket.on("server-send-danhsach-Users",function(data){
    $("#boxContent").html("");
    data.forEach(function(i){
        $("#boxContent").append(" <div class='user'>* "+i+"</div>");
    });
});

$(document).ready(function(){
    $("#loginForm").show();
    $("#chatForm").hide();
    $("#btnRegister").click(function(){
        socket.emit("Client-send-Username",$("#txtUsername").val());
    });
    $("#btnLogout").click(function(){
        socket.emit("logout");
        $("#loginForm").show(2);
    $("#chatForm").hide(1);
    });
    $("#btnSendMessage").click(function(){
        socket.emit("user-send-message",$("#txtMessage").val());
    });

    $("#txtMessage").focusin(function(){
        socket.emit("toi-dang-go-chu");
    });
    $("#txtMessage").focusout(function(){
        socket.emit("toi-stop-go-chu");
    });
    socket.on("ai-do-dang-go-chu",function(data){
        $("#thongbao").html(data);
    });
    socket.on("ai-do-stop-go-chu",function(data){
        $("#thongbao").html("");
    });

});