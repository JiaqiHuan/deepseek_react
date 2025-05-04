import numpy as np
from scipy.stats import norm, uniform, weibull_min, beta, lognorm, poisson, expon
from sklearn.ensemble import RandomForestRegressor
import json
from collections import deque
import time
from datetime import datetime

conn = psycopg2.connect(
    dbname="postgres@localhost",
    user="postgres",
    password="123456",
    host="localhost",
    port="5432"
)
cursor = conn.cursor()

class RealTimeProcessSimulator:
    def __init__(self, window_size=200):
        self.window_size = window_size
        self.phi = 0.95  # Autoregressive parameter
        self.time_counter = 0
        
        # Initialize historical data storage
        self.history = {
            'inlet_temp': deque(maxlen=window_size),
            'heat_power': deque(maxlen=window_size),
            'co_concentration': deque(maxlen=window_size),
            'thickness': deque(maxlen=window_size),
            'strip_length': deque(maxlen=window_size),
            'outlet_temp': deque(maxlen=window_size),
            'carbon_content': deque(maxlen=window_size),
            'so2_concentration': deque(maxlen=window_size),
            'alpha_t': deque(maxlen=window_size)
        }
        
        # Initialize separate models for each prediction task
        self.outlet_temp_model = RandomForestRegressor(n_estimators=50, random_state=None)
        self.carbon_content_model = RandomForestRegressor(n_estimators=50, random_state=None)
        self.so2_model = RandomForestRegressor(n_estimators=50, random_state=None)
        self.strip_length_model = RandomForestRegressor(n_estimators=50, random_state=None)
        self.alpha_t_model = RandomForestRegressor(n_estimators=50, random_state=None)
        
        # Fill initial history
        self._initialize_history()
    
    def _initialize_history(self):
        """Generate initial data points to fill the history window."""
        for _ in range(self.window_size):
            # Generate base parameters
            if not self.history['inlet_temp']:
                inlet_temp = norm.rvs(loc=1050, scale=10)
                heat_power = weibull_min.rvs(c=2, scale=1200)
                co_concentration = lognorm.rvs(s=0.3, scale=np.exp(2.7))
            else:
                inlet_temp = self.phi * self.history['inlet_temp'][-1] + (1 - self.phi) * 1050 + norm.rvs(loc=0, scale=10)
                heat_power = self.phi * self.history['heat_power'][-1] + (1 - self.phi) * 1200 + norm.rvs(loc=0, scale=50)
                co_concentration = self.phi * self.history['co_concentration'][-1] + (1 - self.phi) * np.exp(2.7) + norm.rvs(loc=0, scale=0.1)
            
            heat_power = np.clip(heat_power, 500, 2000)
            co_concentration = np.clip(co_concentration, 0, None)
            
            # Thickness changes every 100 minutes
            if not self.history['thickness']:
                thickness_choices = [1250, 1500, 1800]
                base_thickness = thickness_choices[0]
            else:
                idx = len(self.history['thickness']) // 100
                thickness_choices = [1250, 1500, 1800]
                base_thickness = thickness_choices[idx % len(thickness_choices)]
            thickness = base_thickness + uniform.rvs(loc=-10, scale=20)
            
            # Generate initial dependent variables
            if not self.history['outlet_temp']:
                outlet_temp = uniform.rvs(loc=845, scale=10)
                carbon_content = beta.rvs(a=3, b=8) * 0.05
                so2_concentration = poisson.rvs(mu=0.3)
                strip_length = 5000 + expon.rvs(scale=1/0.001)
                alpha_t = heat_power / 1200 + norm.rvs(loc=0, scale=0.03)
            else:
                outlet_temp = self.history['outlet_temp'][-1]
                carbon_content = self.history['carbon_content'][-1]
                so2_concentration = self.history['so2_concentration'][-1]
                strip_length = self.history['strip_length'][-1]
                alpha_t = self.history['alpha_t'][-1]
            
            # Store values
            self.history['inlet_temp'].append(inlet_temp)
            self.history['heat_power'].append(heat_power)
            self.history['co_concentration'].append(co_concentration)
            self.history['thickness'].append(thickness)
            self.history['strip_length'].append(strip_length)
            self.history['outlet_temp'].append(outlet_temp)
            self.history['carbon_content'].append(carbon_content)
            self.history['so2_concentration'].append(so2_concentration)
            self.history['alpha_t'].append(alpha_t)
            
            self.time_counter += 1
    
    def _train_models(self):
        """Train models on current history."""
        # Common features for most models
        X_common = np.column_stack((
            list(self.history['inlet_temp']),
            list(self.history['heat_power']),
            list(self.history['co_concentration']),
            list(self.history['thickness'])
        ))
        
        # Train outlet temperature model
        self.outlet_temp_model.fit(X_common, list(self.history['outlet_temp']))
        
        # Train carbon content model
        self.carbon_content_model.fit(X_common, list(self.history['carbon_content']))
        
        # Train SO2 concentration model
        self.so2_model.fit(X_common, list(self.history['so2_concentration']))
        
        # Train strip length model (uses different features)
        X_length = np.column_stack((
            list(self.history['thickness']),
            list(self.history['heat_power'])
        ))
        self.strip_length_model.fit(X_length, list(self.history['strip_length']))
        
        # Train alpha(t) model
        X_alpha = np.column_stack((
            list(self.history['inlet_temp']),
            list(self.history['heat_power']),
            list(self.history['outlet_temp']),
            list(self.history['carbon_content'])
        ))
        self.alpha_t_model.fit(X_alpha, list(self.history['alpha_t']))
    
    def generate_next_data_point(self):
        """Generate and return the next minute's data as JSON."""
        # Train models on current history
        self._train_models()
        
        # Generate new independent variables
        new_inlet_temp = self.phi * self.history['inlet_temp'][-1] + (1 - self.phi) * 1050 + norm.rvs(loc=0, scale=10)
        
        new_heat_power = self.phi * self.history['heat_power'][-1] + (1 - self.phi) * 1200 + norm.rvs(loc=0, scale=50)
        new_heat_power = np.clip(new_heat_power, 500, 2000)
        
        new_co_concentration = self.phi * self.history['co_concentration'][-1] + (1 - self.phi) * np.exp(2.7) + norm.rvs(loc=0, scale=0.1)
        new_co_concentration = np.clip(new_co_concentration, 0, None)
        
        # Thickness changes every 100 minutes
        idx = len(self.history['thickness']) // 100
        thickness_choices = [1250, 1500, 1800]
        base_thickness = thickness_choices[idx % len(thickness_choices)]
        new_thickness = base_thickness + uniform.rvs(loc=-10, scale=20)
        
        # Prepare input for predictions
        X_new_common = np.array([[
            new_inlet_temp,
            new_heat_power,
            new_co_concentration,
            new_thickness
        ]])
        
        # Predict outlet temperature
        new_outlet_temp = self.outlet_temp_model.predict(X_new_common)[0]
        new_outlet_temp = self.phi * self.history['outlet_temp'][-1] + (1 - self.phi) * new_outlet_temp
        new_outlet_temp = np.clip(new_outlet_temp, 845, 855)
        
        # Predict carbon content
        new_carbon_content = self.carbon_content_model.predict(X_new_common)[0]
        new_carbon_content = self.phi * self.history['carbon_content'][-1] + (1 - self.phi) * new_carbon_content
        new_carbon_content = np.clip(new_carbon_content, 0, 0.05)
        
        # Predict SO2 concentration
        new_so2_concentration = self.so2_model.predict(X_new_common)[0]
        new_so2_concentration = self.phi * self.history['so2_concentration'][-1] + (1 - self.phi) * new_so2_concentration
        new_so2_concentration = np.clip(new_so2_concentration, 0, None).astype(int)
        
        # Predict strip length (uses different features)
        X_new_length = np.array([[
            new_thickness,
            new_heat_power
        ]])
        new_strip_length = self.strip_length_model.predict(X_new_length)[0]
        new_strip_length = self.phi * self.history['strip_length'][-1] + (1 - self.phi) * new_strip_length
        new_strip_length = np.clip(new_strip_length, 4000, 6000)
        
        # Predict alpha(t)
        X_new_alpha = np.array([[
            new_inlet_temp,
            new_heat_power,
            new_outlet_temp,
            new_carbon_content
        ]])
        new_alpha_t = self.alpha_t_model.predict(X_new_alpha)[0]
        new_alpha_t = self.phi * self.history['alpha_t'][-1] + (1 - self.phi) * new_alpha_t
        new_alpha_t += norm.rvs(loc=0, scale=0.03)
        
        # Update history
        self.history['inlet_temp'].append(new_inlet_temp)
        self.history['heat_power'].append(new_heat_power)
        self.history['co_concentration'].append(new_co_concentration)
        self.history['thickness'].append(new_thickness)
        self.history['strip_length'].append(new_strip_length)
        self.history['outlet_temp'].append(new_outlet_temp)
        self.history['carbon_content'].append(new_carbon_content)
        self.history['so2_concentration'].append(new_so2_concentration)
        self.history['alpha_t'].append(new_alpha_t)
        
        self.time_counter += 1
        
        # Create JSON output with current timestamp
        current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        json_data = {
            "timestamp": current_time,
            "time_minutes": self.time_counter,
            "inlet_temp_c": round(float(new_inlet_temp), 2),
            "outlet_temp_c": round(float(new_outlet_temp), 2),
            "heat_power_kN": round(float(new_heat_power), 2),
            "carbon_content_percent": round(float(new_carbon_content), 4),
            "co_concentration_percent": round(float(new_co_concentration), 4),
            "strip_thickness_mm": round(float(new_thickness), 2),
            "strip_length_mm": round(float(new_strip_length), 2),
            "so2_concentration_mg_m3": int(new_so2_concentration),
            "alpha_t": round(float(new_alpha_t), 4)
        }

        insert_query = """
            INSERT INTO steel_data (
                timestamp,
                time_minutes,
                inlet_temp_c,
                outlet_temp_c,
                heat_power_kN,
                carbon_content_percent,
                co_concentration_percent,
                strip_thickness_mm,
                strip_length_mm,
                so2_concentration_mg_m3,
                alpha_t
            ) VALUES (%(timestamp)s, %(time_minutes)s, %(inlet_temp_c)s, %(outlet_temp_c)s,
                    %(heat_power_kN)s, %(carbon_content_percent)s, %(co_concentration_percent)s,
                    %(strip_thickness_mm)s, %(strip_length_mm)s, %(so2_concentration_mg_m3)s, %(alpha_t)s)
        """

        cursor.execute(insert_query, json_data)

# 提交事务并关闭
        conn.commit()
        cursor.close()
        conn.close()
        
        return json.dumps(json_data, ensure_ascii=False)

def run_real_time_simulation():
    """Run the simulation in real-time, emitting data every minute."""
    simulator = RealTimeProcessSimulator(window_size=200)
    
    print("Starting real-time process data simulation...")
    print("New data point will be generated every minute")
    print("Press Ctrl+C to stop the simulation\n")
    
    try:
        while True:
            start_time = time.time()
            
            # Generate and print the data point
            json_data = simulator.generate_next_data_point()
            print(json_data)


            
            # Calculate sleep time to ensure exactly 60 seconds between outputs
            processing_time = time.time() - start_time
            sleep_time = max(0, 60 - processing_time)
            time.sleep(sleep_time)
            
    except KeyboardInterrupt:
        print("\nSimulation stopped by user")

if __name__ == "__main__":
    run_real_time_simulation()