const API_BASE_URL = 'http://localhost:5000'; // 后端 API 地址

export async function chatWithAI(message) {
    try {
        const response = await fetch(`${API_BASE_URL}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.response; // 返回 AI 回复
    } catch (error) {
        console.error('Error communicating with AI:', error);
        return 'Error communicating with AI';
    }
}
