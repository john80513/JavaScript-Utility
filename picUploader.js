//Pic uploader
bindMultiImageUploader: function (uploaderSelector, imageSelector, previewSelector) {
$(uploaderSelector).on("change", function (e) {
if (!$.validateFile($(e.currentTarget))) {
alert("請確認檔案格式正確");
return;
}
if (!$.validateFileSize($(e.currentTarget))) {
alert("請確認檔案大小是否超出限制");
return;
}
var fr = new FileReader();
fr.onload = function (e) {
var rawLog = fr.result;
var body = [];
if ($(imageSelector).val() == "") {
$(imageSelector).val("[]")
}
try {
body = JSON.parse($(imageSelector).val());
}
catch (e) {
$(imageSelector).val("[]")
}
body.push(rawLog);
$(imageSelector).val(JSON.stringify(body));
console.log(body);
if ($(imageSelector).val() != "") {
$(previewSelector).append("<img class=\"preview\" src=\"" + rawLog + "\" />");
$(previewSelector).find("img").show();
}
$(previewSelector).find("img").off();
$(previewSelector).find("img").on("click", function (e) {
var url = $(e.currentTarget).prop("src");
$(e.currentTarget).remove();
var text = JSON.parse($(imageSelector).val());
text = text.filter(v => v != url);
$(imageSelector).val(JSON.stringify(text));
});
};
fr.readAsDataURL($(e.currentTarget).prop('files')[0]);
});
},
