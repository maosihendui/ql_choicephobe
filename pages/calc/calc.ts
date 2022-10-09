// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
   id0:0,
   id1:1, 
   id2:2, 
   id3:3, 
   id4:4,  
   id5:5, 
   id6:6, 
   id7:7, 
   id8:8, 
   id9:9, 
   ida:"+",
   idb:"-",
   idc:"×",
   idd:"÷",
   ide:"=",
   idf:"!",
   idg:".",
   delete:'delete',
   C:'C',
   sign:'sign',
   screenData:0,
   isfuhao:false,
   arr:[],
   his:[]
  },
  his:function(){
    wx.navigateTo({
      url:'../history/history'
    })
  },
  clickCalc:function(e){
    //判断是否退格键
    var code=e.currentTarget.id;
    if(code==this.data.delete){
      //对数据进行截取
      data= this.data.screenData;
      //判断最后一个字符是什么
      var lastword=data[data.length-1];
      if(lastword==this.data.ida||lastword==this.data.idb||lastword==this.data.idc||lastword==this.data.idd||lastword==this.data.idf||lastword==this.data.C||lastword==this.data.sign){
        this.setData({isfuhao:false});
      }
      //截取最后一个
      str=data.substring(0,data.length-1);
      this.setData({screenData:str});
      this.data.arr.pop();
    }
    //判断清屏键
    else if(code==this.data.C){
      //数据清零
      this.setData({screenData:0});
      //是符号
      this.setData({isfuhao:false});
      this.data.arr=[];
    }
    //判断正负号
    else if(code==this.data.sign){
      //对数据进行截取
      data=this.data.screenData;
      //获取第一个字母
      var firstword=data[0];
      //判断如果是字符返回true 否则false
      if(firstword=='-'){
        var str=data.substring(1,data.length);
        this.data.arr.shift();
      }
      else{
        var str='-'+data;
        this.data.arr.unshift('-');
      }
      this.setData({screenData:str});

    }
    //eval()
    else if(code==this.data.ide){
      var newArr=[];
      var num='';
      var arr=this.data.arr;
      for(var i in arr){
        if(isNaN(arr[i])==false||arr[i]==this.data.idg){
          num+=arr[i];
        }
        else{
          newArr.push(num);
          newArr.push(arr[i]);
          num="";
        }
      }
      newArr.push(num);
      var result=Number(newArr[0]);
      for(var i=1;i<=newArr.length;i++){
        if(newArr[i]==this.data.ida){
          result+= Number(newArr[i+1]);
        }else if(newArr[i]==this.data.idb){
          result-=Number(newArr[i+1]);
        }else if(newArr[i]==this.data.idc){
          result*=Number(newArr[i+1]);
        }else if(newArr[i]==this.data.idd){
          result/=Number(newArr[i+1]);
        }else if(newArr[i]==this.data.idf){
          for(var a=1;a<=newArr[i-1];a++){
            var jiecheng_sum=1;
            jiecheng_sum*=a;
          }
          result=jiecheng_sum;
        }
      }
      this.data.his.push(this.data.screenData+'-'+result);
      wx.setStorageSync('his',this.data.his);
      this.setData({screenData:result});
      this.data.arr=[];
      this.data.arr.push(result);
      
      console.log(newArr);
      console.log(result);
    }

    else{
        //接收用户输入的值
        var code=e.currentTarget.id;
        //获取数据
        var data=this.data.screenData;
        //判断是不是符号
        if(code==this.data.ida||code==this.data.idb||code==this.data.idc||    code==this.data.idd||code==this.data.idf||code==this.data.C||code==this.data.sign){
          if(this.data.isfuhao==true){
            return '';
          }
        }
        var str=null;
        //判断数据是否为零
        if(data==0){
          str=code;
        }else{
          str=data+code;
        }
        this.setData({'isfuhao':false});
        //判断是不是符号
        if(code==this.data.ida||code==this.data.idb||code==this.data.idc||    code==this.data.idd||code==this.data.idf||code==this.data.C||code==this.data.sign){
          this.setData({'isfuhao':true});
        }
        //设置数据
        this.data.arr.push(code);
        this.setData({screenData:str});
    }
    console.log(this.data.screenData);
  }
})
