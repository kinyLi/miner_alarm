const axios = require('axios')
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    secureConnection: true, // use SSL
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: 'out@qq.com',
        pass: '**' // QQ邮箱需要使用授权码
    }
});


let mailOptions = {
    from: '"gyl"<out@qq.com>', // 发件人
    to: 'in@qq.com', // 收件人
    subject: 'miner报警', // 主题
    text: '8卡算力低于平常', // plain text body
};



function alarm() {
    axios.get('https://api.f2pool.com/eth/**')
        .then((res) => {
            const { workers } = res.data;
            const ka8 = workers.filter((item) => {
                return item[0] === 'kiny8ka'
            })[0]
            const hashrate = ka8[8] / 1000000
            if (hashrate < 160) {
                transporter.sendMail(mailOptions)
            }
        })
}

setInterval(() => {
    alarm()
}, 1000 * 60 * 10)