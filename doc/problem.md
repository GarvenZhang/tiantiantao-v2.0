1.util/router.js  

L175  为什么字符串中要转义？ 

参数多怎么办？

replace()正则的使用

是否要每个接口都要验证用户？

react一定要每个组件都配置好，不要偷懒，比如说return里面没有东西，则会报错！！！ tiantiantao-01

webpack-dev-server自动更新，，搞了好久，是因为。。。p写成了P  tiantiantao-02/03

// GoodsDisplay/index.css 
.goodsdisplay-hd > .hd-tt {
  position: relative;  加了reletive会与::before的层级有关联变化
  display: inline-block;
  padding: 0 10px;
  background-color: #fff;
}

// GoodList/index.css 为什么p标签加了absolute之后变成了inline-block？
.goodslist-wrap .item-info {
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
}

有两个项目：frontpage 和 cms，做法是，开发环境中只能在webpack.config.js中配置一项，然后进行开发

<Route exact path='/' component={Goods}/>           一定要是 ／ 
      <Route path='/cms/category' component={Category}/>
      <Route path='/cms/orderform' component={Orderform}/>
      <Route path='/cms/vip' component={Vip}/>
      <Route path='/cms/info' component={Info}/>
      
若我要居中且最后一排从左到右排序如何做到？ tiantiantao-05

git 若还没有clone ， 想直接推送到git仓库，无法成功  tiantiantao-06

配置多入口  不会，，，，


 constructor (props) {
    super(props)
    this.state = {
      data: this.props.data
    }
  }
  为什么 this.state不会被触发？？？ cms/GoodsList.jsx      
  采取的是：不用constructor,直接 this.props  看老师的？？
  
  <div className="paginationwrapper" dangerouslySetInnerHTML={{__html: this.calcDOM()}}>
        </div>   dangerouslySetInnerHTML????
      
不会写react插件，用了rc-upload

file-loader ...  搞了很久都没明白，一直报错parse failed 。。  多数是loader问题，一定要去研究

数据一定要放在2个不同组件的父组件处

delete之前会有OPTIONS预请求

无法修改input的默认value，改用了placeholder


数据库的设计。。。      

     数据库设计  -   nodejs接口
需求                       跨页
     原型     - container 
                           改变state 
                           
   每一个component - 根据不同的conatiner做出不同的渲染
   
   先写详细的component再写container
   
   
错误返回结果的处理。。。。。   

返回的baseTips应该和数据库的error建立映射关系


删除成功，是返回success还是204?