import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createDog,
  getCurrentUserId,
  getDogsByOwnerId,
} from "../../../api/planApi";
import axios from "axios";
import { generatePlans } from "../../../generatePlans";

import "./PetInfo.scss";

import ProgressBar1 from "../Subscribe/ProgressBar1";
import DietButton from "./DietButton";
import HealthCard from "./HealthCard";
import PlayCard from "../PetInfo/PlayCard";

import healthImg1 from "../../../assets/images/subscribe/image_btn_01.png";
import healthImg2 from "../../../assets/images/subscribe/image_btn_02.png";
import healthImg3 from "../../../assets/images/subscribe/image_btn_03.png";
import playImg1 from "../../../assets/images/subscribe/image_btn_04.png";
import playImg2 from "../../../assets/images/subscribe/image_btn_05.png";
import playImg3 from "../../../assets/images/subscribe/image_btn_06.png";
import dogIllustration from "../../../assets/images/subscribe/Illustration-dog.png";
import feedIllustration from "../../../assets/images/subscribe/Illustration-feed.png";

const YEAR_TO_DIET_STAGE = {
  "幼犬 ( 出生 ～ 1 歲左右 )": "PUPPY",
  "1 ～ 3 歲": "ADULT",
  "4 ～ 6 歲": "ADULT",
  "7 歲以上": "SENIOR",
};
const SIZE_TO_CODE = {
  "小型犬（ ex. 博美、貴賓、吉娃娃 ）": "S",
  "中型犬（ ex. 柴犬、柯基犬、台灣犬 ）": "M",
  "大型犬（ ex. 黃金獵犬、哈士奇、拉布拉多 ）": "L",
};
const DIET_TO_ALLERGY = {
  drumstick: "CHICKEN",
  beef: "BEEF",
  ham: "PORK",
  sheep: "LAMB",
  fish: "FISH",
  wheat: "WHEAT",
  milk: "DAIRY",
  egg: "EGG",
  x: "NONE",
};
const HEALTH_TO_CODE = {
  joint: "JOINT",
  digestion: "DIGEST",
  skin: "SKIN",
};
const PLAY_TO_CODE = {
  brainpower: "IQ",
  bite: "BITE",
  walk: "WALK",
};

function PetInfo() {
  const [petName, setPetName] = useState("");
  const [petGender, setPetGender] = useState("");
  const [selectedYear, setSelectedYear] = useState("選擇年齡");
  const [selectedSize, setSelectedSize] = useState("選擇體型");
  const [selectedDiets, setSelectedDiets] = useState([]);
  const [selectedHealth, setSelectedHealth] = useState(null);
  const [selectedPlay, setSelectedPlay] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedExistingDog, setConfirmedExistingDog] = useState(null);

  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();

  // 必填欄位驗證
  const [errors, setErrors] = useState({
    petYear: false,
    petSize: false,
    petName: false,
    petGender: false,
    petDiet: false,
  });

  // 逆向對照表
  const CODE_TO_SIZE = {
    S: "小型犬（ ex. 博美、貴賓、吉娃娃 ）",
    M: "中型犬（ ex. 柴犬、柯基犬、台灣犬 ）",
    L: "大型犬（ ex. 黃金獵犬、哈士奇、拉布拉多 ）",
  };
  const CODE_TO_ALLERGY = {
    CHICKEN: "drumstick",
    BEEF: "beef",
    PORK: "ham",
    LAMB: "sheep",
    FISH: "fish",
    WHEAT: "wheat",
    DAIRY: "milk",
    EGG: "egg",
  };
  const CODE_TO_HEALTH = { JOINT: "joint", DIGEST: "digestion", SKIN: "skin" };
  const CODE_TO_PLAY = { IQ: "brainpower", BITE: "bite", WALK: "walk" };
  const prefillFromDog = (dog) => {
    setPetGender(dog.gender === "M" ? "male" : "female");
    setSelectedSize(CODE_TO_SIZE[dog.size] ?? "選擇體型");
    setSelectedYear(dog.ageLabel ?? "選擇年齡");
    setSelectedDiets(
      dog.allergies.length === 0
        ? ["x"]
        : dog.allergies.map((a) => CODE_TO_ALLERGY[a]).filter(Boolean),
    );
    setSelectedHealth(CODE_TO_HEALTH[dog.healthCareNeeds?.[0]] ?? null);
    setSelectedPlay(CODE_TO_PLAY[dog.activityTypes?.[0]] ?? null);
  };

  // 寵物名稱驗證優化
  const handlePetNameBlur = async () => {
    if (!petName.trim()) return;

    const existingDogs = await getDogsByOwnerId(getCurrentUserId());
    const matched = existingDogs.find(
      (d) => d.name === petName.trim() && d.isActive,
    );

    if (matched) {
      const wantImport = window.confirm(
        `找到名為「${petName}」的毛孩資料，要帶入先前的設定嗎？`,
      );
      if (wantImport) {
        prefillFromDog(matched);
        setConfirmedExistingDog(matched);
      }
    }
  };

  // 食材選取欄位驗證
  const handleDietChange = (id) => {
    setSelectedDiets((prev) => {
      if (id === "x") {
        return prev.includes("x") ? [] : ["x"];
      }
      if (prev.includes("x")) return prev;
      if (prev.includes(id)) return prev.filter((item) => item !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
    clearError("petDiet");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      petYear: selectedYear === "選擇年齡",
      petSize: selectedSize === "選擇體型",
      petName: petName.trim() === "",
      petGender: petGender === "",
      petDiet: selectedDiets.length === 0,
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return;

    // 轉換成 API 代碼
    const sizeCode = SIZE_TO_CODE[selectedSize];
    const dietStageCode = YEAR_TO_DIET_STAGE[selectedYear];
    const genderCode = petGender === "male" ? "M" : "F";
    const allergyArray = selectedDiets.map((d) => DIET_TO_ALLERGY[d]);
    const healthCareArray = selectedHealth
      ? [HEALTH_TO_CODE[selectedHealth]]
      : [];
    const playStyleArray = selectedPlay ? [PLAY_TO_CODE[selectedPlay]] : [];

    // 給 Plan 頁面 generatePlans 用的 formData
    const formData = {
      petName: petName.trim(),
      gender: genderCode,
      size: sizeCode,
      dietStage: dietStageCode,
      allergy: allergyArray,
      healthCare: healthCareArray,
      playStyle: playStyleArray,
    };

    // POST 給後端 /dogs 的資料
    const dogPayload = {
      name: petName.trim(),
      ownerId: getCurrentUserId(),
      gender: genderCode,
      size: sizeCode,
      ageLabel: selectedYear,
      dietStage: dietStageCode,
      activityTypes: playStyleArray,
      allergies: allergyArray.filter((a) => a !== "NONE"),
      healthCareNeeds: healthCareArray,
      isActive: true,
    };
    let generatedPlans;
    try {
      setIsSubmitting(true);

      // 取得 db 資料
      const API_BASE = "http://localhost:3000";
      const [plans, toys, treats, household] = await Promise.all([
        axios.get(`${API_BASE}/plans`),
        axios.get(`${API_BASE}/toys`),
        axios.get(`${API_BASE}/treats`),
        axios.get(`${API_BASE}/household`),
      ]);
      const db = {
        plans: plans.data,
        toys: toys.data,
        treats: treats.data,
        household: household.data,
      };

      //產生推薦方案
      generatedPlans = generatePlans(formData, db);

      const dogId = confirmedExistingDog
        ? confirmedExistingDog.id
        : (await createDog(dogPayload)).id;
      navigate("/plan", {
        state: { formData, dogId, generatedPlans },
      });
    } catch (err) {
      console.error("建立毛孩失敗", err);
      alert("發生錯誤，請稍後再試");
    }
  };
  const clearError = (field) => {
    setErrors((prev) => ({ ...prev, [field]: false }));
  };

  return (
    <>
      <main className="pet-info py-11 pt-80-sm pb-0-sm">
        <div className="container">
          {/* 標題進度條 */}
          <ProgressBar1 />

          {/* 毛孩資料卡片 */}
          <div className="card-bg py-9 px-12-sm mb-6 mb-0-sm">
            <div className="row justify-content-center">
              {/* 標題 */}
              <div className="col-10">
                <h4 className="fw-bold text-primary-500 text-center-sm mb-40">
                  幫助我們先認識你的毛孩～
                </h4>
              </div>
              {/* 左邊欄位 */}
              <div className="col-4 col-12-sm pe-5 pe-12-sm">
                <div className="px-16-sm">
                  {/* 毛孩名稱 */}
                  <div className="pet-name mb-7 mb-24-sm">
                    <label
                      htmlFor="pet-name"
                      className="form-label d-flex align-items-center mb-4"
                    >
                      <p className="icon-dog fs-24 fs-20-sm fs-20-sm me-3"></p>
                      <p className="item-title fw-bold">
                        毛孩的名字是？
                        <span className="align-top align-text-bottom-sm">
                          *必填
                        </span>
                      </p>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.petName ? "border-danger" : ""}`}
                      id="pet-name"
                      name="pet-name"
                      placeholder="輸入毛孩的名字 / 暱稱"
                      value={petName}
                      onChange={(e) => {
                        setPetName(e.target.value);
                        clearError("petName");
                        setConfirmedExistingDog(null);
                      }}
                      onBlur={handlePetNameBlur}
                    />
                    {errors.petName && (
                      <p className="text-danger mt-2 small">
                        ⚠️請輸入毛孩的名字
                      </p>
                    )}
                  </div>

                  {/* 毛孩性別 */}
                  <div className="pet-gender mb-7 mb-24-sm">
                    <div className="d-flex align-items-center mb-4">
                      <p className="icon-dog fs-24 fs-20-sm me-3"></p>
                      <p className="item-title fw-bold">
                        毛孩是什麼性別？
                        <span className="align-top align-text-bottom-sm">
                          *必填
                        </span>
                      </p>
                    </div>
                    <div
                      className="btn-group w-100"
                      role="group"
                      aria-label="Basic radio toggle button group"
                    >
                      <input
                        type="radio"
                        className="btn-check"
                        id="male"
                        name="pet-gender"
                        autoComplete="off"
                        checked={petGender === "male"}
                        onChange={() => {
                          setPetGender("male");
                          clearError("petGender");
                        }}
                      />
                      <label className="btn btn-diet py-3 px-5" htmlFor="male">
                        男生
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        id="female"
                        name="pet-gender"
                        autoComplete="off"
                        checked={petGender === "female"}
                        onChange={() => {
                          setPetGender("female");
                          clearError("petGender");
                        }}
                      />
                      <label
                        className="btn btn-diet py-3 px-5"
                        htmlFor="female"
                      >
                        女生
                      </label>
                    </div>
                    {errors.petGender && (
                      <p className="text-danger mt-2 small">
                        ⚠️請選擇毛孩的性別
                      </p>
                    )}
                  </div>

                  {/* 毛孩歲數 */}
                  <div className="pet-year mb-7 mb-24-sm">
                    <div className="d-flex mb-2 align-items-center">
                      <p className="icon-dog fs-24 fs-20-sm me-3"></p>
                      <p className="item-title fw-bold text-middle">
                        毛孩幾歲了？
                        <span className="align-top align-text-bottom-sm">
                          *必填
                        </span>
                      </p>
                    </div>
                    <p className="item-text mb-4">
                      我們將會根據年紀，準備適合的零食與小物
                    </p>

                    <div className="dropdown">
                      <button
                        className={`form-select text-start border py-3 px-5
                          ${errors.petYear ? "border-danger" : ""}
                          ${
                            selectedYear === "選擇年齡"
                              ? ""
                              : "text-primary-500 fw-bold"
                          }`}
                        type="button"
                        id="pet-year"
                        name="pet-year"
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === "year" ? null : "year",
                          )
                        }
                      >
                        {selectedYear}
                      </button>
                      <ul
                        className={`dropdown-menu w-100 ${openDropdown === "year" ? "show" : ""}`}
                      >
                        <li
                          className="dropdown-item"
                          onClick={() => {
                            setSelectedYear("幼犬 ( 出生 ～ 1 歲左右 )");
                            setOpenDropdown(null);
                            clearError("petYear");
                          }}
                        >
                          幼犬 ( 出生 ～ 1 歲左右 )
                        </li>
                        <li
                          className="dropdown-item"
                          onClick={() => {
                            setSelectedYear("1 ～ 3 歲");
                            setOpenDropdown(null);
                            clearError("petYear");
                          }}
                        >
                          1 ～ 3 歲
                        </li>
                        <li
                          className="dropdown-item"
                          onClick={() => {
                            setSelectedYear("4 ～ 6 歲");
                            setOpenDropdown(null);
                            clearError("petYear");
                          }}
                        >
                          4 ～ 6 歲
                        </li>
                        <li
                          className="dropdown-item"
                          onClick={() => {
                            setSelectedYear("7 歲以上");
                            setOpenDropdown(null);
                            clearError("petYear");
                          }}
                        >
                          7 歲以上
                        </li>
                      </ul>
                      {errors.petYear && (
                        <p className="text-danger mt-2 small">
                          ⚠️請選擇毛孩年齡
                        </p>
                      )}
                    </div>
                  </div>

                  {/* 毛孩體型 */}
                  <div className="pet-size mb-7 mb-24-sm">
                    <div className="d-flex align-items-center mb-2">
                      <p className="icon-dog fs-24 fs-20-sm me-3"></p>
                      <p className="item-title fw-bold">
                        牠是什麼體型的狗狗？
                        <span className="align-top align-text-bottom-sm">
                          *必填
                        </span>
                      </p>
                    </div>
                    <p className="item-text mb-4">
                      我們將會參考體型，準備適合的用品
                    </p>

                    <div className="dropdown">
                      <button
                        className={`form-select text-start border py-3 px-5
                          ${errors.petSize ? "border-danger" : ""}
                          ${
                            selectedSize === "選擇體型"
                              ? ""
                              : "text-primary-500 fw-bold"
                          }`}
                        type="button"
                        id="pet-size"
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === "size" ? null : "size",
                          )
                        }
                      >
                        {selectedSize}
                      </button>
                      <ul
                        className={`dropdown-menu w-100 ${openDropdown === "size" ? "show" : ""}`}
                      >
                        <li
                          className="dropdown-item"
                          onClick={() => {
                            setSelectedSize(
                              "小型犬（ ex. 博美、貴賓、吉娃娃 ）",
                            );
                            setOpenDropdown(null);
                            clearError("petSize");
                          }}
                        >
                          小型犬（ ex. 博美、貴賓、吉娃娃 ）
                        </li>
                        <li
                          className="dropdown-item"
                          onClick={() => {
                            setSelectedSize(
                              "中型犬（ ex. 柴犬、柯基犬、台灣犬 ）",
                            );
                            setOpenDropdown(null);
                            clearError("petSize");
                          }}
                        >
                          中型犬（ ex. 柴犬、柯基犬、台灣犬 ）
                        </li>
                        <li
                          className="dropdown-item"
                          onClick={() => {
                            setSelectedSize(
                              "大型犬（ ex. 黃金獵犬、哈士奇、拉布拉多 ）",
                            );
                            setOpenDropdown(null);
                            clearError("petSize");
                          }}
                        >
                          大型犬（ ex. 黃金獵犬、哈士奇、拉布拉多 ）
                        </li>
                      </ul>
                      {errors.petSize && (
                        <p className="text-danger mt-2 small">
                          ⚠️請選擇毛孩體型
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 右邊欄位 */}
              <div className="col-6 col-12-sm">
                <div className="px-16-sm">
                  {/* 過敏食材 */}
                  <div className="pet-diet mb-7 mb-24-sm">
                    <div className="d-flex mb-2 align-items-center">
                      <p className="icon-dog fs-24 fs-20-sm me-3"></p>
                      <p className="item-title fw-bold text-middle">
                        毛孩有什麼過敏或忌口的食材？ ( 可複選最多 3 項 )
                        <span className="align-top align-text-bottom-sm">
                          *必填
                        </span>
                      </p>
                    </div>
                    <p className="item-text mb-4">
                      有沒有讓毛孩一吃就搔癢、過敏的食物呢？請讓我們幫你避開～
                    </p>

                    {/* 食材按鈕 */}
                    <div className="diet d-flex flex-wrap gap-3 gap-8-sm">
                      {/* 雞肉 */}
                      <DietButton
                        dietId="drumstick"
                        ingredients="雞肉"
                        icon="icon-drumstick"
                        checked={selectedDiets.includes("drumstick")}
                        onChange={() => handleDietChange("drumstick")}
                        disabled={
                          "drumstick" !== "x" &&
                          (selectedDiets.includes("x") ||
                            (selectedDiets.length >= 3 &&
                              !selectedDiets.includes("drumstick")))
                        }
                      ></DietButton>

                      {/* 牛肉 */}
                      <DietButton
                        dietId="beef"
                        ingredients="牛肉"
                        icon="icon-beef"
                        checked={selectedDiets.includes("beef")}
                        onChange={() => handleDietChange("beef")}
                        disabled={
                          "beef" !== "x" &&
                          (selectedDiets.includes("x") ||
                            (selectedDiets.length >= 3 &&
                              !selectedDiets.includes("beef")))
                        }
                      ></DietButton>

                      {/* 豬肉 */}
                      <DietButton
                        dietId="ham"
                        ingredients="豬肉"
                        icon="icon-ham"
                        checked={selectedDiets.includes("ham")}
                        onChange={() => handleDietChange("ham")}
                        disabled={
                          "ham" !== "x" &&
                          (selectedDiets.includes("x") ||
                            (selectedDiets.length >= 3 &&
                              !selectedDiets.includes("ham")))
                        }
                      ></DietButton>

                      {/* 羊肉 */}
                      <DietButton
                        dietId="sheep"
                        ingredients="羊肉"
                        svg={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M6 11V16C6 19.3137 8.68629 22 12 22V22C15.3137 22 18 19.3137 18 16V11"
                              stroke="#A3A3A3"
                              strokeWidth="2"
                            />
                            <path
                              d="M6 12L4 12C2.89543 12 2 12.8954 2 14V14C2 15.1046 2.89543 16 4 16L6 16"
                              stroke="#A3A3A3"
                              strokeWidth="2"
                            />
                            <path
                              d="M18 12L20 12C21.1046 12 22 12.8954 22 14V14C22 15.1046 21.1046 16 20 16L18 16"
                              stroke="#A3A3A3"
                              strokeWidth="2"
                            />
                            <path
                              d="M12 22V19"
                              stroke="#A3A3A3"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                            <path
                              d="M10 17L12 18.5L14 17"
                              stroke="#A3A3A3"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                            <path
                              d="M12 2L12 1L12 1L12 2ZM16.5293 5.21191L15.5856 5.54277L15.8416 6.27303L16.6128 6.20842L16.5293 5.21191ZM16.7998 5.2002L16.7998 4.2002L16.7997 4.2002L16.7998 5.2002ZM20 8.40039L21 8.40051V8.40039H20ZM16.7998 11.5996L16.7997 12.5996H16.7998V11.5996ZM14.6729 10.7861L15.3385 10.0399L14.7594 9.52325L14.1152 9.95608L14.6729 10.7861ZM12 11.5996L12 12.5996H12V11.5996ZM9.32617 10.7861L9.88399 9.95617L9.23988 9.52326L8.66064 10.0398L9.32617 10.7861ZM7.2002 11.5996L7.2002 12.5996L7.20026 12.5996L7.2002 11.5996ZM4 8.40039L3 8.40039L3 8.40051L4 8.40039ZM7.2002 5.2002L7.20026 4.2002H7.2002V5.2002ZM7.46973 5.21191L7.38654 6.20845L8.15751 6.27281L8.41343 5.54271L7.46973 5.21191ZM12 2V3C13.6558 3 15.0659 4.0603 15.5856 5.54277L16.5293 5.21191L17.473 4.88105C16.6813 2.62305 14.5326 1 12 1V2ZM16.5293 5.21191L16.6128 6.20842C16.6775 6.203 16.7397 6.2002 16.7999 6.2002L16.7998 5.2002L16.7997 4.2002C16.6777 4.2002 16.5595 4.20588 16.4458 4.21541L16.5293 5.21191ZM16.7998 5.2002V6.2002C18.0148 6.2002 19 7.18536 19 8.40039H20H21C21 6.08079 19.1194 4.2002 16.7998 4.2002V5.2002ZM20 8.40039L19 8.40027C18.9999 9.61493 18.015 10.5996 16.7998 10.5996V11.5996V12.5996C19.119 12.5996 20.9997 10.7201 21 8.40051L20 8.40039ZM16.7998 11.5996L16.7999 10.5996C16.2397 10.5996 15.7301 10.3892 15.3385 10.0399L14.6729 10.7861L14.0072 11.5324C14.7469 12.1923 15.7247 12.5995 16.7997 12.5996L16.7998 11.5996ZM14.6729 10.7861L14.1152 9.95608C13.5103 10.3624 12.7844 10.5996 12 10.5996V11.5996V12.5996C13.195 12.5996 14.3072 12.2365 15.2305 11.6162L14.6729 10.7861ZM12 11.5996L12 10.5996C11.215 10.5996 10.4886 10.3625 9.88399 9.95617L9.32617 10.7861L8.76835 11.6161C9.69216 12.237 10.805 12.5996 12 12.5996L12 11.5996ZM9.32617 10.7861L8.66064 10.0398C8.26875 10.3892 7.75959 10.5996 7.20014 10.5996L7.2002 11.5996L7.20026 12.5996C8.2755 12.5995 9.25248 12.1917 9.9917 11.5325L9.32617 10.7861ZM7.2002 11.5996V10.5996C5.98502 10.5996 5.00015 9.61493 5 8.40027L4 8.40039L3 8.40051C3.00028 10.7201 4.88101 12.5996 7.2002 12.5996V11.5996ZM4 8.40039H5C5 7.18536 5.98517 6.2002 7.2002 6.2002V5.2002V4.2002C4.8806 4.2002 3 6.08079 3 8.40039H4ZM7.2002 5.2002L7.20014 6.2002C7.25951 6.2002 7.32138 6.20301 7.38654 6.20845L7.46973 5.21191L7.55291 4.21538C7.44031 4.20598 7.32248 4.2002 7.20026 4.2002L7.2002 5.2002ZM7.46973 5.21191L8.41343 5.54271C8.93302 4.06041 10.3438 3 12 3L12 2L12 1C9.46756 1 7.3177 2.62261 6.52602 4.88112L7.46973 5.21191Z"
                              fill="#A3A3A3"
                            />
                          </svg>
                        }
                        checked={selectedDiets.includes("sheep")}
                        onChange={() => handleDietChange("sheep")}
                        disabled={
                          "sheep" !== "x" &&
                          (selectedDiets.includes("x") ||
                            (selectedDiets.length >= 3 &&
                              !selectedDiets.includes("sheep")))
                        }
                      ></DietButton>

                      {/* 魚 */}
                      <DietButton
                        dietId="fish"
                        ingredients="魚"
                        icon="icon-fish"
                        checked={selectedDiets.includes("fish")}
                        onChange={() => handleDietChange("fish")}
                        disabled={
                          "fish" !== "x" &&
                          (selectedDiets.includes("x") ||
                            (selectedDiets.length >= 3 &&
                              !selectedDiets.includes("fish")))
                        }
                      ></DietButton>

                      {/* 穀類 ( 小麥/玉米 ) */}
                      <DietButton
                        dietId="wheat"
                        ingredients="穀類 ( 小麥/玉米 )"
                        icon="icon-wheat"
                        checked={selectedDiets.includes("wheat")}
                        onChange={() => handleDietChange("wheat")}
                        disabled={
                          "wheat" !== "x" &&
                          (selectedDiets.includes("x") ||
                            (selectedDiets.length >= 3 &&
                              !selectedDiets.includes("wheat")))
                        }
                      ></DietButton>

                      {/* 乳製品 */}
                      <DietButton
                        dietId="milk"
                        ingredients="乳製品"
                        icon="icon-milk"
                        checked={selectedDiets.includes("milk")}
                        onChange={() => handleDietChange("milk")}
                        disabled={
                          "milk" !== "x" &&
                          (selectedDiets.includes("x") ||
                            (selectedDiets.length >= 3 &&
                              !selectedDiets.includes("milk")))
                        }
                      ></DietButton>

                      {/* 蛋 */}
                      <DietButton
                        dietId="egg"
                        ingredients="蛋"
                        icon="icon-egg"
                        checked={selectedDiets.includes("egg")}
                        onChange={() => handleDietChange("egg")}
                        disabled={
                          "egg" !== "x" &&
                          (selectedDiets.includes("x") ||
                            (selectedDiets.length >= 3 &&
                              !selectedDiets.includes("egg")))
                        }
                      ></DietButton>

                      {/* 無 */}
                      <DietButton
                        dietId="x"
                        ingredients="無"
                        icon="icon-x"
                        checked={selectedDiets.includes("x")}
                        onChange={() => handleDietChange("x")}
                        disabled={selectedDiets.some((item) => item !== "x")}
                      ></DietButton>
                      {errors.petDiet && (
                        <p className="text-danger mt-2 small">
                          ⚠️請至少選擇一項食材
                        </p>
                      )}
                    </div>
                  </div>

                  {/* 保健需求 */}
                  <div className="pet-health mb-7 mb-24-sm">
                    <div className="d-flex mb-2 align-items-center">
                      <p className="icon-dog fs-24 fs-20-sm me-3"></p>
                      <p className="item-title fw-bold text-middle">
                        想替毛孩加強什麼保健需求？
                      </p>
                    </div>
                    <p className="item-text mb-4">
                      最近毛孩有沒有哪個部分想特別照顧的呢？我們會貼心幫你挑選對應的營養品
                    </p>

                    <div className="d-grid d-block-sm gap-5 card-grid">
                      {/* 關節保健 */}
                      <HealthCard
                        healthId="joint"
                        healthImg={healthImg1}
                        healthCare="關節保健"
                        checked={selectedHealth === "joint"}
                        onChange={() => setSelectedHealth("joint")}
                      />

                      {/* 消化幫助 */}
                      <HealthCard
                        healthId="digestion"
                        healthImg={healthImg2}
                        healthCare="消化幫助"
                        checked={selectedHealth === "digestion"}
                        onChange={() => setSelectedHealth("digestion")}
                      />

                      {/* 美毛/皮膚問題 */}
                      <HealthCard
                        healthId="skin"
                        healthImg={healthImg3}
                        healthCare="美毛/皮膚問題"
                        checked={selectedHealth === "skin"}
                        onChange={() => setSelectedHealth("skin")}
                      />
                    </div>
                  </div>

                  {/* 互動方式 */}
                  <div className="pet-play mb-7 mb-48-sm">
                    <div className="d-flex mb-2 align-items-center">
                      <p className="icon-dog fs-24 fs-20-sm me-3"></p>
                      <p className="item-title fw-bold text-middle">
                        毛孩平常最喜歡哪種互動方式？
                      </p>
                    </div>
                    <p className="item-text mb-4">
                      你平常都怎麼與毛孩互動的呢？讓我們更了解牠的個性與喜好！
                    </p>

                    <div className="d-grid d-block-sm gap-5 card-grid">
                      <PlayCard
                        playId="brainpower"
                        playImg={playImg1}
                        interaction="喜歡腦力激盪"
                        checked={selectedPlay === "brainpower"}
                        onChange={() => setSelectedPlay("brainpower")}
                      />

                      <PlayCard
                        playId="bite"
                        playImg={playImg2}
                        interaction="愛玩愛咬"
                        checked={selectedPlay === "bite"}
                        onChange={() => setSelectedPlay("bite")}
                      />

                      <PlayCard
                        playId="walk"
                        playImg={playImg3}
                        interaction="愛出門走走"
                        checked={selectedPlay === "walk"}
                        onChange={() => setSelectedPlay("walk")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 定位圖 */}
            <img
              src={dogIllustration}
              alt="狗狗插畫"
              className="dog-illustration d-none-sm"
            />
            <img
              src={feedIllustration}
              alt="飼料插畫"
              className="feed-illustration d-none-sm"
            />

            {/* 儲存按鈕電腦版 */}
            <div className="text-center d-none-min-sm">
              <button
                className="btn btn-primary rounded-pill btn-subscribe fs-18-sm px-100 w-100-sm"
                to="/plan"
                role="button"
                type="submit"
                onClick={handleSubmit}
              >
                儲存並繼續
              </button>
            </div>
          </div>

          {/* 儲存按鈕手機版 */}
          <div className="text-center d-none-sm">
            <button
              className="btn btn-primary rounded-pill btn-subscribe fs-18-sm px-100 w-100-sm"
              to="/plan"
              role="button"
              type="submit"
              onClick={handleSubmit}
            >
              儲存並繼續
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default PetInfo;
