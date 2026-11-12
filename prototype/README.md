# Prototype T5 · Chat với ví — nhóm NhatXaTamNo

## Cách chạy
- **Có AI thật (OpenAI):** đặt `OPENAI_API_KEY` trong biến môi trường hoặc file `.env` ở thư mục gốc repo (file này đã `.gitignore`), chạy `python3 prototype/server.py`, mở http://127.0.0.1:8000. Trang tự chọn "AI thật · OpenAI". Đổi model bằng biến `OPENAI_MODEL` (mặc định `gpt-5.4-mini`). Chỉ cần Python 3, không cài thêm gì.
- **Không có key:** mở thẳng `index.html` bằng trình duyệt; dùng luật từ khoá (mock).
- `index.html#shot-ai` (qua server) mở ca K1 với ô log mở rộng, đúng như ảnh `anh-ai-log.png`.
- `index.html#shot-k1` và `index.html#shot-k2` mở đúng trạng thái của hai ảnh `anh-k1.png`, `anh-k2.png` (spec §5.2).

## Bố cục
- **Trái — bảng điều khiển:** chọn ca K1 / K2 / K9 hoặc "Ca mới" để tự gõ (K3, K5, K6, K7, K8, K11...), bật "Ngoài giờ trực", bật/tắt số chú thích, chọn bộ phân loại, xem log.
- **Giữa — màn hình khách:** chat, thẻ trạng thái giao dịch, chip "AI tự làm" kèm hoàn tác, nút sửa một chạm.
- **Phải — màn hình tư vấn viên:** tin gốc, dấu hiệu từ lời kể, phân loại của AI kèm độ chắc, cổng duyệt `nha_giao_dich` (hai ô tick + bước xác nhận).

## AI làm gì, code làm gì
1. **AI chỉ phân loại** tin nhắn: `bi_lua` / `gap_that` / `chiem_tai_khoan` / `ngoai_pham_vi` / `mo_ho` / `binh_thuong`, kèm độ chắc và cụm từ căn cứ.
2. **Code chọn làn** (DỪNG / NHANH / KHOÁ / GIỚI HẠN / HỎI LẠI). Có dấu hiệu bị giục chuyển trong tin → luôn DỪNG, bất kể AI nói gì.
3. **Câu trả lời lấy từ mẫu đã duyệt** ở spec §3. Căn cứ hiện cho khách chỉ gồm cụm từ có thật trong tin nhắn.

## Bộ phân loại
- **Luật từ khoá (mặc định):** mock, không phải AI. Log ghi rõ "mock, KHÔNG phải AI".
- **AI thật · OpenAI** (`gpt-5.4-mini`, mặc định khi chạy qua `server.py`): key ở server, trình duyệt không thấy. Gửi kèm các tin trước trong cùng cuộc chat để AI hiểu ngữ cảnh. Nhãn: bị lừa · gấp thật · chiếm tài khoản · ngoài phạm vi · nhờ chuyển tiền · mơ hồ · bình thường.
- **AI thật · Claude** (`claude-opus-5-5`) hoặc **AI thật · Gemini:** dán API key lúc chạy. Key chỉ nằm trong bộ nhớ trang, không lưu, không có trong repo. Log hiện request (không kèm key), phản hồi thô và độ trễ. Gọi lỗi → tự về luật từ khoá và log ghi rõ.
- Chỉ gõ dữ liệu dựng: tin nhắn được gửi tới nhà cung cấp AI.

## Phần mock
Giao dịch, màn hình xác thực, hệ thống kiểm tra giao dịch của ví, hàng đợi và màn hình tư vấn viên, cuộc gọi tổng đài. Hệ thống kiểm tra của ví (mock) sau khi khách xác thực: K1, K2 vẫn giữ, K9 cho đi; ca tự gõ thì giao dịch "bình thường" cho đi, "gấp thật" vẫn giữ để qua tư vấn viên, ca đã vào làn DỪNG luôn giữ. Số tiền trên thẻ lấy từ tin khách kể ("10k", "12tr", "2.350.000"). Chưa dựng lời nhắc khi khách im lặng 60 giây / 2 phút.

## Số chú thích (nhãn vàng #1–#7 = ①–⑦ trong spec §5.2)
| Số | Chỗ | Ý |
|---|---|---|
| 1 | dòng đầu bong bóng AI | G10: không chắc thì thu hẹp (bảo dừng / một câu rào) |
| 2 | dòng "Bạn đang chat với trợ lý AI" + "Mình dựa vào" | G1, G2, G11, PAIR Explainability |
| 3 | "Đây là giao dịch thật" / "Gặp tư vấn viên ưu tiên" | G9: sửa một chạm |
| 4 | chip "AI tự làm" + "Huỷ yêu cầu" | tự làm, có hoàn tác |
| 5 | cổng duyệt ở màn hình tư vấn viên | cần người duyệt |
| 6 | khung "Phía khách không có nút Nhả" | AI không được gọi `nha_giao_dich` |
| 7 | nút "Khoá ví (cần bạn xác nhận)" (ca K7) | cần chính chủ duyệt |
