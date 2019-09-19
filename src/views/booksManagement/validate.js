// 关卡掉落
export function isValidateDrop(arr) {
  var flag = true;
  if (
    !arr[0].companion_id &&
    !arr[0].chip_num &&
    !arr[1].companion_id &&
    !arr[1].chip_num
  ) {
    flag = false;
  }
  arr.forEach((item, index) => {
    if (
      (item.companion_id && !item.chip_num) ||
      (!item.companion_id && item.chip_num)
    ) {
      flag = false;
    }
  });
  return flag;
}
export function isCommon(arr) {
  var common = true;
  if (arr.length >= 2) {
    if (arr[0].companion_id === arr[1].companion_id) {
      common = false;
    }
  }
  return common;
}
// 知识点
export function isValidateKnowledge(arr) {
  try {
    arr.forEach(item => {
      if (!item.knowledge_content || !item.knowledge_title) {
        throw "Jump out now!";
      }
    });
  } catch (e) {
    return false;
  }
  return true;
}
