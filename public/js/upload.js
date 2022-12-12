var img = false;

var gambar = $("input[name='image']");

$("input[name='user_id']").val(user_id);
gambar.change(e => {
    var fr = new FileReader();
    fr.readAsDataURL(gambar[0].files[0]);
    fr.onload = () => {
        img = true;
        $("#img").attr("src", fr.result);
    };
});