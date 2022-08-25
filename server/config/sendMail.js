const nodemailer = require("nodemailer");
const { OAuth2Client } = require("google-auth-library");

const {
  MAIL_CLIENT_ID,
  MAIL_CLIENT_SECRET,
  MAIL_REFRESH_TOKEN,
  SENDER_EMAIL_ADDRESS,
} = process.env;
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

const CLIENT_ID = `${MAIL_CLIENT_ID}`;
const CLIENT_SECRET = `${MAIL_CLIENT_SECRET}`;
const REFRESH_TOKEN = `${MAIL_REFRESH_TOKEN}`;
const SENDER_MAIL = `${SENDER_EMAIL_ADDRESS}`;

// send mail
const sendEmail = async (to, url, txt) => {
  const oAuth2Client = new OAuth2Client(
    CLIENT_ID,
    CLIENT_SECRET,
    OAUTH_PLAYGROUND
  );

  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

  try {
    const access_token = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: SENDER_MAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        access_token,
      },
    });

    const mailOptions = {
      from: SENDER_MAIL,
      to: to,
      subject: "Blog App",
      html: `
              <div style="max-width: 700px; margin:auto; padding: 50px 20px;">
              <h2 style="text-align: center; text-transform: uppercase;color: #6c62e2;">Welcome to Blog App</h2>
              <p>Congratulations! You're almost set to start using Blog App.
                  Just click the button below to validate your email address.
              </p>
              
              <a href=${url} style="background: #6c62e2; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
          
              <p>If the button doesn't work for any reason, you can also click on the link below:</p>
          
              <div>${url}</div>
              </div>
            `,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (err) {
    console.log(err);
  }
};

module.exports = sendEmail;
