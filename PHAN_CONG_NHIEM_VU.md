# KẾ HOẠCH PHÂN CÔNG NHIỆM VỤ & CHIẾN LƯỢC ĐẠT FULL ĐIỂM (100 + 8 BONUS)
**Dự án:** Lab 5 — Thiết kế sản phẩm AI cho lúc nó sai (AI Product & UX)  
**Lớp:** L3A · **Nhóm:** NhatXaTamNo · **Track:** T5 — Ví điện tử (`t5-ewallet.md`)  
**Mục tiêu:** 100/100 điểm chính + 8 điểm bonus (Xung phong demo + Gọi AI thật)

---

## 1. BẢNG PHÂN CÔNG NHIỆM VỤ 4 THÀNH VIÊN

> Điền Họ Tên và MSSV của 4 bạn vào bảng này. Bảng này sẽ được đồng bộ trực tiếp vào đầu file `spec.md`.

| Vai trò | Họ và Tên | MSSV | Nhiệm vụ chính trong `spec.md` & Sản phẩm | Nhiệm vụ khi Thuyết trình Demo (Bắt buộc ai cũng nói) |
|---|---|---|---|---|
| **P1: Lead Scenarios & Risk Analyst** *(Chủ trì R1, R2, R6)* | `Trung Anh` | `[Điền MSSV]` | - Viết mục §1 (Lát cắt & phạm vi: ≥3 việc cấm làm).<br>- Viết mục §2: Soạn đủ **≥8 kịch bản rủi ro** (phủ 4 lớp).<br>- Chọn và lập luận **2 kịch bản đắt nhất** (Bị lừa thao túng tâm lý vs Trả viện phí gấp).<br>- Viết mục §6: 3 tiêu chí Pass/Fail nghiệm thu. | - **Mở đầu (1.5 phút):** Giới thiệu lát cắt Track T5, 2 ca sai đắt nhất và bài toán đánh đổi.<br>- Trả lời câu hỏi: *"Vì sao 2 kịch bản này đắt hơn các kịch bản khác?"* |
| **P2: AI UX & Fallback Designer** *(Chủ trì R3: Khi AI sai)* | `Hoàng Anh` | `[Điền MSSV]` | - Viết mục §3 trong `spec.md`.<br>- Soạn câu chữ nguyên văn AI nói khi không chắc hoặc sai.<br>- Áp dụng **2–3 nguyên tắc HAX/PAIR** (G1, G2, G8, G10...).<br>- Phân loại lỗi (Hệ thống / Người dùng / Ngữ cảnh).<br>- Thiết kế giải pháp cho ca *"sửa câu chữ không cứu được"*. | - **Phần UX (1.5 phút):** Giải thích câu từ AI và trải nghiệm người dùng.<br>- **Trả lời câu hỏi bắt buộc:** *"Chỉ cho tôi chỗ nào trên giao diện là nguyên tắc HAX G..."* |
| **P3: Autonomy & Policy Architect** *(Chủ trì R4: Mức tự chủ)* | `Đức` | `[Điền MSSV]` | - Viết mục §4 trong `spec.md`.<br>- Phân loại mức tự chủ cho 5 tool (`giu_giao_dich`, `yeu_cau_xac_minh`, `chuyen_tu_van_vien`, `nha_giao_dich`, `khoa_vi`).<br>- Lập luận chi tiết theo **Cost of Error (Cái giá khi sai)** cho từng tool.<br>- Giải quyết tool tranh cãi nhất: `nha_giao_dich`. | - **Phần Mức tự chủ (1.5 phút):** Phân tích ma trận tự chủ.<br>- **Trả lời câu hỏi bắt buộc:** *"Hành động này sai thì ai mất gì, vì sao tool này ở mức cần người duyệt mà không cho AI tự làm?"* |
| **P4: Prototype Engineer & Live Demo** *(Chủ trì R5 + Bonus)* | `Hùng` | `[Điền MSSV]` | - Xây dựng Prototype tương tác (HTML/CSS/JS chạy trực tiếp trên trình duyệt).<br>- Thể hiện rõ: Trạng thái tự chủ, nút chuyển tư vấn viên, hủy giao dịch an toàn.<br>- **Lấy +3 Điểm Bonus:** Tích hợp 1 lệnh gọi AI thật (Gemini API) phân loại tin nhắn (Lừa đảo / Khẩn cấp / Tra soát). | - **Phần Demo (2 phút):** Thao tác trực tiếp kịch bản trên Prototype.<br>- Cùng nhóm ứng phó **"Ca lạ (Unseen test case)"** do TA hoặc Giảng viên đưa tại chỗ. |

---

## 2. TIMELINE 240 PHÚT & 3 MỐC TA KIỂM TRA (CHECKPOINTS)

| Thời gian | Chặng | Công việc cần hoàn thành | Phụ trách chính | Mốc kiểm tra của TA |
|---|---|---|---|---|
| **00 - 10'** | 1. Đọc đề | Đọc kỹ `tracks/t5-ewallet.md`, chốt phạm vi và các giới hạn không làm. | Cả nhóm | |
| **10 - 45'** | 2. Kịch bản | Viết xong ≥8 kịch bản, khoanh tròn 2 ca đắt nhất. | **P1** chủ trì, **P2** hỗ trợ | **Mốc M1 (Phút 45):** TA ký duyệt ≥8 kịch bản + 2 ca đắt nhất. |
| **45 - 90'** | 3. UX khi AI sai | Thiết kế câu thoại AI, gắn nguyên tắc HAX/PAIR, luồng thoát hiểm. | **P2** chủ trì, **P4** mockup | |
| **90 - 125'** | 4. Mức tự chủ | Xếp cấp độ cho 5 tool theo Cost of Error, test thử trên 3 ca. | **P3** chủ trì, **P1** hỗ trợ | **Mốc M2 (Phút 125):** TA duyệt bảng mức tự chủ và tool khó nhất. |
| **125 - 140'** | Nghỉ ngơi | Giải lao 15 phút. | Cả nhóm | |
| **140 - 200'** | 5. Prototype | Hoàn thiện giao diện web tương tác, test luồng, gắn API test. | **P4** chủ trì, **P2** viết text | **Mốc M3 (Phút 200):** TA test bấm thử ca khó trên prototype. |
| **200 - 210'** | 6. Eval & Soát | Viết 3 tiêu chí Pass/Fail, rà soát lại file `spec.md`. | **P1 & P3** | |
| **210 - 240'** | **DEMO** | **Xung phong demo trước lớp để ăn trọn +5 điểm Bonus!** | Cả 4 thành viên cùng nói | |

---
