$("#reset").click(function () {
    var student=[
        {id:"001",kahao:"111111",pasword:"999999",money:"123123"},
        {id:"002",kahao:"222222",pasword:"888888",money:"123412"},
        {id:"003",kahao:"333333",pasword:"777777",money:"123451"},
        {id:"004",kahao:"444444",pasword:"666666",money:"988765"},
        {id:"005",kahao:"555555",pasword:"555555",money:"764578"},
        {id:"006",kahao:"555555",pasword:"555555",money:"764578"},
        {id:"007",kahao:"555555",pasword:"555555",money:"764578"},
        {id:"008",kahao:"555555",pasword:"555555",money:"764578"},
        {id:"009",kahao:"555555",pasword:"555555",money:"764578"},
        {id:"010",kahao:"555555",pasword:"555555",money:"764578"},
    ];
    localStorage.setItem('student',JSON.stringify(student));
    location.reload()
});
$("#clear").click(function () {
     localStorage.clear();
     location.reload();
});

    var total=5;//每页显示的条数
    var Page=1;//当前页
    var pageCount;//总页数



    $(function () {
        displayData(); //显示数据
        deleteEvent();
        // addEvent();
        addEvent();//添加事件
        // console.log(addEvent)
        dispalyPage();
        addpageEvent();

        editEvent();

    });

//修改、
function editEvent() {
    //修改方法
    //1.获取用户重新输入的数据
    $("#table1").on('click','.btnxiu',function () {
        var Id = $(this).attr('data-index');
        var student = JSON.parse(localStorage.getItem('student'));
       for (var i = 0;i < student.length; i++){
           if(student[i].id==Id){
               editId = Id - 1;
               var editArr = [];
               for (var j = 1;j <= 4; j++){
                   editArr.push($(this).parents('tr').find('td').eq(j).text());
               }
               $("#editModal input").each(function (index,ele) {
                    $(ele).val(editArr[index]);
               })
           }
       }
    })
    $(".editQ").click(function () {
        var editObj ={};
        var editArr = [];
        $("#editModal input").each(function (index,ele) {
            editArr.push($(ele).val())
        })
        editObj.id = editArr[0];
        editObj.kahao = editArr[1];
        editObj.pasword = editArr[2];
        editObj.money = editArr[3];

        console.log(editObj)

        var student = JSON.parse(localStorage.getItem('student'));
        student.splice(editId,1,editObj);
        localStorage.setItem('student',JSON.stringify(student));
        location.reload();

        $("#editModal").modal('hide');

    })
    // var textAddId= $("#textAddId").val();
    // var textAddKahao=$("#textAddKahao").val();
    // var textAddPwd=$("#textAddPwd").val();
    // var textAddMoney=$("#textAddMoney").val();
}
//生成页码
function dispalyPage(){
    var student = JSON.parse(localStorage.getItem('student'));
    var count=student.length;//数据的总条数
    pageCount=Math.ceil(count/total);//得到总页数并向上取整
    $("#fenye").html("");//生成之前 清空页码
    //清空之后生成页码
    for (var i=1;i<=pageCount;i++){
        if (i==Page){
            $("#fenye").append(`<button class="btn btn-primary">${i}</button>`);
        }else {
            $("#fenye").append(`<button class="btn">${i}</button>`);
        }

    }

}
//给页码添加事件
function addpageEvent() {
    $("#fenye").on("click","button",function () {
        Page=Number($(this).text());
        // console.log(Page);
        displayData();
    })
}

//删除事件
    function deleteEvent() {
        $("#table1").on("click",".btnDel",function () {
            Id=$(this).attr("data-index");
            var student = JSON.parse(localStorage.getItem('student'));
            for(var i=0;i<student.length;i++){
                if (student[i].id==Id){
                    if($("#table1 tr").length == 1){
                        $("#fenye button").last().prev().click();
                        $("#fenye button").last().remove();
                    }
                    student.splice(i,1);
                    localStorage.setItem('student',JSON.stringify(student));
                    displayData();
                }
            }
        })
    }
    //数据显示
    function displayData() { //显示 //清除PAge按钮的选中样式

        $("#fenye button").removeClass("btn-primary");
        //给当前页对应的按钮，添加选中样式
        $("#fenye button").eq(Page-1).addClass("btn-primary");
        $("#table1").html("");//清空表格
        var start=(Page-1)*total;//对应的当前页第一条数据对象下标
        var end = start+total;
        var student = JSON.parse(localStorage.getItem('student'));
        for (var i=start;i<end&&i<student.length;i++){
            $("tbody").append("<tr>\n" +
                " <td><input type='checkbox'/></td>\n" +
                " <td>"+student[i].id+"</td>\n" +
                " <td>"+student[i].kahao+"</td>\n" +
                " <td>"+student[i].pasword+"</td>\n" +
                " <td>"+student[i].money+"</td>\n" +
                " <td>"+"<button type='button' class= btnDel data-index='"+student[i].id+"'>删除</button>"+"</td>\n" +
                " <td>"+"<button type='button' class= btnxiu data-toggle=\"modal\" data-target=\"#editModal\" data-index='"+student[i].id+"'>修改</button>"+"</td>\n" +
                " </tr>");
        }
    }

//     function displayData() { //数据显示
//         $("#table1").html("");//首先需要清空表格
//         for(var i=0;i<student.length;i++){
//             $("#table1").append(`<tr>
//         <td><input type="checkbox"/></td>
//         <td>${student[i].id}</td>
//         <td>${student[i].kahao}</td>
//         <td>${student[i].pasword}</td>
//         <td>${student[i].money}</td>
//         <td><button  type="button" class="btnDel" data-index='"+${student[i].id}+"'>删除</button></td>
//     </tr>
// `)
//         }
//     }

    // 添加事件

    // function addEvent() {
    //     $(".addQ").click(function () {
    //         var btnT=document.getElementById("addT");
    //         var arr = [];
    //         $("#myModal input").each(function (i,value) {
    //             arr.push($(value).val());
    //         });
    //         var newObj = {};           //添加事件首先我们需要获取到输入框进行遍历 并拿到值 然后添加到数组中
    //                             //申明一个空对象，将数组的下标赋值给空对象 一一对应 数据在PUSH新创建的空对象（这时候对象已经有值了）
    //                             //重新显示数据 然后隐藏模态框 因为要点击模态框确认后才执行，所以要写在确然事件里面
    //         newObj.id=arr[0];
    //         newObj.kahao=arr[1];
    //         newObj.pasword=arr[2];
    //         newObj.money=arr[3];
    //         student.push(newObj);
    //         displayData();
    //         // $("#myModal").hide();
    //         $("#myModal").modal('hide');
    //     })
    //
    // }

    //添加事件方法
    function addEvent() {
        /*
        * 1.获取input框的值
        * 2.将值添加到对象中
        * 3.将对象添加到数组中
        *4.重新绑定数据
        * */
        $("#addT").click(function () {
            $("#myModal input").val("");
            editId=-1;
        });
        $(".addQ").click(function () {

                //1.获取input框的值
                var textAddId= $("#textAddId").val();
                var textAddKahao=$("#textAddKahao").val();
                var textAddPwd=$("#textAddPwd").val();
                var textAddMoney=$("#textAddMoney").val();
                //2.将值添加到对象中
                var obj={id:textAddId,kahao:textAddKahao,pasword:textAddPwd,money:textAddMoney};
                //3.将对象添加到数组中
                var student = JSON.parse(localStorage.getItem('student'));
                student.push(obj);
                localStorage.setItem('student',JSON.stringify(student));
                //重新生成页码
                dispalyPage();
                //重新绑定数据
                displayData();
                //隐藏模态框
                $("#myModal").modal("hide");


        })

    }


    /*全选按钮*/
    $("#checkAll").on('change',function () {
      $("#table1 input[type=checkbox]").prop('checked',$(this).prop(('checked')))
        //将全选按钮的checked属性值(true或false)赋值给每一行的复选框的checked。
    })