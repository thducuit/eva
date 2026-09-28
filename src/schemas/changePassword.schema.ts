import { z } from "zod";

const changePasswordSchema = z.object({
  oldPassword: z.string().min(1, {
    message: 'Vui lòng nhập mật khẩu cũ.',
  }),
  password: z.string().min(1, {
    message: 'Vui lòng nhập mật khẩu.',
  }).min(6, {
    message: 'Mật khẩu phải có ít nhất 6 ký tự.',
  }),
  confirmPassword: z.string().min(1, {
    message: 'Vui lòng nhập mật khẩu xác nhận.',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Mật khẩu không khớp.",
  path: ['confirmPassword'],
})

export default changePasswordSchema