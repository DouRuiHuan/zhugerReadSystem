/**
 * Created by jiachenpan on 16/11/18.
 */

export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
// 手机号
export function isValidateTel(str) {
  const reg = /^[1][3,4,5,7,8][0-9]{9}$/
  return reg.test(str)
}
// 金额
export function checkMoney(str) {
  const reg = /^\d+\.?\d{0,2}$/
  return reg.test(str)
}
// addNewInput
export function isAddNewInput(arr) {
  try {
    arr.forEach((item) => {
      if (!item) {
        throw 'Jump out now!'
      }
    })
  } catch (e) {
    return false
  }
  return true
}
export function isValidateStory(arr) {
  try {
    arr.forEach((item) => {
      if (!item.story_name || !item.prop_name || !item.prop_pic_url) {
        throw 'Jump out now!'
      }
    })
  } catch (e) {
    return false
  }
  return true
}

export function isValidateAttr(str) {
  var flag = false
  str.forEach(function(item, index, arr) {
    if (item.name && item.value > 0) {
      flag = true
    }
  })
  return flag
}
