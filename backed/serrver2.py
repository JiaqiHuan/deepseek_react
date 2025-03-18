from flask import Flask, request, jsonify
from openai import OpenAI
from flask_cors import CORS
app = Flask(__name__)


CORS(app)  # 允许所有来源的跨域请求

# 初始化OpenAI客户端
client = OpenAI(api_key="sk-fe3e823715ef4cbd9afb93a07194e03e", base_url="https://api.deepseek.com")

# 用于存储对话历史的全局变量
messages = []

@app.route('/chat', methods=['POST'])
def chat():
    global messages

    # 获取前端发送的消息
    user_message = request.json.get('message')

    # 将用户消息加入到messages中
    messages.append({"role": "user", "content": user_message})

    # 调用DeepSeek API获取回复
    response = client.chat.completions.create(
        model="deepseek-chat",
        messages=messages
    )

    # 获取AI的回复
    ai_message = response.choices[0].message
    messages.append(ai_message)

    # 返回AI的回复给前端
    return jsonify({"response": ai_message.content})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)