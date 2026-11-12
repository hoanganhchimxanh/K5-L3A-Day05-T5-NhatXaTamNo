"""Server nhỏ cho prototype T5: phục vụ file tĩnh + chuyển lời gọi phân loại sang OpenAI.

Chạy:  python3 prototype/server.py      rồi mở  http://127.0.0.1:8000
Key:   lấy từ biến môi trường OPENAI_API_KEY, hoặc file .env ở thư mục gốc repo (đã .gitignore).
       Key chỉ nằm ở server, không gửi về trình duyệt, không ghi vào log.
Model: OPENAI_MODEL (mặc định gpt-5.4-mini).
Chỉ dùng thư viện chuẩn của Python, không cần cài gì.
"""
import json
import os
import re
import time
import urllib.error
import urllib.request
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

HERE = Path(__file__).resolve().parent
PORT = int(os.environ.get("PORT", "8000"))
OPENAI_URL = "https://api.openai.com/v1/chat/completions"


def load_env():
    env_file = HERE.parent / ".env"
    if env_file.exists():
        for line in env_file.read_text(encoding="utf-8").splitlines():
            m = re.match(r"\s*(?:export\s+)?([A-Z_][A-Z0-9_]*)\s*=\s*['\"]?([^'\"\n]*)['\"]?\s*$", line)
            if m and m.group(1) not in os.environ:
                os.environ[m.group(1)] = m.group(2).strip()


load_env()
KEY = os.environ.get("OPENAI_API_KEY", "")
MODEL = os.environ.get("OPENAI_MODEL", "gpt-5.4-mini")


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=str(HERE), **kw)

    def log_message(self, fmt, *args):  # log gọn, không bao giờ in header/key
        print("[server]", fmt % args)

    def send_json(self, code, obj):
        body = json.dumps(obj, ensure_ascii=False).encode("utf-8")
        self.send_response(code)
        self.send_header("content-type", "application/json; charset=utf-8")
        self.send_header("content-length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if self.path == "/api/health":
            return self.send_json(200, {"openai": bool(KEY), "model": MODEL})
        return super().do_GET()

    def do_POST(self):
        if self.path != "/api/classify":
            return self.send_json(404, {"error": "not found"})
        if not KEY:
            return self.send_json(500, {"error": "Chưa có OPENAI_API_KEY (biến môi trường hoặc .env)"})
        try:
            body = json.loads(self.rfile.read(int(self.headers.get("content-length", 0))))
            system, user, schema = body["system"], body["user"], body["schema"]
        except Exception as e:  # noqa: BLE001
            return self.send_json(400, {"error": f"Yêu cầu không hợp lệ: {e}"})

        request = {
            "model": body.get("model") or MODEL,
            "messages": [{"role": "system", "content": system}, {"role": "user", "content": user}],
            "response_format": {"type": "json_schema",
                                "json_schema": {"name": "phan_loai", "strict": True, "schema": schema}},
        }
        req = urllib.request.Request(
            OPENAI_URL, data=json.dumps(request).encode("utf-8"), method="POST",
            headers={"content-type": "application/json", "authorization": "Bearer " + KEY})
        t0 = time.perf_counter()
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                status, data = r.status, json.loads(r.read())
        except urllib.error.HTTPError as e:
            status, data = e.code, json.loads(e.read() or b"{}")
        except Exception as e:  # noqa: BLE001
            return self.send_json(502, {"error": f"Không gọi được OpenAI: {e}"})
        latency = round((time.perf_counter() - t0) * 1000)
        # Trả về request đã gửi (không kèm key) và phản hồi để trang hiện trong ô log.
        self.send_json(200, {"http": status, "latency": latency, "request": request, "response": data})


if __name__ == "__main__":
    print(f"Prototype: http://127.0.0.1:{PORT}  ·  OpenAI key: {'có' if KEY else 'CHƯA CÓ'}  ·  model: {MODEL}")
    ThreadingHTTPServer(("127.0.0.1", PORT), Handler).serve_forever()
