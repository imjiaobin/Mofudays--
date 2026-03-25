import React, { useState } from "react";
import FaqHeader from "./components/FaqHeader";
import FaqContent from "./components/FaqContent";
import DecorationPaw from "./components/DecorationPaw";
import "./Faq.scss";

const FAQ_DATA = {
  subscribe: [
    {
      id: 1,
      theme: "theme-tertiary",
      category: "關於訂閱",
      question: (
        <>
          💬
          <br />
          「毛日和」訂閱盒是什麼？
          <br />
          每月會收到什麼？
        </>
      ),
      answer: (
        <>
          毛日和是專為毛孩設計的訂閱驚喜盒
          <br />
          每月精選零食、保健品、玩具
          <br />
          或生活用品，寄到你家門口
          <br />
          內容會根據毛孩年齡與需求調整
          <br />
          讓毛孩每個月都像過節一樣開心💝
        </>
      ),
    },
    {
      id: 2,
      theme: "theme-primary",
      category: "訂閱方案",
      question: (
        <>
          📦
          <br />
          訂閱方案有哪些？
          <br />
          可以選擇幾個月？
        </>
      ),
      answer: (
        <>
          目前提供 1/3/6/12個月 的訂閱服務
          <br />
          訂越久越划算！
          <br />
          新手也可以從一盒試試看，沒有壓力～
          <br />
          每個方案都能享有專屬驚喜內容喔！
        </>
      ),
    },
    {
      id: 3,
      theme: "theme-tertiary",
      category: "訂閱問題",
      question: (
        <>
          📦
          <br />
          訂閱後會自動續約嗎？
        </>
      ),
      answer: (
        <>
          根據您選擇的期數會有自動扣款機制
          <br />
          如果您想更換方案
          <br />
          也可以在帳號裡隨時刪除訂單！
          <br />
          我們不綁約，只想讓照顧毛孩更輕鬆！
        </>
      ),
    },
    {
      id: 4,
      theme: "theme-primary",
      category: "訂閱盒內容",
      question: (
        <>
          🎯
          <br />
          盒子內容可以自己選嗎？
          <br />
          還是隨機搭配？
        </>
      ),
      answer: (
        <>
          內容是由我們精選搭配的驚喜組合
          <br />
          您只要提供毛孩基本資料與飲食偏好
          <br />
          我們會照顧好牠的喜好❤️
          <br />
          雖然不是完全自選，但每盒都很用心
          <br />
          保證開箱時有驚喜也有安心！
        </>
      ),
    },
    {
      id: 5,
      theme: "theme-tertiary",
      category: "內容物搭配",
      question: (
        <>
          🐕
          <br />
          我家是老犬／幼犬
          <br />
          會搭配適合牠的內容嗎？
        </>
      ),
      answer: (
        <>
          會的！我們會根據你填寫的
          <br />
          毛孩年齡與狀況來調整內容
          <br />
          讓每隻毛孩都吃得安心、玩得開心🐾
        </>
      ),
    },
    {
      id: 6,
      theme: "theme-primary",
      category: "食材問題",
      question: (
        <>
          🐾
          <br />
          我家毛孩不吃某些食材
          <br />
          該怎麼辦？
        </>
      ),
      answer: (
        <>
          訂閱時會有「飲食偏好」的填寫欄位
          <br />
          我們會盡力避開過敏源或不適合的食材
          <br />
          如果沒有您需要的選項
          <br />
          亦可在客服聯繫我們
          <br />
          讓毛孩每一口都能放心享受✨
        </>
      ),
    },
  ],
  delivery: [
    {
      id: 7,
      theme: "theme-tertiary",
      category: "出貨時間",
      question: (
        <>
          🚚
          <br />
          每月什麼時候會出貨？
          <br />
          多久可以收到？
        </>
      ),
      answer: (
        <>
          我們會在每月固定時間統一出貨，
          <br />
          寄出後約 2～4 個工作天送達
          <br />
          （依地區略有不同）。
          <br />
          出貨時間會提前公告，
          <br />
          也會寄 Email 通知您唷！
        </>
      ),
    },
    {
      id: 8,
      theme: "theme-primary",
      category: "沒收到貨",
      question: (
        <>
          📦
          <br />
          收到通知了但貨還沒到，
          <br />
          怎麼辦？
        </>
      ),
      answer: (
        <>
          別擔心～可以先查看物流追蹤連結，
          <br />
          如果超過 5 天尚未收到，
          <br />
          有可能是物流延誤或地址資訊有誤，
          <br />
          歡迎聯絡我們協助查詢 ^ ^
        </>
      ),
    },
    {
      id: 9,
      theme: "theme-tertiary",
      category: "指定配送",
      question: (
        <>
          ⏰<br />
          可以指定配送
          <br />
          日期或時間嗎？
        </>
      ),
      answer: (
        <>
          目前無法指定確切時間，
          <br />
          出貨後由宅配安排配送。
          <br />
          建議您選擇工作日有人收件的地址，
          <br />
          我們會持續努力優化配送體驗！
        </>
      ),
    },
    {
      id: 10,
      theme: "theme-primary",
      category: "配送地點",
      question: (
        <>
          🏡
          <br />
          可以寄到超商、
          <br />
          學校或公司地址嗎？
        </>
      ),
      answer: (
        <>
          可以唷！只要地址清楚、有人可簽收即可。
          <br />
          公司或學校也沒問題，
          <br />
          記得加上單位名稱和分機。
          <br />
          目前暫不支援超商店到店，敬請見諒。
        </>
      ),
    },
    {
      id: 11,
      theme: "theme-tertiary",
      category: "離島配送",
      question: (
        <>
          🗺️
          <br />
          有配送到
          <br />
          離島或海外嗎？
        </>
      ),
      answer: (
        <>
          目前僅支援台灣本島地區配送，
          <br />
          離島與海外的毛毛們請再等等我們～
          <br />
          我們會努力拓展配送範圍！
          <br />
          若有特殊需求也歡迎私訊客服討論！
        </>
      ),
    },
    {
      id: 12,
      theme: "theme-primary",
      category: "盒子有問題",
      question: (
        <>
          🎀
          <br />
          收到的內容物有誤或
          <br />
          盒子有損壞怎麼辦？
        </>
      ),
      answer: (
        <>
          如果內容物有誤或包裝有損壞，
          <br />
          請第一時間拍照聯繫我們。
          <br />
          我們會盡快協助補寄或處理退換，
          <br />
          讓毛孩不漏掉任何驚喜！
          <br />
          我們希望每一盒都能完整抵達、
          <br />
          讓您與毛孩安心開箱 💝
        </>
      ),
    },
  ],
  payment: [
    {
      id: 13,
      theme: "theme-tertiary",
      category: "訂閱流程",
      question: (
        <>
          🐾
          <br />
          訂閱流程是
          <br />
          怎麼進行的？
        </>
      ),
      answer: (
        <>
          只要填寫毛孩資料，
          <br />
          系統就會幫您自動配對合適的訂閱方案。
          <br />
          您可以確認期數與訂閱盒說明後直接結帳，
          <br />
          簡單幾步驟一次完成，訂閱無負擔！
        </>
      ),
    },
    {
      id: 14,
      theme: "theme-primary",
      category: "訂閱方案",
      question: (
        <>
          💡
          <br />
          可以自己選想訂
          <br />
          哪種盒子嗎？
        </>
      ),
      answer: (
        <>
          系統會根據您填的資訊推薦
          <br />
          最適合毛孩的盒子，
          <br />
          如果想換主題，
          <br />
          只要回到首頁再重新選一次即可！
          <br />
          讓每位毛孩都能收到專屬驚喜🥳
        </>
      ),
    },
    {
      id: 15,
      theme: "theme-tertiary",
      category: "續約問題",
      question: (
        <>
          📅
          <br />
          可以修改訂單的
          <br />
          期數或內容嗎？
        </>
      ),
      answer: (
        <>
          訂單成立後無法直接修改期數或內容，
          <br />
          如想更換訂閱方案或期數，
          <br />
          只要聯繫客服取消訂單後重新下單就可以！
          <br />
          流程簡單好管理，讓您輕鬆照顧毛孩💛
        </>
      ),
    },
    {
      id: 16,
      theme: "theme-primary",
      category: "訂閱盒內容",
      question: (
        <>
          📦
          <br />
          我想訂不同期數的盒子，
          <br />
          可以一次處理嗎？
        </>
      ),
      answer: (
        <>
          目前一筆訂單只能選擇一種期數，
          <br />
          如果您想訂兩種不同期數，
          <br />
          請分兩次下單唷！
          <br />
          這樣每份訂單都能被好好記錄、不會出錯，
          <br />
          分開下單也方便您後續查詢與管理📋
        </>
      ),
    },
    {
      id: 17,
      theme: "theme-tertiary",
      category: "下錯訂單",
      question: (
        <>
          🐕
          <br />
          下錯訂單怎麼辦？
          <br />
          可以取消嗎？
        </>
      ),
      answer: (
        <>
          可以的！訂單尚未出貨前都可以取消，
          <br />
          只要聯繫客服取消即可。
          <br />
          取消後若想重新選擇，
          <br />
          也可以馬上再下新訂單😊
        </>
      ),
    },
    {
      id: 18,
      theme: "theme-primary",
      category: "食材問題",
      question: (
        <>
          ❌<br />
          訂閱扣款後後悔了，
          <br />
          可以退款嗎？
        </>
      ),
      answer: (
        <>
          若商品尚未出貨，可以申請退款；
          <br />
          如已開始準備或出貨，將無法取消與退款。
          <br />
          也希望您下訂前再確認一次唷～
        </>
      ),
    },
  ],
  safety: [
    {
      id: 19,
      theme: "theme-tertiary",
      category: "商品安全",
      question: (
        <>
          🧼
          <br />
          商品都是安全的嗎？
          <br />
          有經過檢驗嗎？
        </>
      ),
      answer: (
        <>
          我們挑選的每樣產品都經過
          <br />
          嚴格把關與挑選，
          <br />
          包含食品皆來自合格廠商，
          <br />
          並標示清楚來源與成分。
          <br />
          讓每一次開箱都安心又暖心🥰
        </>
      ),
    },
    {
      id: 20,
      theme: "theme-primary",
      category: "不喜歡內容",
      question: (
        <>
          🥩
          <br />
          我家毛孩會挑食，
          <br />
          內容不喜歡怎麼辦？
        </>
      ),
      answer: (
        <>
          我們理解每隻毛孩都有自己的小脾氣～
          <br />
          因此您可以在訂閱時填寫偏好，
          <br />
          我們會儘量配對！
          <br />
          如果還是不喜歡，也歡迎您提供回饋，
          <br />
          幫助我們越選越好✨
        </>
      ),
    },
    {
      id: 21,
      theme: "theme-tertiary",
      category: "保存期限",
      question: (
        <>
          🧊
          <br />
          食品有保存期限嗎？
          <br />
          怎麼保存比較好？
        </>
      ),
      answer: (
        <>
          有的唷！
          <br />
          所有食品皆有清楚的保存期限標示。
          <br />
          收到後建議盡快食用，或放置陰涼處保存，
          <br />
          零食類可冷藏、用品類請常溫保存。
          <br />
          我們也會附上保存提醒小卡💡
        </>
      ),
    },
    {
      id: 22,
      theme: "theme-primary",
      category: "不合預期",
      question: (
        <>
          💬
          <br />
          收到不適合毛孩的東西，
          <br />
          可以退換嗎？
        </>
      ),
      answer: (
        <>
          若商品明顯損壞或寄錯，
          <br />
          我們提供更換服務。
          <br />
          但基於驚喜盒性質，
          <br />
          一般情況下不提供退換。
          <br />
          建議訂閱前填寫清楚偏好與注意事項唷！
          <br />
          我們盡力照顧好每隻毛孩的需求❤️
        </>
      ),
    },
    {
      id: 23,
      theme: "theme-tertiary",
      category: "零食太多",
      question: (
        <>
          🐕
          <br />
          一次收到太多零食
          <br />
          吃不完怎麼辦？
        </>
      ),
      answer: (
        <>
          我們每盒的份量都經過設計，
          <br />
          不會太多太負擔。
          <br />
          若真的吃不完，
          <br />
          建議冷藏保存或與毛友分享～
        </>
      ),
    },
    {
      id: 24,
      theme: "theme-primary",
      category: "訂閱盒內容",
      question: (
        <>
          🎲
          <br />
          每次的內容物會
          <br />
          有哪些類型的商品？
        </>
      ),
      answer: (
        <>
          每盒都包含零食、保健罐頭、
          <br />
          生活小物或玩具等類型。
          <br />
          我們依訂閱方案&主題做搭配，
          <br />
          讓毛孩每月都有不同體驗！
          <br />
          實用又有趣 🐶🎁
        </>
      ),
    },
  ],
};

const Faq = () => {
  const [activeTab, setActiveTab] = useState("subscribe");

  return (
    <div className="faq-page-wrapper">
      <div className="container">
        <FaqHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        <FaqContent currentData={FAQ_DATA[activeTab]} />
      </div>
      <DecorationPaw />
    </div>
  );
};

export default Faq;
