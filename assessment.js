'use strict';
// 変数名の定義
const userNameInput = document.getElementById('user-name'); //inputタグのIDを取得すると入力されたテキストもvalueで取得できる
const assessmentButton = document.getElementById('assessment');
const resultDivision = document.getElementById('result-area');
const tweetDivision = document.getElementById('tweet-area');

// ボタンをクリックしたときの動作 ＊無名関数を使う、再利用しないから
assessmentButton.addEventListener( //イベント検知設定の追加
  'click', // クリックイベント→＊練習問題でEnterキーが押されたときの挙動に変更した
  // 省略の書き方はアロー関数で書ける、function()を() =>と省略記述できる
  function () { //無名関数()の前に名前が付いてない、イベントを検知したら実行
    //console.log('ボタンが押されました'); // 挙動確認用のコンソールログ表示

    const userName = userNameInput.value; // 入力欄（input）の値を取得
    if (userName.length === 0) { // 入力が空だったら
      return; // 名前が空白の時は処理を終了
    }

    // TO DO 診断結果表示のエリアの作成 ＊id="result-area"div内に子要素として診断結果表示のHTMLが出現する
     // headerDivision の作成
    resultDivision.innerText = ''; // divタグを空文字列で上書きリセットする、これによって診断結果が連続表示する現象を防ぐことができる
    const headerDivision = document.createElement('div');
    headerDivision.setAttribute('class', 'card-header text-bg-primary');
    headerDivision.innerText = '診断結果';

    // 診断結果のassessment関数が実行され配列の結果が表示される
    // bodyDivision の作成
    const bodyDivision = document.createElement('div');
    bodyDivision.setAttribute('class', 'card-body');
    const paragraph = document.createElement('p');
    paragraph.setAttribute('class', 'card-text');
    const result = assessment(userName);
    paragraph.innerText = result;
    bodyDivision.appendChild(paragraph);

    // resultDivision に Bootstrap のスタイルを適用する
    resultDivision.setAttribute('class', 'card');

    // headerDivision と bodyDivision を resultDivision に差し込む
    resultDivision.appendChild(headerDivision);
    resultDivision.appendChild(bodyDivision);

    // TO DO ツイートエリアの作成
    tweetDivision.innerText = '';
    const anchor = document.createElement('a');
    const hrefValue =
      'https://x.com/intent/tweet?button_hashtag=' + encodeURIComponent('あなたのいいところ') + '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('class', 'twitter-hashtag-button');
    anchor.setAttribute('data-text', result); //教材だとresultは'診断結果の文章'で後半でresultの変数に置き換えた
    anchor.innerText = 'Tweet #あなたのいいところを投稿する';
    tweetDivision.appendChild(anchor);

    // Twitterウィジェットの追加
    const script = document.createElement('script'); // scriptタグ作成
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivision.appendChild(script);

  }
);

// テキスト入力後Enterを押すと診断処理が表示される機能
userNameInput.addEventListener(
  'keydown',
  (event) => {
    if(event.code === 'Enter') {
      // TODO Enter が押されたときに実行する処理
      assessmentButton.dispatchEvent(new Event('click'));
    }
  }
)


// 配列の定義
const answers = [
  '###userName###のいいところは声です。###userName###の特徴的な声は皆を惹きつけ、心に残ります。',
  '###userName###のいいところはまなざしです。###userName###に見つめられた人は、気になって仕方がないでしょう。',
  '###userName###のいいところは情熱です。###userName###の情熱に周りの人は感化されます。',
  '###userName###のいいところは厳しさです。###userName###の厳しさがものごとをいつも成功に導きます。',
  '###userName###のいいところは知識です。博識な###userName###を多くの人が頼りにしています。',
  '###userName###のいいところはユニークさです。###userName###だけのその特徴が皆を楽しくさせます。',
  '###userName###のいいところは用心深さです。###userName###の洞察に、多くの人が助けられます。',
  '###userName###のいいところは見た目です。内側から溢れ出る###userName###の良さに皆が気を惹かれます。',
  '###userName###のいいところは決断力です。###userName###がする決断にいつも助けられる人がいます。',
  '###userName###のいいところは思いやりです。###userName###に気をかけてもらった多くの人が感謝しています。',
  '###userName###のいいところは感受性です。###userName###が感じたことに皆が共感し、わかりあうことができます。',
  '###userName###のいいところは節度です。強引すぎない###userName###の考えに皆が感謝しています。',
  '###userName###のいいところは好奇心です。新しいことに向かっていく###userName###の心構えが多くの人に魅力的に映ります。',
  '###userName###のいいところは気配りです。###userName###の配慮が多くの人を救っています。',
  '###userName###のいいところはそのすべてです。ありのままの###userName###自身がいいところなのです。',
  '###userName###のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる###userName###が皆から評価されています。',
  '###userName###のいいところは優しさです。###userName###の優しい雰囲気や立ち振る舞いに多くの人が癒やされています。',
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
  // 全文字のコード番号を取得してそれを足し合わせる
  let sumOfCharCode = 0; //文字コードの合計を取っておく変数
  for (let i = 0; i < userName.length; i++){ //文字数回ループ
    // sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    // ↓先生の書き方
    sumOfCharCode += userName.charCodeAt(i); //合計を計算
  }
  // 文字のコード番号の合計を回答の数で割って添字の数値を求める
  // 合計値を配列の要素数で余りを取ることで、配列の要素数を数値に収める
  const index = sumOfCharCode % answers.length;
  let result = answers[index]; //配列から答えを取得

  // TODO ###userName### をユーザの名前に置き換える
  result = result.replaceAll('###userName###', userName);
  return result;
}






// 動作確認 *太郎が2回目でも同じ結果が出ることを目視確認する
/* console.log(assessment('太郎'));
console.log(assessment('二郎'));
console.log(assessment('太郎'));


// テストを行う関数
function test() {
  console.log('診断結果のテスト');

  // 太郎
  console.log('太郎');
  console.assert(
    assessment('太郎') ===
    '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );

  // 次郎
  console.log('次郎');
  console.assert(
    assessment('次郎') ===
    '次郎のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる次郎が皆から評価されています。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );

  //花子
  console.log('花子');
  console.assert(
    assessment('花子') ===
    '花子のいいところはまなざしです。花子に見つめられた人は、気になって仕方がないでしょう。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );

  // ＊練習問題＊ 同じ名前なら、同じ結果が出力されるテスト ↓先生のコード
  console.assert(assessment('太郎')) === assessment('太郎');
  console.assert(assessment('次郎')) === assessment('次郎');
  console.assert(assessment('花子')) === assessment('花子');

  console.log('診断結果の文章のテスト終了');
}

//関数の実行
test();
 */




