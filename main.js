"use strict";

//変数の定義
let result = "";//答え


let clearFlag = false;//#resultに値が入っているかどうか
let enzan = "";//数字を入力
let dot = false;//
let errorFlag = false;





//ACをクリック
$(function () {
    $("#AC").click(function () {
        //値がresultに入っていたら
        if (clearFlag == false) {
            $("#result").text("0");
            result = "";
            //演算記号もクリアにする
            enzan = "";
            $(".button").prop("disabled", false);
            $("#dot").prop("disabled", false);
            dot = false;
            clearFlag = false;
            errorFlag = false;
            $("#result").text("0");
        }
    });
});



//数字ボタンで数値を入力
$(function () {
    $(".button").click(function () {
        let num = $(this).val();
        //入力可能桁数は10桁までとする
        if ($("#result").text().length >= 10) {
            $("#result").text("error!");
            $(".button").prop("disabled", true);
        } else {
            //clearFlag = trueなら表示中の数字をクリアにする
            if (clearFlag === true) {
                $("#result").text("");
                //数字を押した時に表示がクリアにされる様クリアフラグを立てる
                clearFlag = false;
                //小数点をまた押せる様にする
                $("#dot").prop("disabled", false);
            }
            $("#result").text(Number($("#result").text() + num));
        }
    });
});




//小数点が押されたら表示中に２度目は押せなくする
$(function () {
    $("#dot").on("click", function () {
        $("dot").prop("disabled", true);
        Number($("#result").text($("#result").text() + $(this).val()));
    });
});


//＋を押したらenzanClickに"+"を渡す
$(function () {
    $("#plus").click(function () {
        enzanClick("+")
    });
});


//ーを押したらenzanClickに"-"を渡す
$(function () {
    $("#minus").click(function () {
        enzanClick("-")
    });
});


//×を押したらenzanClickに"*"を渡す
$(function () {
    $("#times").click(function () {
        enzanClick("*")
    });
});


//➗を押したらenzanClickに"/"を渡す
$(function () {
    $("#divide").click(function () {
        enzanClick("/")
    });
});


//enzanClickは前の演算記号を覚えていなければ今の表示している値をresultに保存する
function enzanClick(kigou) {
    if (enzan === "") {
        result = Number($("#result").text());
    } else {
        enzanClick1()
    }

    //表示を10桁以内にする
    digit()

    clearFlag = true;
    enzan = kigou;
}


//演算記号が何か覚えていれば、resultに保存した値と表示中の値と記憶した演算記号で計算する
function enzanClick1() {
    if (enzan === "+") {
        result += Number($("#result").text());
    } else if (enzan === "-") {
        result -= Number($("#result").text());
    } else if (enzan === "*") {
        result *= Number($("#result").text());
    } else if (enzan = "/") {
        result /= Number($("#result").text());
    }
}

//=を押したとき
$(function () {
    $("#equal").click(function () {
        enzanClick1()
        digit()
        result = 0;
        clearFlag = false;
        enzan = "";
    });
});

//表示を10桁以内にする
function digit() {
    //小数点で切り分ける
    let num1 = String(result).split(".");

    //整数部で11桁以上の場合、エラーを表示
    if (num1[0].length > 10) {
        $("#result").text("error!");
    }
    //整数部で10桁までの場合、整数部はそのまま表示、小数部は値を丸めて全部で10桁以内にする
    //10から整数部の桁を引いた数だけ小数部を表示できる
    else if (String(result).length >= 10 && num1[0].length <= 10) {
        let decimal = 10 - num[0].length;
        result = Number(result).toFixed(decimal);
        $("#result").val(result);
    } else {
        $("#result").text(result);
    }
}