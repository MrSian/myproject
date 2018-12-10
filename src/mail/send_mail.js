const nodemailer = require('nodemailer');

    let transporter = nodemailer.createTransport({
        service: 'qq',//邮箱的服务商
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "1719098864@qq.com", // 默认邮箱
            pass: 'kovuhvhisujidbij' // //smtp 授权码
        }
    });

    // 发送邮件相关信息

    function sendmail(mail,msg){
        return new Promise((resolve,reject)=>{
            let mailOptions = {
                from: '1719098864@qq.com', // sender address
                to: mail, // list of receivers
                subject: '樱花后台登录提醒你:你的登录验证码为:'+msg+',有效期为1小时，请及时验证登陆!', // Subject line
                text: '樱花动漫后台登录管理', // plain text body
                html: '<div style="width:400px; height:400px;border:1px solid #ccc;"></div>' // html body
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {reject(error)}
                resolve(info)
            })
        })
    }
   module.exports={sendmail};
//    module.exports=(sendmail('1719098864@qq.com','123'));