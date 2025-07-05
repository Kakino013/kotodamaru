//感情を判定するための辞書
const emotionDictionary = {
  喜: ["うれしい", "ありがとう", "楽しかった", "好き", "良かった", "幸せ", "助かった", "感謝"],
  怒: ["ムカつく", "嫌い", "やめて", "怒った", "腹立つ", "ふざける", "くそ", "キレた"],
  哀: ["さみしい", "つらい", "泣いた", "しんどい", "悲しい", "苦しい", "孤独", "失った"],
  楽: ["楽しい", "わくわく", "笑った", "おもしろい", "遊んだ", "にこにこ", "うきうき"]
};

//感情を分析する辞書
function detectEmotion(word) {
  for (const emotion in emotionDictionary) {
    for (const keyword of emotionDictionary[emotion]) {
      if (word.includes(keyword)) {
        return emotion;
      }
    }
  }
  return "楽"; // デフォルトは楽
}

//美しさを判定する関数
function getBeautyScore(word) {
  if (word.length >= 10) return 3;
  if (word.length >= 5) return 2;
  return 1;
}

//ことだまるを変化させる関数
function getColorForEmotion(emotion) {
  switch (emotion) {
    case "喜": return "#ffcc99"; // オレンジ
    case "怒": return "#ff6666"; // 赤
    case "哀": return "#66ccff"; // 青
    case "楽": return "#ccff66"; // 黄緑
    default: return "white";
  }
}

function updateKotodamaruAppearance(emotion, beauty) {
  const kotodamaru = document.getElementById("kotodamaru");
  kotodamaru.style.backgroundColor = getColorForEmotion(emotion);

  // 美しさによるサイズと影の変化
  if (beauty === 1) {
    kotodamaru.style.width = "100px";
    kotodamaru.style.height = "100px";
    kotodamaru.style.boxShadow = "0 0 10px rgba(0,0,0,0.05)";
  } else if (beauty === 2) {
    kotodamaru.style.width = "150px";
    kotodamaru.style.height = "150px";
    kotodamaru.style.boxShadow = "0 0 20px rgba(0,0,0,0.1)";
  } else {
    kotodamaru.style.width = "200px";
    kotodamaru.style.height = "200px";
    kotodamaru.style.boxShadow = "0 0 30px rgba(0,0,0,0.2)";
  }
}


console.log("ことだまるへようこそ！");

// 履歴を管理する変数
let wordHistory = [];

//履歴を描画する関数
function renderHistory() {
  const list = document.getElementById("historyList");
  list.innerHTML = ""; // 一度リストを空にする

  wordHistory.forEach(word => {
    const li = document.createElement("li");
    li.textContent = word;
    list.appendChild(li);
  });
}

// ページ読み込み時に履歴を読み込む
if (localStorage.getItem("kotodamaruWords")) {
  wordHistory = JSON.parse(localStorage.getItem("kotodamaruWords"));
  console.log("ことだまるの記憶:", wordHistory);
  renderHistory();
}

// 送信ボタンを押したときの処理
document.getElementById("sendButton").addEventListener("click", () => {
  const word = document.getElementById("wordInput").value.trim();
  if (word) {
    console.log("プレイヤーが送った言葉:", word);
    wordHistory.push(word);
    localStorage.setItem("kotodamaruWords", JSON.stringify(wordHistory));
    renderHistory();

    const emotion = detectEmotion(word);
    const beauty = getBeautyScore(word);

    document.getElementById("emotionResult").textContent = "感情: " + emotion;
    document.getElementById("beautyResult").textContent = "美しさスコア: " + beauty;

    updateKotodamaruAppearance(emotion, beauty);

    document.getElementById("wordInput").value = ""; // 入力欄をクリア
  }
});
document.getElementById("wordInput").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    document.getElementById("sendButton").click();
  }
});


