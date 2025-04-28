from flask import Flask, request, jsonify
from openai import OpenAI
from flask_cors import CORS
app = Flask(__name__)
from deepseekAdapter import DeepSeekClient as DeepSeekAdapter
api_key = "sk-fe3e823715ef4cbd9afb93a07194e03e"

CORS(app)  # 允许所有来源的跨域请求

messages = [
    {"role": "system", "content": "你是一个有帮助的助手"},
    {"role": "user", "content":"""
     你好!现在你控制一个智能冶金系统，其包含多个子系统，包含烟气分析、炉温监测、智能炼钢、无人天车调度系统、设备与原材料检测系统，轧制智能控制系统，转炉精细模型控制系统，工厂智能排产系统、电力火灾预防检测系统等。我需要你根据之后的内容模拟我需要的json数据，请严格按照我给你的给是提供json，并且不要返回其他内容。
     {
    "system": "flue_gas_analysis",
    "timestamp": "2023-03-30T15:00:00Z",
    "data": [
      {
        "name": "SO2 浓度",
        "unit": "ppm",
        "readings": [
          {"time": "14:00", "value": 82},
          {"time": "14:10", "value": 85},
          {"time": "14:20", "value": 87},
          {"time": "14:30", "value": 84},
          {"time": "14:40", "value": 86},
          {"time": "14:50", "value": 83}
        ],
        "statistics": {
          "average": 84.5,
          "max": 87,
          "min": 82,
          "trend": "stable",
          "alert": false
        }
      },
      {
        "name": "CO2 浓度",
        "unit": "%",
        "readings": [
          {"time": "14:00", "value": 18.2},
          {"time": "14:10", "value": 18.5},
          {"time": "14:20", "value": 18.7},
          {"time": "14:30", "value": 18.4},
          {"time": "14:40", "value": 18.6},
          {"time": "14:50", "value": 18.3}
        ],
        "statistics": {
          "average": 18.45,
          "max": 18.7,
          "min": 18.2,
          "trend": "stable",
          "alert": false
        }
      }
    ]
  }
     """},
    {"role": "system", "content": """
    {
  "flue_gas_analysis": {
    "timestamp": "2023-03-23T15:00:00Z",
    "data": [
      {
        "name": "钢铁温度",
        "unit": "°C",
        "readings": [
          {"time": "2023-03-17T08:00", "value": 1520},
          {"time": "2023-03-17T16:00", "value": 1535},
          {"time": "2023-03-18T08:00", "value": 1518},
          {"time": "2023-03-18T16:00", "value": 1540},
          {"time": "2023-03-19T08:00", "value": 1525},
          {"time": "2023-03-19T16:00", "value": 1538},
          {"time": "2023-03-20T08:00", "value": 1522},
          {"time": "2023-03-20T16:00", "value": 1532},
          {"time": "2023-03-21T08:00", "value": 1515},
          {"time": "2023-03-21T16:00", "value": 1545},
          {"time": "2023-03-22T08:00", "value": 1528},
          {"time": "2023-03-22T16:00", "value": 1530}
        ],
        "statistics": {
          "average": 1528.25,
          "max": 1545,
          "min": 1515,
          "trend": "rising",
          "alert": false
        }
      }
    ]
  }
}
"""},
{"role": "user", "content": """
你的格式不对，请严格按照我的格式
 请只返回json，不要返回其他内容
 """},
]

@app.route('/api/chat', methods=['POST'])
def chat():
    global messages
    user_input = request.json.get('message')
    # 添加用户新消息
    messages.append({"role": "user", "content": user_input})
    
    # 调用API
    response = DeepSeekAdapter.run(
        apiKey=api_key,
        data={"messages": messages}
    )
    
    # 获取AI回复
    ai_response = response["choices"][0]["message"]["content"]
    ai_response = ai_response.strip("```json\n").strip("```")
    # 将AI回复加入历史
    messages.append({"role": "assistant", "content": ai_response})
    print(ai_response)
    return ai_response

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

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

# print(chat_with_deepseek("我需要你给我返回钢厂上周温度数据"))  # 第一问