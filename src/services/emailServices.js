require('dotenv').config();

const nodemailer = require("nodemailer");

let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: 'phamquanganh4a@gmail.com',
            pass: 'srbj wrvm qsee ilrz'
        }
    });

    // async..await is not allowed in global scope, must use a wrapper

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Đậu Đậu đen hôi 👻" <Phamquanganh1a@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: "Thông tin đăt lịch khám bệnh!", // Subject line
        html: getBodyHTMLEMail(dataSend), // html body
    });
}
let getBodyHTMLEMail = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result =
            `<h3>Xin Chào ${dataSend.patientName}!</3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên Web của chúng tôi</p>
        <p>Thông tin đặt lịch khám bệnh:</p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
        <p> Nếu thông tin trên đúng sự thật, vui lòng click vào đường link bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh</p>
        <div>
        <a href=${dataSend.link} target="_black">Bấm vào đây</a>
        </div>
        `
    }
    if (dataSend.language === 'en') {
        result =
            `<h3>Hello ${dataSend.patientName}!</3>
        <p>You received this email because you made an online medical appointment on our website</p>
        <p>Information for scheduling medical examination:</p>
        <div><b>Time: ${dataSend.time}</b></div>
        <div><b>Doctor: ${dataSend.doctorName}</b></div>
        <p> If the above information is true, please click on the link below to confirm and complete the medical appointment booking procedure.</p>
        <div>
        <a href=${dataSend.link} target="_black">Click here</a>
        </div>
        `
    }
    return result;
}





module.exports = {
    sendSimpleEmail
}