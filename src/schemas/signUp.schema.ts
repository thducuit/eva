import { z } from "zod";

const signUpSchema = z
  .object({
    email: z.string().email({
      message: 'Vui lòng nhập địa chỉ email hợp lệ.',
    }),
    username: z.string().min(1, {
      message: 'Vui lòng nhập tên của bạn.',
    }).min(2, {
      message: 'Tên của bạn phải có ít nhất 2 ký tự.',
    }),
    customerCode: z.string().optional(),
    password: z.string().min(6, {
      message: 'Mật khẩu phải có ít nhất 6 ký tự.',
    }),
    confirmPassword: z.string({
      message: 'Vui lòng nhập mật khẩu xác nhận.',
    }).min(1, {
      message: 'Vui lòng nhập mật khẩu xác nhận.',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp.",
    path: ['confirmPassword'],
  })

export default signUpSchema