import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email({
    message: 'Vui lòng nhập địa chỉ email hợp lệ.',
  }),
  password: z.string().min(1, {
    message: 'Vui lòng nhập mật khẩu.',
  }),
})

export default signInSchema