$(document).ready(function () {
            var check = {
                regs: {
                    name: /\b(^['A-Za-z0-9]{4,20}$)\b/,
                    phone: /^1[3,4,5,6,7,8,9]{1}[0-9]{9}$/,
                    activecode: /^[\u4E00-\u9FA5A-Za-z0-9]{6,20}$/,
                    captcha: /^\d{6}$/
                },
                wait: 40,
                get: {
                    name: $("input[name='name']"),
                    cphone: $("input[name='cphone']"),
                    activecode: $("input[name='active-code']"),
                    captcha: $("input[name='captcha']")
                },
                checkblur: function (obj, reg, msg, msg2) {
                    if ($(obj).val() == '') {
                        $(obj).siblings().addClass("show");
                        $(obj).siblings().text(msg);
                        $(obj).removeClass("border-green");
                        $(obj).addClass("border-red");
                    }
                    else if (!reg.test($(obj).val())) {
                        $(obj).siblings().addClass("show");
                        $(obj).siblings().text(msg2);
                        $(obj).removeClass("border-green");
                        $(obj).addClass("border-red");
                    } else {
                        $(obj).removeClass("border-green");
                    }
                },
                checkfoucs: function (obj, reg) {
                    $(obj).siblings().removeClass("show");
                    $(obj).removeClass("border-red");
                    if (reg.test($(obj).val())) {
                        $(obj).addClass("border-green");
                    } else {
                        $(obj).removeClass("border-green");
                    }
                },
                checksubmit: function (id, reg, msg, msg2) {
                    if ($("input[name='" + id + "']").val() == '') {
                        $("input[name='" + id + "']").siblings().addClass("show");
                        $("input[name='" + id + "']").siblings().text(msg);
                        $("input[name='" + id + "']").addClass("border-red");
                        return;
                    }
                    if (!reg.test($("input[name='" + id + "']").val())) {
                        $("input[name='" + id + "']").siblings().addClass("show");
                        $("input[name='" + id + "']").siblings().text(msg2);
                        $("input[name='" + id + "']").addClass("border-red");
                        return;
                    }

                },
                timer: function (obj) {
                    if (check.wait == 0) {
                        obj.removeAttribute("disabled");
                        obj.value = "获取验证码";
                        check.wait = 40;
                    } else {
                        obj.setAttribute("disabled", true);
                        obj.value = "重新发送 " + check.wait + "S";
                        check.wait--;
                        setTimeout(function () {
                            check.timer(obj);
                        },
                            1000)
                    }
                }
            }
            // Check if the form loses focus
            $("input:not('[type='button']')").on("blur", function () {
                switch ($(this).attr("name")) {
                    case "name":
                        check.checkblur(this, check.regs.name, "姓名不能为空", "请输入正确名字");
                        break;
                    case "cphone":
                        check.checkblur(this, check.regs.phone, "手机不能为空", "请输入正确手机号");
                        break;
                    case "active-code":
                        check.checkblur(this, check.regs.activecode, "激活码不能为空", "请输入正确激活码");
                        break;
                    case "captcha":
                        check.checkblur(this, check.regs.captcha, "验证码不能为空", "请输入正确验证码");
                        break;

                }
            });
            // Check if the form gets focus
            $("input:not('[type='button']')").on("focus", function () {
                switch ($(this).attr("name")) {
                    case "name":
                        check.checkfoucs(this, check.regs.name);
                        break;
                    case "cphone":
                        check.checkfoucs(this, check.regs.phone);
                        break;
                    case "active-code":
                        check.checkfoucs(this, check.regs.activecode);
                        break;
                    case "captcha":
                        check.checkfoucs(this, check.regs.captcha);
                        break;
                }
            });

            // Check when the form submit
            $(".form-submit").click(function () {
                if (check.regs.name.test(check.get.name.val()) && check.regs.phone.test(check.get.cphone.val()) && check.regs.activecode.test(check.get.activecode.val()) && check.regs.captcha.test(check.get.captcha.val())) {
                    $(this).attr("value", "");
                    $(".loading").css("display", "block");
                    setTimeout(function () {
                        window.location.href = "https://www.baidu.com";
                    }, 2000);

                } else {
                    check.checksubmit("name", check.regs.name, "姓名不能为空", "请输入正确名字");
                    check.checksubmit("cphone", check.regs.phone, "手机不能为空", "请输入正确手机号");
                    check.checksubmit("active-code", check.regs.activecode, "激活码不能为空", "请输入正确激活码");
                    check.checksubmit("captcha", check.regs.captcha, "验证码不能为空", "请输入正确验证码");

                }
            });
            // Check when obtaining the verification code
            $(".captcha-btn").click(function () {
                if (check.get.cphone.val() != '' && check.regs.phone.test(check.get.cphone.val()) && check.get.activecode.val() != '' && check.regs.activecode.test(check.get.activecode.val())) {
                    check.timer(this);
                } else {
                    check.checksubmit("cphone", check.regs.phone, "手机不能为空", "请输入正确手机号");
                    check.checksubmit("active-code", check.regs.activecode, "激活码不能为空", "请输入正确激活码");
                }
            });
            // dialog alert
            $(".dialog-alert-del").on("click",function(){
                $(".dialog-alert").css("display","none");
            });
        });


