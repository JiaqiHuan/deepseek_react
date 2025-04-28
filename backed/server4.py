from flask import Flask, request, jsonify
from openai import OpenAI
from flask_cors import CORS
app = Flask(__name__)
from deepseekAdapter import DeepSeekClient as DeepSeekAdapter
api_key = "sk-fe3e823715ef4cbd9afb93a07194e03e"

CORS(app)  # 允许所有来源的跨域请求

messages = [
    {"role": "system", "content": "你是一个有帮助的助手"},
    {"role": "user", "content": """{"system":"flue_gas_analysis","timestamp":"2023-03-30T15:00:00Z","data":[{"name":"SO2 浓度","unit":"ppm","readings":[{"time":"14:00","value":82},{"time":"14:10","value":85},{"time":"14:20","value":87},{"time":"14:30","value":84},{"time":"14:40","value":86},{"time":"14:50","value":83}],"statistics":{"average":84.5,"max":87,"min":82,"trend":"stable","alert":false}},{"name":"CO2 浓度","unit":"%","readings":[{"time":"14:00","value":18.2},{"time":"14:10","value":18.5},{"time":"14:20","value":18.7},{"time":"14:30","value":18.4},{"time":"14:40","value":18.6},{"time":"14:50","value":18.3}],"statistics":{"average":18.45,"max":18.7,"min":18.2,"trend":"stable","alert":false}}]}"""}
]

# @app.route('/api/chat', methods=['POST'])
def chat_with_deepseek(user_message):
    global messages
    # user_message = request.json.get('message')
    # 添加用户新消息
    messages.append({"role": "user", "content": user_message})
    
    # 调用API
    response = DeepSeekAdapter.run(
        apiKey=api_key,
        data={"messages": messages}
    )
    
    # 获取AI回复
    # ai_response = response["choices"][0]["message"]
    
    # 将AI回复加入历史
    # messages.append({"role": "assistant", "content": ai_response})
    
    return jsonify(response)
# return jsonify({"response": ai_response.content})

# @app.route('/api/chat', methods=['POST'])
# def chat():
#     global messages

#     # 获取前端发送的消息
#     user_message = request.json.get('message')

#     # 将用户消息加入到messages中
#     messages.append({"role": "user", "content": user_message})

#     # 调用DeepSeek API获取回复
#     response = client.chat.completions.create(
#         model="deepseek-chat",
#         messages=messages
#     )

#     # 获取AI的回复
#     ai_message = response.choices[0].message
#     messages.append(ai_message)

#     # 返回AI的回复给前端
#     return jsonify({"response": ai_message.content})

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000)

print(chat_with_deepseek("你好！你是谁？"))  # 第一问
# print(chat_with_deepseek("我刚才问了什么？"))  # 第二问（AI能记住上下文）