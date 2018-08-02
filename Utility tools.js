
//事件綁定
function PrepareEventforUI() {
    for (var i = 0; i < document.forms[0].elements.length; i++) {
        var a = document.forms[0].elements[i];
        if (a.id != '') {
            if (getObjectType(a.id) == 'select-one' || getObjectType(a.id) == 'text') {
                if (window[a.id + '_' + 'OnChange']) {
                    a.onchange = window[a.id + '_' + 'OnChange']
                }
                if (window[a.id + '_' + 'OnFocusIn']) {
                    a.onfocusin = window[a.id + '_' + 'OnFocusIn']
                }
                if (window[a.id + '_' + 'OnFocusOut']) {
                    a.onfocusout = window[a.id + '_' + 'OnFocusOut']
                }
                if (window[a.id + '_' + 'OnKeyUp']) {
                    a.onkeyup = window[a.id + '_' + 'OnKeyUp']
                }
                if (window[a.id + '_' + 'OnKeyDown']) {
                    a.onkeydown = window[a.id + '_' + 'OnKeyDown']
                }
            } else if (getObjectType(a.id) == 'radio' || getObjectType(a.id) == 'checkbox') {
                if (window[a.id + '_' + 'Onclick']) {
                    a.onclick = window[a.id + '_' + 'Onclick']
                }
            } else if (getObjectType(a.id) == 'button') {
                if (window[a.id + '_' + 'Onclick']) {
                    a.onclick = window[a.id + '_' + 'Onclick']
                }
            }
        }
    }
}

//getElementById contraction
function getObject(a) {
    return document.getElementById(a)
}


function getObjectType(a) {
    return getObject(a).type
}

//get value
function getObjectValue(a) {
    try {
        if (getObject(a)) {
            return $.trim(getObject(a).value)
        } else return ""
    } catch (err) {
        return ""
    }
}

function QueryString(a) {
    var b = window.location.search.substring(1);
    var c = b.split("&");
    for (var i = 0; i < c.length; i++) {
        var d = c[i].split("=");
        if (d[0] == a) return decodeURI(d[1])
    }
    return ""
}

/*Block ui plugin*/ 
function callBlockUI() {
    $.blockUI({
        message: '<h2 style="font-size:small;color:white;">Please Wait...</h1>',
        css: {
            border: 'none',
            padding: '15px',
            backgroundColor: '#000',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            opacity: .5,
            color: '#fff'
        }
    })
}

function callunBlockUI() {
    $.unblockUI()
}

// ajax constructor
function getAjaxPack() {
    if (!(this instanceof getAjaxPack)) {
        return new getAjaxPack()
    }
    this.AjaxPack = {
        _url: '',
        _parameter: {},
        _data: {},
        _type: 'post',
        _dataType: 'json',
        _toJson: function (a) {
            var b;
            b = JSON.parse(a);
            return b
        },
        get_path: function () {
            this._pathname = window.location.pathname;
            this.get_parameter()
        },
        get_parameter: function () {
            this._parameter = this._pathname.split('/')
        },
        _runAjax: function () {
            $.ajax({
                headers: {
                    'GATFMI': getObjectValue('GATFMI')
                },
                type: this._type,
                url: this._url,
                data: this._data,
                dataType: this._dataType,
                success: this._success,
                error: this._error
            })
        },
        _success: function (a) { },
        _error: function () {
            console.log('ajax return error!');
            callunBlockUI()
        },
        _timeouts: {},
        _errorMsg: ''
    }
}

function IsArray(a) {
    return Object.prototype.toString.apply(a) === '[object Array]'
}

//金額逗號分隔
function Comma(c) {
    var d = RemoveComma(c);
    var e = false;
    if (d.indexOf('-') != -1) {
        e = true;
        d = d.replace('-', '')
    }
    var f = /\d{1,3}(?=(\d{3})+$)/g;
    d = d.replace(/^(\d+)((\.\d+)?)$/, function (s, a, b) {
        return a.replace(f, "$&,") + b
    });
    if (e) {
        d = '-' + d
    }
    return d
}

function RemoveComma(a) {
    var b = $.trim(a);
    return b.replace(/\,/g, '')
}




//email 檢核
function ValidateEmail(a) {
    var b = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    if (a.search(b) != -1) {
        return true
    } else return false
}

//台灣手機號碼檢核
function ValidateCellPhone(a) {

    var b = /^(09)+[0-9]{8}$/;

    if (b.test(a) == true)
        return true;
    else
        return false;
}


var GarbageCollect = {
    removeObj: {}
};

function DestroyObject(a) {
    GarbageCollect.removeObj = a;
    delete GarbageCollect.removeObj
}

/* error message block style*/
function ShowMsg(a) {
    $('#h1ErrorMsg').html(a);
    $.blockUI({
        message: $('#DivErrorMsg'),
        css: {
            border: 'none',
            width: '255px',
            left: (parseInt($(window).width()) / 2 - 254 / 2).toString() + 'px',
            padding: '8px',
            backgroundColor: '#000',
            '-webkit-border-radius': '8px',
            '-moz-border-radius': '10px',
            opacity: .9
        }
    })
}

//decimal point delimiter
function DecimalWithLimit(a, b) {
    var c = /\d+(?=\.)/g;
    var d = String(a);
    if (d.search(c) == -1) {
        return a
    } else {
        d = d.split('.')[0] + '.' + ((d.split('.')[1]).length > b ? d.split('.')[1].substring(0, b) : d.split('.')[1]);
        return d
    }
}

/*create select option*/
function CreateEmptyDdlNode(a) {
    var b = document.createElement("option");
    b.setAttribute("value", "");
    var c = document.createTextNode(a);
    b.appendChild(c);
    return b
}

function CreateDdlNode(a, b) {
    var c = document.createElement("option");
    c.setAttribute("value", b);
    var d = document.createTextNode(a);
    c.appendChild(d);
    return c
}


function GetOperatingSystem() {
    var a = navigator.userAgent || navigator.vendor || window.opera;
    if (/windows phone/i.test(a)) {
        return "Windows Phone"
    }
    if (/android/i.test(a)) {
        return "Android"
    }
    if (/iPad|iPhone|iPod/.test(a) && !window.MSStream) {
        return "iOS"
    }
    return "PC"
}



//台灣身分證驗證
function IsRocIdentity(a) {
    var b = /^[A-Z]{1}(1|2|3)\d{8}$/i;
    if (a.search(b) == -1) {
        return false
    } else return true
}

function IsCmpTaxIdentity(a) {
    var b = /^\d{8}$/i;
    if (a.search(b) == -1) {
        return false
    } else return true
}

function putObjectValue(b, c) {
    var d = new getAjaxPack();
    d.AjaxPack._url = me.middleURL;
    d.AjaxPack._dataType = "text";
    d.AjaxPack._data = {
        'Func': 'object',
        'ObjID': b,
        'ObjValue': c
    };
    d.AjaxPack._success = function (a) {
        return
    };
    d.AjaxPack._runAjax()
}

function ControllerFocusOut() {
    for (var i = 0; i < document.forms[0].elements.length; i++) {
        var a = document.forms[0].elements[i];
        if (a.id != '') {
            if (getObjectType(a.id) == 'select-one' || getObjectType(a.id) == 'text') {
                $("#" + a.id).focusout(function () {
                    putObjectValue(this.id, this.value)
                })
            } else if (getObjectType(a.id) == 'radio' || getObjectType(a.id) == 'checkbox') { }
        }
    }
}

function ControllerValueCollect() {
    var a = '';
    for (var i = 0; i < document.forms[0].elements.length; i++) {
        var b = document.forms[0].elements[i];
        if (b.id != '') {
            if (getObjectType(b.id) == 'select-one') {
                a = a + b.id + ':' + b.value + '|'
            } else if (getObjectType(b.id) == 'text') {
                a = a + b.id + ':' + b.value + '|'
            } else if (getObjectType(b.id) == 'radio' || getObjectType(b.id) == 'checkbox') { }
        }
    }
    a = a.substring(0, a.length - 1);
    return a
}