import numpy as np
from scipy.stats import norm, uniform, weibull_min, beta, lognorm, poisson, expon
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import PolynomialFeatures
from sklearn.pipeline import make_pipeline

# 模拟数据点数量（每分钟一个数据点，模拟 1000 分钟）
num_samples = 1000
time = np.arange(num_samples)

# 自回归参数（控制时间序列相关性）
phi = 0.95

# 初始化存储数组
inlet_temp = np.zeros(num_samples)  # 熔炼入口温度
heat_power = np.zeros(num_samples)  # 熔炼热功率
co_concentration = np.zeros(num_samples)  # 简易 CO 浓度
thickness = np.zeros(num_samples)  # 带钢厚度
strip_length = np.zeros(num_samples)  # 带钢长度

# 以下参数将通过回归模型拟合
outlet_temp = np.zeros(num_samples)  # 熔炼出口温度
carbon_content = np.zeros(num_samples)  # 熔炼终点碳含量
so2_concentration = np.zeros(num_samples)  # 废气 SO₂ 浓度
alpha_t = np.zeros(num_samples)  # α(t)

# 1. 生成基础参数（独立分布，但带时间序列相关性）
# 熔炼入口温度：N(1050, 10^2)
inlet_temp[0] = norm.rvs(loc=1050, scale=10)
for t in range(1, num_samples):
    noise = norm.rvs(loc=0, scale=10)
    inlet_temp[t] = phi * inlet_temp[t-1] + (1 - phi) * 1050 + noise

# 熔炼热功率：Weibull(k=2, λ=1200)
heat_power[0] = weibull_min.rvs(c=2, scale=1200)
for t in range(1, num_samples):
    noise = norm.rvs(loc=0, scale=50)
    heat_power[t] = phi * heat_power[t-1] + (1 - phi) * 1200 + noise
heat_power = np.clip(heat_power, 500, 2000)

# 简易 CO 浓度：Lognormal(μ=2.7, σ=0.3)
co_concentration[0] = lognorm.rvs(s=0.3, scale=np.exp(2.7))
for t in range(1, num_samples):
    noise = norm.rvs(loc=0, scale=0.1)
    co_concentration[t] = phi * co_concentration[t-1] + (1 - phi) * np.exp(2.7) + noise
co_concentration = np.clip(co_concentration, 0, None)

# 带钢厚度：{1250, 1500, 1800} ± 10，每 100 个时间点变化一次
thickness_choices = [1250, 1500, 1800]
for t in range(num_samples):
    idx = t // 100
    base_thickness = thickness_choices[idx % len(thickness_choices)]
    thickness[t] = base_thickness + uniform.rvs(loc=-10, scale=20)

# 带钢长度：Exponential(λ=0.001) + 5000，暂时独立生成
strip_length_base = 5000 + expon.rvs(scale=1/0.001, size=num_samples)
strip_length = np.clip(strip_length_base, 4000, 6000)

# 2. 生成初始的因变量数据（仅用于训练回归模型）
# 熔炼出口温度：假设初始值服从 U(845, 855)
outlet_temp_initial = uniform.rvs(loc=845, scale=10, size=num_samples)
# 熔炼终点碳含量：Beta(α=3, β=8) * 0.05%
carbon_content_initial = beta.rvs(a=3, b=8, size=num_samples) * 0.05
# 废气 SO₂ 浓度：Poisson(λ=0.3)
so2_concentration_initial = poisson.rvs(mu=0.3, size=num_samples)

# 3. 训练回归模型拟合参数关系
# 自变量：入口温度、热功率、CO 浓度、带钢厚度
X = np.column_stack((inlet_temp, heat_power, co_concentration, thickness))

# 回归模型：随机森林回归
rf_model = RandomForestRegressor(n_estimators=100, random_state=None)

# 3.1 拟合熔炼出口温度
rf_model.fit(X, outlet_temp_initial)
outlet_temp = rf_model.predict(X)
outlet_temp = np.clip(outlet_temp, 845, 855)  # 限制范围
# 添加时间序列平滑性
for t in range(1, num_samples):
    outlet_temp[t] = phi * outlet_temp[t-1] + (1 - phi) * outlet_temp[t]

# 3.2 拟合熔炼终点碳含量
rf_model.fit(X, carbon_content_initial)
carbon_content = rf_model.predict(X)
carbon_content = np.clip(carbon_content, 0, 0.05)
for t in range(1, num_samples):
    carbon_content[t] = phi * carbon_content[t-1] + (1 - phi) * carbon_content[t]

# 3.3 拟合废气 SO₂ 浓度（额外考虑 CO 浓度影响）
X_so2 = np.column_stack((inlet_temp, heat_power, co_concentration, thickness))
rf_model.fit(X_so2, so2_concentration_initial)
so2_concentration = rf_model.predict(X_so2)
so2_concentration = np.clip(so2_concentration, 0, None).astype(int)  # 确保非负整数
for t in range(1, num_samples):
    so2_concentration[t] = phi * so2_concentration[t-1] + (1 - phi) * so2_concentration[t]

# 3.4 拟合带钢长度（与厚度相关）
X_length = np.column_stack((thickness, heat_power))
rf_model.fit(X_length, strip_length)
strip_length = rf_model.predict(X_length)
strip_length = np.clip(strip_length, 4000, 6000)
for t in range(1, num_samples):
    strip_length[t] = phi * strip_length[t-1] + (1 - phi) * strip_length[t]

# 4. 白噪声：N(0, 0.03^2)
white_noise = norm.rvs(loc=0, scale=0.03, size=num_samples)

# 5. 计算 α(t)：使用回归模型拟合
# 自变量：入口温度、热功率、出口温度、碳含量
X_alpha = np.column_stack((inlet_temp, heat_power, outlet_temp, carbon_content))
# 初始 α(t)：简单假设为热功率的函数
alpha_t_initial = heat_power / 1200 + white_noise
rf_model.fit(X_alpha, alpha_t_initial)
alpha_t = rf_model.predict(X_alpha)
for t in range(1, num_samples):
    alpha_t[t] = phi * alpha_t[t-1] + (1 - phi) * alpha_t[t]

# 6. 整理数据
simulated_data = {
    "时间 (分钟)": time,
    "熔炼入口温度 (°C)": inlet_temp,
    "熔炼出口温度 (°C)": outlet_temp,
    "熔炼热功率 (kN)": heat_power,
    "熔炼终点碳含量 (%)": carbon_content,
    "简易 CO 浓度 (%)": co_concentration,
    "带钢厚度 (mm)": thickness,
    "带钢长度 (mm)": strip_length,
    "废气 SO₂ 浓度 (mg/m³)": so2_concentration,
    "α(t)": alpha_t
}

if __name__ == "__main__":
    # 如果需要保存数据，可以使用 pandas 转换为 DataFrame 并保存为 CSV
    df = pd.DataFrame(simulated_data)
    df.to_csv("simulated_process_data.csv", index=False)
    print("数据已保存到 simulated_process_data.csv")

    # 打印前 5 个数据点以验证
    print(df.head())

    #看这段代码，现在是模拟1000分钟的数据。我需要你帮我修改成每分钟返回一条数据，并且数据是根据过去200分钟的数据生成的