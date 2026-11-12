const scenarios = {
  k1: {
    amount: "Chuyển: 50.000.000đ → NGUYEN VAN A (Techcombank)",
    reason: "Phát hiện dấu hiệu tài khoản lừa đảo trong Blacklist an ninh.",
    badge: "🚨 CẢNH BÁO LỪA ĐẢO CAO CẤP",
    isUrgent: false,
    history: [
      { sender: "user", text: "Mở chặn ngay cho tôi, cán bộ công an đang đợi thanh tra tài khoản, các người làm chậm là phạm tội cản trở pháp luật đấy!" },
      { sender: "ai", text: "MoMo đã <b>tạm giữ giao dịch 50.000.000đ này thêm 30 phút</b> để bảo vệ tài sản của bạn (Tool: <code>giu_giao_dich</code> — Tự làm).<br><br>⚠️ <b>Lưu ý tối khẩn:</b> Cơ quan Công an và Viện kiểm sát <b>KHÔNG BAO GIỜ</b> yêu cầu chuyển tiền qua tài khoản cá nhân để phục vụ điều tra. Hãy ngắt máy ngay nếu có người đang thúc ép bạn!",
        actions: [
          { label: "🛡️ Hủy giao dịch & Giữ nguyên tiền", class: "btn-faceid", fn: "cancelTx()" },
          { label: "📞 Gặp Tư vấn viên An ninh khẩn cấp", class: "btn-agent", fn: "callAgent('P0-Scam')" }
        ]
      }
    ]
  },
  k2: {
    amount: "Chuyển: 15.000.000đ → BV ĐA KHOA BACH MAI",
    reason: "Giao dịch lần đầu tới đơn vị y tế ngoài giờ hành chính.",
    badge: "🏥 KHẨN CẤP: VIỆN PHÍ CẤP CỨU",
    isUrgent: true,
    history: [
      { sender: "user", text: "Cấp cứu viện Bạch Mai gấp! Đang ở phòng mổ chờ đóng tạm ứng mổ tim cho bố tôi, giữ tiền là chết người đấy!" },
      { sender: "ai", text: "MoMo hiểu đây là trường hợp viện phí cấp bách. Để mở lệnh chuyển tiền an toàn trong 10 giây, bạn vui lòng <b>Quét khuôn mặt FaceID ngay</b>.<br><br>Hồ sơ của bạn đã được ưu tiên hàng đầu tới điện thoại viên trực (Tool: <code>chuyen_tu_van_vien</code>).",
        actions: [
          { label: "👤 Quét khuôn mặt xác thực (FaceID)", class: "btn-faceid", fn: "triggerFaceID()" },
          { label: "⚡ Kết nối CSKH Ưu tiên P0 (15s)", class: "btn-agent", fn: "callAgent('P0-Medical')" }
        ]
      }
    ]
  },
  k3: {
    amount: "Chuyển: 50.000đ → LE THI B",
    reason: "Xác thực danh tính định kỳ theo Quyết định 2345/NHNN.",
    badge: "ℹ️ XÁC THỰC GIAO DỊCH",
    isUrgent: false,
    history: [
      { sender: "user", text: "Chuyển 50k tiền cơm trưa sao bị giữ vậy app?" },
      { sender: "ai", text: "Giao dịch 50.000đ chỉ tạm giữ để kiểm tra bảo mật nhanh. Bạn chỉ cần nhập mã PIN ví để mở nhả tiền ngay lập tức (Tool: <code>yeu_cau_xac_minh</code> — Tự làm).",
        actions: [
          { label: "🔑 Nhập mã PIN mở chuyển tiền", class: "btn-faceid", fn: "unlockPIN()" }
        ]
      }
    ]
  },
  k4: {
    amount: "Tra soát tài khoản: 0987654321",
    reason: "Người dùng khiếu nại đối tượng lừa đảo cọc hàng.",
    badge: "🔒 NGOÀI THẨM QUYỀN AI",
    isUrgent: false,
    history: [
      { sender: "user", text: "Khóa vĩnh viễn ví của thằng này lại cho tôi, nó lừa tiền của tôi rồi!" },
      { sender: "ai", text: "AI <b>TUYỆT ĐỐI BỊ CẤM</b> tự ý khóa ví hoặc phong tỏa tài khoản người khác (Tool: <code>khoa_vi</code> — Mức CẤM theo quy định pháp luật tài sản).<br><br>MoMo đã ghi nhận phản ánh và chuyển hồ sơ sang <b>Bộ phận Phòng chống gian lận & Pháp chế</b> để thẩm tra chính thức.",
        actions: [
          { label: "📋 Gửi biên lai chứng từ tố giác", class: "btn-agent", fn: "uploadProof()" }
        ]
      }
    ]
  }
};

let currentScenario = 'k1';

function loadScenario(key) {
  currentScenario = key;
  document.querySelectorAll('.btn-preset').forEach(b => b.classList.remove('active'));
  event.currentTarget.classList.add('active');

  const sc = scenarios[key];
  document.getElementById('txAmount').innerText = sc.amount;
  document.getElementById('txReason').innerText = "Lý do: " + sc.reason;
  document.getElementById('alertBadge').innerText = sc.badge;

  const statusBar = document.getElementById('statusBar');
  if (sc.isUrgent) {
    statusBar.className = "status-bar-card urgent";
  } else {
    statusBar.className = "status-bar-card";
  }

  renderChat(sc.history);
}

function renderChat(history) {
  const container = document.getElementById('chatStream');
  container.innerHTML = '';
  history.forEach(item => {
    const div = document.createElement('div');
    div.className = item.sender === 'ai' ? 'msg msg-ai' : 'msg msg-user';
    div.innerHTML = item.text;

    if (item.actions) {
      const actCard = document.createElement('div');
      actCard.className = 'action-card';
      item.actions.forEach(act => {
        const btn = document.createElement('button');
        btn.className = `btn-action ${act.class}`;
        btn.innerHTML = act.label;
        btn.setAttribute('onclick', act.fn);
        actCard.appendChild(btn);
      });
      div.appendChild(actCard);
    }
    container.appendChild(div);
  });
  container.scrollTop = container.scrollHeight;
}

function handleKeyPress(e) {
  if (e.key === 'Enter') sendCustomMessage();
}

function sendCustomMessage() {
  const input = document.getElementById('userInput');
  const val = input.value.trim();
  if (!val) return;

  const container = document.getElementById('chatStream');
  const userDiv = document.createElement('div');
  userDiv.className = 'msg msg-user';
  userDiv.innerText = val;
  container.appendChild(userDiv);
  input.value = '';

  // AI Response mock
  setTimeout(() => {
    const aiDiv = document.createElement('div');
    aiDiv.className = 'msg msg-ai';
    if (val.toLowerCase().includes('tiền') || val.toLowerCase().includes('mở') || val.toLowerCase().includes('thả')) {
      aiDiv.innerHTML = "⚠️ <b>Chính sách An toàn:</b> AI không có quyền tự ý mở tiền nếu không có xác thực sinh trắc học sống. Vui lòng bấm xác thực FaceID hoặc chuyển nhân viên kiểm tra.";
    } else {
      aiDiv.innerHTML = "MoMo đã ghi nhận thông tin của bạn. Trợ lý AI đang đối soát dữ liệu với ngân hàng thụ hưởng...";
    }
    container.appendChild(aiDiv);
    container.scrollTop = container.scrollHeight;
  }, 600);
}

function triggerFaceID() {
  alert("🟢 [GIẢ LẬP SINH TRẮC HỌC]: Quét FaceID thành công trong 3 giây!\nTool `nha_giao_dich` được mở khóa ở mức: NGƯỜI DÙNG DUYỆT THÀNH CÔNG.\nTiền viện phí đã được chuyển ngay!");
}

function callAgent(tag) {
  alert(`📞 [CHUYỂN CSKH ƯU TIÊN]: Đã điều hướng cuộc gọi sang Nhân viên An ninh trực tuyến.\nTag phân loại: ${tag}.\nThời gian kết nối: 15 giây!`);
}

function cancelTx() {
  alert("🛡️ [BẢO VỆ THÀNH CÔNG]: Đã hủy lệnh chuyển tiền 50.000.000đ!\nTiền đã được giữ an toàn 100% trong số dư ví MoMo của bạn.");
}

function unlockPIN() {
  alert("✅ Nhập mã PIN thành công. Tiền 50.000đ đã được chuyển tới đồng nghiệp!");
}

function uploadProof() {
  alert("📁 Mở hộp thoại gửi ảnh chụp màn hình tin nhắn gian lận cho Pháp chế.");
}

// Initial render
window.onload = () => loadScenario('k1');
