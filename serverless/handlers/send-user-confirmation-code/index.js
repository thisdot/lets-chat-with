exports.handler = async (event, context) => {
  try {
    if (event.triggerSource === 'CustomMessage_SignUp') {
      const { codeParameter } = event.request;
      const { email } = event.request.userAttributes;
      const encodedEmail = encodeURIComponent(email);
      const link = `${process.env.REDIRECT_URL}email=${encodedEmail}&code=${codeParameter}`;
      const createdAt = new Date();
      const year = createdAt.getFullYear();

      event.response.emailSubject = 'Your verification code';
      event.response.emailMessage = template(email, codeParameter, link, year);
    }
    context.done(null, event);
    console.log(`Successfully sent custom message after signing up`);
  } catch (err) {
    context.done(null, event);
    console.error(
      `Error when sending custom message after signing up`,
      JSON.stringify(err, null, 2)
    );
  }
};

const template = (email, code, link, year) => `<html>
  <body style="background-color:#333; font-family: PT Sans,Trebuchet MS,sans-serif; ">
    <div style="background-color: #fff; font-size: 1.2rem; font-style: normal;font-weight: normal;line-height: 19px;" align="center">
      <div style="padding: 20px;">
        <p style="Margin-top: 20px;Margin-bottom: 0;">&nbsp;</p>
        <img style="border: 0;display: block;height: auto;" alt="Let's Chat With logo" src="https://lcw-prod-images.s3.amazonaws.com/img/lets-chat-with.png" />
        <p style="Margin-top: 20px;Margin-bottom: 0;">&nbsp;</p>
        <h2
            style="margin-top: 20px; margin-bottom: 0;font-style: normal; font-weight: bold; color: #000;font-size: 24px;line-height: 32px;text-align: center;">Hi ${email},
        </h2>
        <p style="Margin-top: 20px;Margin-bottom: 0;font-size: 16px;line-height: 24px; color: #000">Your registration request was successfully approved.</p>
        <p style="Margin-top: 20px;Margin-bottom: 0;font-size: 16px;line-height: 24px; color: #000">Here is your verification code: <b>${code}</b></p>
        <p style="Margin-top: 20px;Margin-bottom: 0;font-size: 16px;line-height: 24px; color: #000">Click below to complete the registration.</p>
        <p style="Margin-top: 20px;Margin-bottom: 0;">&nbsp;</p>
        <div style="Margin-left: 20px;Margin-right: 20px;Margin-top: 24px;">
          <div style="Margin-bottom: 20px;text-align: center; width: 350px;">
            <a
                style="border-radius: 4px;display: block;font-size: 14px;font-weight: bold;line-height: 24px;padding: 12px 24px 13px 24px;text-align: center;text-decoration: none !important;transition: opacity 0.1s ease-in;color: #ffffff !important;box-shadow: inset 0 -2px 0 0 rgba(0, 0, 0, 0.2);background-color: #554DB3;font-family: PT Sans, Trebuchet MS, sans-serif; letter-spacing: 0.05rem;"
                href="${link}">CLICK HERE TO VERIFY YOUR EMAIL
            </a>
          </div>
        </div>
        <p style="Margin-top: 20px;Margin-bottom: 0;">&nbsp;</p>
        <p style="Margin-top: 20px;Margin-bottom: 0;">&nbsp;</p>
        <div>
          <a href='https://www.facebook.com/thisdot' style='text-decoration: none;'>
            <img alt="Facebook icon" src='https://lcw-prod-images.s3.amazonaws.com/img/soc-fb.png' />
          </a>
          <a href='https://twitter.com/ThisDotLabs' style='text-decoration: none;'>
            <img alt="Twitter icon" style='margin-left: 18px;' src='https://lcw-prod-images.s3.amazonaws.com/img/soc-tw.png' />
          </a>
          <a href='https://www.youtube.com/thisdotmedia' style='text-decoration: none;'>
            <img alt="YouTube icon" style='margin-left: 18px;' src='https://lcw-prod-images.s3.amazonaws.com/img/soc-yt.png' />
          </a>
        </div>
        <div>
          <p style="color: #626D8E; font-family: Montserrat, sans-serif; align: center; font-size: 15px">
            Copyright ©
            ${year}
            This Dot Labs
          </p>
          <p
            style="padding: 0;
            color: #626D8E;
            font-family: Montserrat, sans-serif;
            align: center;
            font-size: 15px;
            line-height: 22px;"
          >7742 Spalding Dr PMB 141 Peachtree Corners, GA 30092</p>
        <div>
      </div>
    </div>
  </body>
  </html>`;
