"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const resend_1 = __importDefault(require("../lib/resend"));
const sendMail = async ({ to, subject, text, html }) => {
  const { data, error } = await resend_1.default.emails.send({
    from: "onboarding@resend.dev",
    to: to,
    subject,
    text,
    html,
  });
  if (error) {
    console.log(error);
  }
  return { data, error };
};
exports.sendMail = sendMail;
