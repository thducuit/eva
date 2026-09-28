import { z } from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";

const accountSchema = z.object({
  username: z.string().min(1, {
    message: 'Vui lòng nhập tên của bạn.',
  }).min(2, {
    message: 'Tên của bạn phải có ít nhất 2 ký tự.',
  }),
  phone: z.string().refine((phone) => {
    const cleanPhone = phone.replace(/\s+/g, '');
    return isValidPhoneNumber(cleanPhone, "VN");
  }, {
    message: "Số điện thoại không hợp lệ"
  }),
  email: z.string().email({
    message: 'Vui lòng nhập địa chỉ email hợp lệ.',
  }),
  customerCode: z.string().optional(),
})

export default accountSchema