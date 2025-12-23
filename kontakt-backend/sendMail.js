const nodemailer = require('nodemailer');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.post('/send', async (req, res) => {
  console.log('Odebrano żądanie:', req.body);
  console.log('Odebrano żądanie:', req.body);
  const {name, email, message} = req.body;

  // Konfiguracja transportu SMTP (przykład dla Gmaila)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'j.kowalczykk018@gmail.com',
      pass: 'TWOJE_HASLO_LUB_APP_PASSWORD'
    }
  });

  const mailOptions = {
    from: 'j.kowalczykk018@gmail.com',
    to: 'j.kowalczykk018@gmail.com',
    subject: `Wiadomość z portfolio od ${name}`,
    text: `Imię: ${name}\nEmail: ${email}\nTreść: ${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({message: 'Wiadomość wysłana!'});
  } catch (error) {
    res.status(500).json({message: 'Błąd wysyłania', error});
  }
});

app.listen(3001, () => console.log('Serwer działa na porcie 3001'));