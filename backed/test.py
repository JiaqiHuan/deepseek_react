import pandas as pd
import os

print("当前工作目录:", os.getcwd())
# 读取Parquet文件
parquet_file = 'backed/input.parquet'
df = pd.read_parquet(parquet_file, engine='pyarrow')

# 写入CSV文件
csv_file = 'backed/output.csv'
df.to_csv(csv_file, index=False)

print(f"成功将 {parquet_file} 转换为 {csv_file}")