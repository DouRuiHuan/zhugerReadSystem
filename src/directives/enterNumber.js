import Vue from 'vue'
const enterNumber = Vue.directive('enterNumber', {
  inserted: function(el) {
    // console.log(el)
    el.addEventListener('keypress', function(e) {
      e = e || window.event
      const charcode = typeof e.charCode === 'number' ? e.charCode : e.keyCode
      const re = /\d/
      if (!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey) {
        if (e.preventDefault) {
          e.preventDefault()
        } else {
          e.returnValue = false
        }
      }
    })
  }
})
export default enterNumber
