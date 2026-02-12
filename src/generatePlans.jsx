// ================================
// 過濾用 function

// 過濾商品是否啟用
function isAvailable(item) {
  if (item?.isActive === false) return false;
  if (item?.deletedAt != null) return false;
  return true;
}

// 過濾體型和年齡
function filterSizeAndAge(item, petInfo) {
  const sizeOK =
    Array.isArray(item?.petSize) && item.petSize.includes(petInfo.size);
  const stageOK =
    Array.isArray(item?.dietStage) &&
    item.dietStage.includes(petInfo.dietStage);
  return sizeOK && stageOK;
}

// 過濾過敏原
function filterAllergics(treat, allergyCodes) {
  const ingredients = Array.isArray(treat?.ingredients)
    ? treat.ingredients
    : [];
  const allergy = Array.isArray(allergyCodes)
    ? allergyCodes.filter((x) => x !== "NONE")
    : [];

  const hitAllergy = ingredients.some((ing) => allergy.includes(ing));
  return !hitAllergy;
}

// 過濾老齡犬
function filterTexture(treats, petInfo) {
  const list = Array.isArray(treats) ? treats : [];
  const isSenior = petInfo?.dietStage === "SENIOR";
  if (!isSenior) return list;
  return list.filter((t) => t?.texture === "SOFT");
}

// 過濾保健需求
function filterHealthCare(treats, petInfo) {
  const list = Array.isArray(treats) ? treats : [];
  const needs = Array.isArray(petInfo?.healthCare) ? petInfo.healthCare : [];

  if (needs.length === 0) return list;

  return list.filter((t) => {
    const careTags = Array.isArray(t?.healthCare) ? t.healthCare : [];
    return careTags.some((tag) => needs.includes(tag));
  });
}

// ================================
// 抽選用 function
// 內容物
function pickRandomContent(list, n) {
  const arr = Array.isArray(list) ? list.slice() : [];
  arr.sort(() => Math.random() - 0.5);
  return arr.slice(0, n);
}
//方案名稱
function pickPlanName(list) {
  if (!Array.isArray(list) || list.length === 0) return "推薦方案";
  return list[Math.floor(Math.random() * list.length)];
}

// 先抽符合 playStyle 的玩具
function pickPreferFirst(items, n, isPreferred) {
  const matchPool = (items ?? []).filter(isPreferred);
  const otherPool = (items ?? []).filter((x) => !isPreferred(x));

  const picked = pickRandomContent(matchPool, n);
  const remain = n - picked.length;

  if (remain > 0) picked.push(...pickRandomContent(otherPool, remain));
  return picked;
}

// 先抽符合 healthCare 的零食（不夠再用其他補）
function pickPreferTreatsByHealthCare(treatsPool, n, petInfo) {
  const needs = Array.isArray(petInfo?.healthCare) ? petInfo.healthCare : [];

  // 沒選保健需求 → 直接隨機抽
  if (needs.length === 0) return pickRandomContent(treatsPool, n);

  return pickPreferFirst(treatsPool, n, (t) => {
    const careTags = Array.isArray(t?.healthCare) ? t.healthCare : [];
    return careTags.some((tag) => needs.includes(tag));
  });
}

// ================================
// Step 1：表單資料整理成 petInfo

function buildPetInfo(formData) {
  return {
    petName: formData?.petName ?? "",
    size: formData?.size ?? null,
    dietStage: formData?.dietStage ?? null,
    allergy: Array.isArray(formData?.allergy) ? formData.allergy : [],
    playStyle: Array.isArray(formData?.playStyle) ? formData.playStyle : [],
    healthCare: Array.isArray(formData?.healthCare) ? formData.healthCare : [],
  };
}

// ================================
// Step 2：建立候選池 pools
function buildPools(db, petInfo) {
  const toysPool = (db?.toys ?? [])
    .filter(isAvailable)
    .filter((item) => filterSizeAndAge(item, petInfo));

  const householdPool = (db?.household ?? [])
    .filter(isAvailable)
    .filter((item) => filterSizeAndAge(item, petInfo));

  // ✅ treatsPool：先建立基礎池，再一步一步套用你寫好的過濾規則
  let treatsPool = (db?.treats ?? db?.treat ?? [])
    .filter(isAvailable)
    .filter((item) => filterSizeAndAge(item, petInfo));

  // ✅ 過濾老齡犬（filterTexture 回傳陣列）
  treatsPool = filterTexture(treatsPool, petInfo);

  // ✅ 過濾過敏原（filterAllergics 是判斷單一 treat）
  treatsPool = treatsPool.filter((treat) =>
    filterAllergics(treat, petInfo.allergy),
  );

  // ✅ 過濾保健需求（filterHealthCare 是處理整包 treatsPool）
  treatsPool = filterHealthCare(treatsPool, petInfo);

  return { toysPool, householdPool, treatsPool };
}

// ================================
// Step 3：依方案原型生成單一方案

function buildPlan(proto, pools, petInfo) {
  const { planPrice, months, content, namePool, subtitle } = proto;

  const treats = pickPreferTreatsByHealthCare(
    pools.treatsPool,
    content.treats,
    petInfo,
  );

  const toys = pickPreferFirst(
    pools.toysPool,
    content.toys,
    (toy) =>
      Array.isArray(toy?.playStyle) &&
      toy.playStyle.some((s) => petInfo.playStyle.includes(s)),
  );

  const household = pickRandomContent(pools.householdPool, content.household);

  return {
    planPrice,
    months,
    name: pickPlanName(namePool),
    subtitle,
    summaryText: `零食 x ${treats.length} + 互動玩具 x ${toys.length} + 用品 x ${household.length}`,
    items: { treats, toys, household },
    profileSnapshot: {
      petName: petInfo.petName,
      size: petInfo.size,
      dietStage: petInfo.dietStage,
      playStyle: petInfo.playStyle,
      healthCare: petInfo.healthCare,
    },
  };
}

// ================================
// 主 function：一次產生 3 個方案
// 這邊的 db 是指 db.json 的東西, 需要從
export function generatePlans(formData, db) {
  const petInfo = buildPetInfo(formData);
  const pools = buildPools(db, petInfo);

  // ✅ 這裡改成從 db.json 的 plans 來
  const planProtos = (db?.plans ?? []).filter((p) => p?.isActive !== false);

  return planProtos.map((proto) => buildPlan(proto, pools, petInfo));
}
