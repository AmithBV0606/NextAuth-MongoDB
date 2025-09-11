import User from "@/models/userModels";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // TODO : Configure mail for usage
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "129c9b31d73fe8",
        pass: "****0eb8",
      },
    });

    const mailOptions = {
      from: '"NextAuth MongoDB" <amithrao0606@gmail.com>',
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html:
        emailType === "VERIFY"
          ? verifyEmailTemplate(hashedToken)
          : forgotPasswordTemplate(hashedToken),
    };

    const mailResponse = await transport.sendMail(mailOptions);

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const verifyEmailTemplate = (hashedToken: string) => {
  return `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to verify your email or copy and paste the link below in your browser.<br /> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`;
};

const forgotPasswordTemplate = (hashedToken: string) => {
  return `<p>Click <a href="${process.env.DOMAIN}/forgotpassword?token=${hashedToken}">here</a> to reset your password or copy and paste the link below in your browser.<br />${process.env.DOMAIN}/forgotpassword?token=${hashedToken}
</p>`;
};
