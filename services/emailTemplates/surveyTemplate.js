//在排版模板里，导出survey的body部分（用html的格式）

module.exports = survey => {//用户点击后跳转到哪？——感谢页面。为什么写法是${xxx}? 使用结合相对url的写法来跳转路由：${keys.redirectDomain}/api/surveys/thanks
    return `
      <html>
        <body>
          <div style="text-align: center;">
            <h3>I'd like your input!</h3>
            <p>Please answer the following question:</p>
            <p>${survey.body}</p>
            <div>
              <a href="${keys.redirectDomain}/api/surveys/thanks">Yes</a> 
            </div>
            <div>
              <a href="${keys.redirectDomain}/api/surveys/thanks">No</a>
            </div>
          </div>
        </body>
      </html>
    `;
  };
  