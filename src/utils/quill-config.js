
// toolbar工具栏的工具选项（默认展示全部）
const toolOptions = [
  ['underline'],
  ['image'],
  ['sourceEditor'] // 新添加的工具
  // ['bold', 'italic', 'underline', 'strike'],
  // ['blockquote', 'code-block'],
  // [{ 'header': 1 }, { 'header': 2 }],
  // [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  // [{ 'script': 'sub' }, { 'script': 'super' }],
  // [{ 'indent': '-1' }, { 'indent': '+1' }],
  // [{ 'direction': 'rtl' }],
  // [{ 'size': ['small', false, 'large', 'huge'] }],
  // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  // [{ 'color': [] }, { 'background': [] }],
  // [{ 'font': [] }],
  // [{ 'align': [] }],
  // [{ 'clean': '源码编辑' }],
  // ['link', 'image', 'video'], 
]
const handlers = {
  shadeBox: null,
  sourceEditor: function() { // 添加工具方法
    // alert('新添加的工具方法')
  }
}

export default {
  placeholder: '输入关卡内容',
  theme: 'snow', // 主题
  modules: {
    // imageDrop: true,
    imageResize: {   //添加
      displayStyles: {   //添加
        backgroundColor: 'black',
        border: 'none',
        color: 'white'
      },
      modules: ['Resize', 'DisplaySize', 'Toolbar']   //添加
    },
    toolbar: {
      container: toolOptions, // 工具栏选项
      handlers: handlers // 事件重写
    }
  },
  initButton: function() { // 在使用的页面中初始化按钮样式
    const sourceEditorButton = document.querySelector('.ql-sourceEditor')
    sourceEditorButton.style.cssText = 'width:50px; border:1px solid #ccc; border-radius:5px;'
    sourceEditorButton.innerText = '查看id'
  }
}
