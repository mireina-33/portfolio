//フリースクロール----------------------------------------------
$(function () {
    //ナビゲーションをクリック
    $("a[href^=#]:not([href=#])").click(function () {
        //移動先のコンテンツの位置を取得
        var target = $($(this).attr("href")).offset().top;


        //コンテンツへスクロール
        $("html,body").animate({ scrollTop: target }, 500);

        return false;
    });
});

//フィルタリング---------------------------------------------------
$(function () {
    //ボタンを選択
    $("button").click(function () {
        //value属性の値を取得
        var target = $(this).attr("value");

        //全てのgridを調べる
        $("#sec1 .grid div").each(function () {
            //一度全て非表示にする
            $(this).animate({ "opacity": 0 }, 300, function () {
                $(this).hide();

                //フィルタリングの条件を満たしているか
                if ($(this).hasClass(target) || target == "all") {
                    //条件を満たしている場合は再表示
                    $(this).show();
                    $(this).animate({ "opacity": 1 }, 300);
                }
            });
        });

    });
})

//クリックしたら拡大画像----------------------------------------------
$(function () {
    //サムネールをクリック
    $("#product a").click(function () {
        //#propductの要素の最後にdiv#bgを追加
        $("#product").append('<div id="bg">');

        //#propductの要素の最後にdiv#photoを追加
        $("#product").append('<div id="photo">');

        //それぞれ非表示にする
        $("#bg").hide();
        $("#photo").hide();

        //photo要素の中にimgを追加
        $("#photo").html("<img>");

        //img要素にsrc属性を設定
        $("#photo img").attr("src", $(this).attr("href"));

        //img要素にwidth,height,alt属性を設定
        $("#photo img").attr("width", 500);
        $("#photo img").attr("height", 500);
        $("#photo img").attr("alt", "photo");

        //#bgと#photoをフェードイン
        $("#bg").fadeIn();
        $("#photo").fadeIn();

        //背景をクリック
        $("#bg").click(function () {
            //背景（自分自身）をフェードアウト、完了したら削除
            $(this).fadeOut(function () {
                $(this).remove();
            });

            //画像をフェードアウト、完了したら削除
            $("#photo").fadeOut(function () {
                $(this).remove();
            });
        });

        return false;
    });
});



//流れるテキスト---------------------------------------------------------
function slideAnime() {
    //====上に動くアニメーションここから===
    $('.upAnime').each(function () {
        var elemPos = $(this).offset().top - 50;
        var scroll = $(window).scrollTop();
        var windowHeight = $(window).height();
        if (scroll >= elemPos - windowHeight) {
            // 上から下へ表示するクラスを付与
            // テキスト要素を挟む親要素（上）とテキスト要素を元位置でアニメーションをおこなう
            $(this).addClass("slideAnimeUpDown");
            // 要素を上枠外に移動しCSS アニメーションで上から元の位置に移動
            $(this).children(".upAnimeInner").addClass("slideAnimeDownUp");
            // 子要素は親要素のアニメーションに影響されないように逆の指定をし元の位置をキープするアニメーションをおこなう
        } else {
            // 上から下へ表示するクラスを取り除く
            $(this).removeClass("slideAnimeUpDown");
            $(this).children(".upAnimeInner").removeClass("slideAnimeDownUp");
        }
    });
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
    slideAnime();/* アニメーション用の関数を呼ぶ*/
});// ここまで画面をスクロールをしたら動かしたい場合の記述

// 画面が読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
    slideAnime();/* アニメーション用の関数を呼ぶ*/
});// ここまで画面が読み込まれたらすぐに動かしたい場合の記述


//テキスト回転--------------------------------------------------------------
// rollAnimeにrollというクラス名を付ける定義
function RollAnimeControl() {
    $('.rollAnime').each(function () {
        var elemPos = $(this).offset().top - 50;
        var scroll = $(window).scrollTop();
        var windowHeight = $(window).height();
        var childs = $(this).children();  //rollAnimeの子要素を取得
        if (scroll >= elemPos - windowHeight) {
            $(childs).each(function (i) {   //子要素を1つ1つ処理をおこなう
                if (i < 10) {         //10未満の場合
                    $(this).css("transition-delay", "." + i + "s");  //子要素にcsstransition-delayを追加
                } else {             //10以上の場合
                    var n = i / 10;       //ミリ秒指定なので10で割る
                    $(this).css("transition-delay", n + "s");  //子要素にcsstransition-delayを追加
                }
            });

            $(this).addClass("roll"); //rollというアニメーションクラスを付与

        } else {
            $(childs).each(function () {    //子要素を1つ1つ処理をおこなう
                $(this).css("transition-delay", "0s");//子要素にcsstransition-delayの秒を0とする
            });
            $(this).removeClass("roll");//rollというアニメーションクラスを除去
        }
    });
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
    RollAnimeControl();/* アニメーション用の関数を呼ぶ*/
});// ここまで画面をスクロールをしたら動かしたい場合の記述

// 画面が読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
    //spanタグを追加する
    var element = $(".rollAnime");
    element.each(function () {
        var text = $(this).text();
        var textbox = [];
        text.split('').forEach(function (t, i) {
            if (t !== " ") {
                if (i < 10) {
                    textbox += '<span style="transition-delay:.' + i + 's;">' + t + '</span>';
                } else {
                    var n = i / 10;
                    textbox += '<span style="transition-delay:' + n + 's;">' + t + '</span>';
                }

            } else {
                textbox += t;
            }
        });
        $(this).html(textbox);
    });

    RollAnimeControl();/* アニメーション用の関数を呼ぶ*/
});// ここまで画面が読み込まれたらすぐに動かしたい場合の記述


//滑らかに出現---------------------------------------------------------------------------------------
// smoothTriggerにsmoothTextAppearというクラス名を付ける定義
function SmoothTextAnime() {
    $('.smoothTextTrigger').each(function () { //smoothTextTriggerというクラス名が
        var elemPos = $(this).offset().top - 50;//要素より、50px上の
        var scroll = $(window).scrollTop();
        var windowHeight = $(window).height();
        if (scroll >= elemPos - windowHeight) {
            $(this).addClass('smoothTextAppear');// 画面内に入ったらsmoothTextAppearというクラス名を追記
        } else {
            $(this).removeClass('smoothTextAppear');// 画面外に出たらsmoothTextAppearというクラス名を外す
        }
    });
}



// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
    SmoothTextAnime();/* アニメーション用の関数を呼ぶ*/
});// ここまで画面をスクロールをしたら動かしたい場合の記述

// 画面が読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
    SmoothTextAnime();/* アニメーション用の関数を呼ぶ*/
});// ここまで画面が読み込まれたらすぐに動かしたい場合の記述


