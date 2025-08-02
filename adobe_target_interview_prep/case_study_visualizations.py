"""
Adobe Target Interview Case Study - Visualization Toolkit
Optimizing Checkout Conversion Analysis

This script provides comprehensive visualization tools for:
- Funnel analysis and conversion tracking
- A/B test design and sample size calculations
- Hypothesis prioritization matrices
- Adobe Target multivariate testing scenarios
- Automated reporting dashboards
"""

import pandas as pd
import numpy as np
import plotly.graph_objects as go
import plotly.express as px
from plotly.subplots import make_subplots
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime, timedelta
import streamlit as st
import warnings
warnings.filterwarnings('ignore')

# Set style for better visualizations
plt.style.use('seaborn-v0_8')
sns.set_palette("husl")

class AdobeTargetCaseStudy:
    def __init__(self):
        self.data = self._generate_sample_data()
        
    def _generate_sample_data(self):
        """Generate realistic sample data for the case study"""
        np.random.seed(42)
        
        # Generate 60 days of data (2 months)
        dates = pd.date_range(start='2024-01-01', end='2024-03-01', freq='D')
        
        # Baseline conversion rates
        baseline_conversion = 0.56  # 56% baseline
        current_conversion = 0.44   # 44% current (12% drop)
        
        # Generate daily conversion rates with some variation
        conversion_rates = []
        for i, date in enumerate(dates):
            if i < 30:  # First month - baseline
                rate = np.random.normal(baseline_conversion, 0.02)
            else:  # Second month - dropped
                rate = np.random.normal(current_conversion, 0.02)
            conversion_rates.append(max(0.1, min(0.9, rate)))  # Clamp between 10% and 90%
        
        # Generate funnel data
        data = {
            'date': dates,
            'conversion_rate': conversion_rates,
            'add_to_cart_rate': np.random.normal(0.92, 0.01, len(dates)),
            'cart_to_checkout_rate': np.random.normal(0.70, 0.02, len(dates)),
            'checkout_start_to_complete': conversion_rates,
            'mobile_traffic': np.random.normal(10000, 1000, len(dates)),
            'social_referrals': np.random.normal(2000, 500, len(dates)),
            'desktop_traffic': np.random.normal(8000, 800, len(dates))
        }
        
        return pd.DataFrame(data)
    
    def plot_conversion_trend_analysis(self):
        """Q1: Investigation Steps - Conversion Trend Analysis"""
        fig = make_subplots(
            rows=2, cols=2,
            subplot_titles=('Conversion Rate Trend', 'Funnel Analysis', 
                          'Traffic Sources', 'Mobile vs Desktop'),
            specs=[[{"secondary_y": False}, {"secondary_y": False}],
                   [{"secondary_y": False}, {"secondary_y": False}]]
        )
        
        # Conversion rate trend
        fig.add_trace(
            go.Scatter(x=self.data['date'], y=self.data['conversion_rate'],
                      mode='lines+markers', name='Checkout Conversion',
                      line=dict(color='red', width=3)),
            row=1, col=1
        )
        
        # Add baseline and current lines
        fig.add_hline(y=0.56, line_dash="dash", line_color="green", 
                     annotation_text="Baseline (56%)", row=1, col=1)
        fig.add_hline(y=0.44, line_dash="dash", line_color="orange", 
                     annotation_text="Current (44%)", row=1, col=1)
        
        # Funnel analysis
        funnel_stages = ['Add to Cart', 'Cart to Checkout', 'Checkout Complete']
        funnel_rates = [0.92, 0.70, 0.44]
        
        fig.add_trace(
            go.Bar(x=funnel_stages, y=funnel_rates,
                  marker_color=['green', 'orange', 'red'],
                  name='Funnel Conversion'),
            row=1, col=2
        )
        
        # Traffic sources
        fig.add_trace(
            go.Scatter(x=self.data['date'], y=self.data['social_referrals'],
                      mode='lines', name='Social Referrals',
                      line=dict(color='purple')),
            row=2, col=1
        )
        
        # Mobile vs Desktop
        fig.add_trace(
            go.Scatter(x=self.data['date'], y=self.data['mobile_traffic'],
                      mode='lines', name='Mobile Traffic',
                      line=dict(color='blue')),
            row=2, col=2
        )
        fig.add_trace(
            go.Scatter(x=self.data['date'], y=self.data['desktop_traffic'],
                      mode='lines', name='Desktop Traffic',
                      line=dict(color='gray')),
            row=2, col=2
        )
        
        fig.update_layout(
            title="Q1: Investigation Dashboard - Conversion Drop Analysis",
            height=800,
            showlegend=True
        )
        
        return fig
    
    def plot_ab_test_design(self):
        """Q2: A/B Test Design Visualization"""
        fig = make_subplots(
            rows=2, cols=2,
            subplot_titles=('Sample Size Calculator', 'Power Analysis', 
                          'Test Duration Planning', 'Success Metrics'),
            specs=[[{"secondary_y": False}, {"secondary_y": False}],
                   [{"secondary_y": False}, {"secondary_y": False}]]
        )
        
        # Sample size calculator
        effect_sizes = np.arange(0.01, 0.21, 0.01)
        sample_sizes = []
        
        for effect in effect_sizes:
            # Simplified sample size calculation
            alpha = 0.05
            power = 0.8
            p1 = 0.44  # current conversion
            p2 = p1 + effect  # new conversion
            
            # Two-proportion z-test sample size
            z_alpha = 1.96  # 95% confidence
            z_beta = 0.84   # 80% power
            
            p_avg = (p1 + p2) / 2
            n = 2 * ((z_alpha + z_beta) ** 2) * p_avg * (1 - p_avg) / (effect ** 2)
            sample_sizes.append(int(n))
        
        fig.add_trace(
            go.Scatter(x=effect_sizes, y=sample_sizes,
                      mode='lines+markers', name='Sample Size',
                      line=dict(color='blue', width=3)),
            row=1, col=1
        )
        
        # Power analysis
        sample_sizes_power = [1000, 2000, 5000, 10000, 20000]
        powers = [0.3, 0.5, 0.7, 0.85, 0.95]
        
        fig.add_trace(
            go.Scatter(x=sample_sizes_power, y=powers,
                      mode='lines+markers', name='Power',
                      line=dict(color='green', width=3)),
            row=1, col=2
        )
        
        # Test duration planning
        daily_traffic = 10000
        test_durations = np.arange(7, 31, 1)
        total_samples = daily_traffic * test_durations
        
        fig.add_trace(
            go.Scatter(x=test_durations, y=total_samples,
                      mode='lines+markers', name='Total Samples',
                      line=dict(color='orange', width=3)),
            row=2, col=1
        )
        
        # Success metrics
        metrics = ['Conversion Rate', 'Revenue per User', 'Time to Complete', 'Error Rate']
        current_values = [0.44, 85, 180, 0.08]
        target_values = [0.56, 95, 150, 0.05]
        
        fig.add_trace(
            go.Bar(x=metrics, y=current_values,
                  name='Current', marker_color='red'),
            row=2, col=2
        )
        fig.add_trace(
            go.Bar(x=metrics, y=target_values,
                  name='Target', marker_color='green'),
            row=2, col=2
        )
        
        fig.update_layout(
            title="Q2: A/B Test Design Framework",
            height=800,
            showlegend=True
        )
        
        return fig
    
    def plot_hypothesis_prioritization(self):
        """Q3: Hypothesis Prioritization Matrix"""
        hypotheses = [
            "Progress Indicator Optimization",
            "Offer Code Validation Fix",
            "Mobile UI Responsiveness",
            "Social Referral Flow",
            "Checkout Form Simplification",
            "Payment Method Optimization"
        ]
        
        # Impact scores (1-10)
        impact_scores = [8, 7, 9, 6, 8, 7]
        
        # Effort scores (1-10, where 10 is highest effort)
        effort_scores = [3, 2, 6, 4, 5, 4]
        
        # Calculate priority scores (Impact / Effort)
        priority_scores = [i/e for i, e in zip(impact_scores, effort_scores)]
        
        fig = go.Figure()
        
        # Create scatter plot
        fig.add_trace(go.Scatter(
            x=effort_scores,
            y=impact_scores,
            mode='markers+text',
            text=hypotheses,
            textposition="top center",
            marker=dict(
                size=priority_scores,
                sizeref=2.*max(priority_scores)/(40.**2),
                sizemin=4,
                color=priority_scores,
                colorscale='Viridis',
                showscale=True,
                colorbar=dict(title="Priority Score")
            ),
            hovertemplate="<b>%{text}</b><br>" +
                         "Impact: %{y}<br>" +
                         "Effort: %{x}<br>" +
                         "Priority: %{marker.size:.2f}<extra></extra>"
        ))
        
        # Add quadrant lines
        fig.add_hline(y=7, line_dash="dash", line_color="gray", 
                     annotation_text="High Impact")
        fig.add_vline(x=5, line_dash="dash", line_color="gray", 
                     annotation_text="High Effort")
        
        # Add quadrant labels
        fig.add_annotation(x=2, y=8.5, text="Quick Wins", showarrow=False, 
                          font=dict(size=14, color="green"))
        fig.add_annotation(x=7, y=8.5, text="Major Projects", showarrow=False, 
                          font=dict(size=14, color="blue"))
        fig.add_annotation(x=2, y=3.5, text="Fill-ins", showarrow=False, 
                          font=dict(size=14, color="orange"))
        fig.add_annotation(x=7, y=3.5, text="Thankless Tasks", showarrow=False, 
                          font=dict(size=14, color="red"))
        
        fig.update_layout(
            title="Q3: Hypothesis Prioritization Matrix (Impact vs Effort)",
            xaxis_title="Effort Required (1-10)",
            yaxis_title="Impact Potential (1-10)",
            height=600
        )
        
        return fig
    
    def plot_multivariate_test_design(self):
        """Q4: Adobe Target Multivariate Test Design"""
        # Define test elements and variations
        elements = {
            'Progress Indicator': ['None', 'Simple', 'Detailed'],
            'Offer Code Field': ['Hidden', 'Optional', 'Required'],
            'Checkout Button': ['Standard', 'Prominent', 'Urgent'],
            'Form Layout': ['Single Column', 'Two Column', 'Progressive']
        }
        
        # Create factorial design visualization
        fig = make_subplots(
            rows=2, cols=2,
            subplot_titles=('Test Elements', 'Variation Combinations', 
                          'Traffic Allocation', 'Expected Results'),
            specs=[[{"secondary_y": False}, {"secondary_y": False}],
                   [{"secondary_y": False}, {"secondary_y": False}]]
        )
        
        # Test elements
        element_names = list(elements.keys())
        variation_counts = [len(vars) for vars in elements.values()]
        
        fig.add_trace(
            go.Bar(x=element_names, y=variation_counts,
                  marker_color='lightblue',
                  name='Variations per Element'),
            row=1, col=1
        )
        
        # Total combinations
        total_combinations = np.prod(variation_counts)
        fig.add_trace(
            go.Indicator(
                mode="number+delta",
                value=total_combinations,
                title={"text": "Total Test Combinations"},
                delta={'reference': 16},
                domain={'x': [0, 1], 'y': [0, 1]}
            ),
            row=1, col=2
        )
        
        # Traffic allocation
        traffic_per_variation = 1000
        total_traffic = total_combinations * traffic_per_variation
        
        fig.add_trace(
            go.Pie(labels=['Test Traffic', 'Control Traffic'],
                  values=[total_traffic, total_traffic * 0.2],
                  name="Traffic Split"),
            row=2, col=1
        )
        
        # Expected results timeline
        test_duration = 21  # days
        daily_conversions = []
        
        for day in range(test_duration):
            if day < 7:  # Ramp-up period
                conv = 0.44 + np.random.normal(0, 0.02)
            else:  # Full test period
                conv = 0.44 + np.random.normal(0.05, 0.03)
            daily_conversions.append(max(0.1, min(0.9, conv)))
        
        fig.add_trace(
            go.Scatter(x=list(range(test_duration)), y=daily_conversions,
                      mode='lines+markers', name='Expected Conversion',
                      line=dict(color='green', width=3)),
            row=2, col=2
        )
        
        fig.update_layout(
            title="Q4: Adobe Target Multivariate Test Design",
            height=800,
            showlegend=True
        )
        
        return fig
    
    def plot_automated_reporting_dashboard(self):
        """Q6: Automated Experiment Reporting Dashboard"""
        fig = make_subplots(
            rows=3, cols=2,
            subplot_titles=('Weekly Conversion Trends', 'A/B Test Performance', 
                          'Traffic Sources', 'Mobile vs Desktop',
                          'Revenue Impact', 'Statistical Significance'),
            specs=[[{"secondary_y": False}, {"secondary_y": False}],
                   [{"secondary_y": False}, {"secondary_y": False}],
                   [{"secondary_y": False}, {"secondary_y": False}]]
        )
        
        # Weekly conversion trends
        weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4']
        control_rates = [0.44, 0.45, 0.43, 0.44]
        test_rates = [0.44, 0.48, 0.52, 0.56]
        
        fig.add_trace(
            go.Scatter(x=weeks, y=control_rates, mode='lines+markers',
                      name='Control', line=dict(color='red')),
            row=1, col=1
        )
        fig.add_trace(
            go.Scatter(x=weeks, y=test_rates, mode='lines+markers',
                      name='Test', line=dict(color='green')),
            row=1, col=1
        )
        
        # A/B test performance
        test_names = ['Progress Indicator', 'Offer Code', 'Button Style', 'Form Layout']
        lift_percentages = [12.5, 8.3, 15.2, 6.7]
        confidence_levels = [95, 87, 98, 82]
        
        fig.add_trace(
            go.Bar(x=test_names, y=lift_percentages,
                  marker_color='lightgreen',
                  name='Lift %'),
            row=1, col=2
        )
        
        # Traffic sources
        sources = ['Direct', 'Organic', 'Social', 'Email', 'Paid']
        traffic_volumes = [4000, 3500, 2000, 1500, 1000]
        
        fig.add_trace(
            go.Pie(labels=sources, values=traffic_volumes,
                  name="Traffic Sources"),
            row=2, col=1
        )
        
        # Mobile vs Desktop
        device_types = ['Mobile', 'Desktop', 'Tablet']
        conversion_by_device = [0.38, 0.52, 0.45]
        
        fig.add_trace(
            go.Bar(x=device_types, y=conversion_by_device,
                  marker_color=['blue', 'green', 'orange'],
                  name='Conversion by Device'),
            row=2, col=2
        )
        
        # Revenue impact
        revenue_control = [85000, 87000, 84000, 86000]
        revenue_test = [85000, 92000, 98000, 105000]
        
        fig.add_trace(
            go.Scatter(x=weeks, y=revenue_control, mode='lines+markers',
                      name='Control Revenue', line=dict(color='red')),
            row=3, col=1
        )
        fig.add_trace(
            go.Scatter(x=weeks, y=revenue_test, mode='lines+markers',
                      name='Test Revenue', line=dict(color='green')),
            row=3, col=1
        )
        
        # Statistical significance
        p_values = [0.45, 0.12, 0.03, 0.01]
        significant = [False, False, True, True]
        
        colors = ['red' if not sig else 'green' for sig in significant]
        
        fig.add_trace(
            go.Bar(x=test_names, y=p_values,
                  marker_color=colors,
                  name='P-Values'),
            row=3, col=2
        )
        fig.add_hline(y=0.05, line_dash="dash", line_color="gray", 
                     annotation_text="Significance Threshold (0.05)", row=3, col=2)
        
        fig.update_layout(
            title="Q6: Automated Weekly Experiment Reporting Dashboard",
            height=1000,
            showlegend=True
        )
        
        return fig
    
    def create_streamlit_app(self):
        """Create an interactive Streamlit app for the case study"""
        st.set_page_config(page_title="Adobe Target Case Study", layout="wide")
        
        st.title("🎯 Adobe Target Interview Case Study")
        st.subheader("Optimizing Checkout Conversion - Interactive Analysis")
        
        # Sidebar navigation
        st.sidebar.title("Navigation")
        page = st.sidebar.selectbox(
            "Choose Analysis Section:",
            ["Q1: Investigation Steps", "Q2: A/B Test Design", 
             "Q3: Hypothesis Prioritization", "Q4: Multivariate Testing",
             "Q6: Automated Reporting", "Full Dashboard"]
        )
        
        if page == "Q1: Investigation Steps":
            st.header("Q1: What are your next steps to investigate the drop?")
            st.write("""
            **Investigation Framework:**
            1. **Data Validation** - Verify data accuracy and completeness
            2. **Segmentation Analysis** - Break down by device, traffic source, user type
            3. **Funnel Deep Dive** - Identify specific drop-off points
            4. **Technical Audit** - Check for bugs, performance issues
            5. **User Research** - Session replays, user feedback
            """)
            
            fig = self.plot_conversion_trend_analysis()
            st.plotly_chart(fig, use_container_width=True)
            
        elif page == "Q2: A/B Test Design":
            st.header("Q2: Design an A/B test for the new progress indicator")
            st.write("""
            **Test Design:**
            - **Control**: Current checkout flow
            - **Variation**: Progress indicator + optimized flow
            - **Success Metrics**: Conversion rate, revenue per user, time to complete
            - **Sample Size**: 10,000 users per variation (80% power, 5% significance)
            - **Duration**: 21 days (3 weeks)
            - **Targeting**: Mobile users, new visitors
            """)
            
            fig = self.plot_ab_test_design()
            st.plotly_chart(fig, use_container_width=True)
            
        elif page == "Q3: Hypothesis Prioritization":
            st.header("Q3: Propose 3 hypotheses for optimization")
            st.write("""
            **Top 3 Prioritized Hypotheses:**
            1. **Mobile UI Responsiveness** (High Impact, Medium Effort)
            2. **Progress Indicator Optimization** (High Impact, Low Effort)
            3. **Checkout Form Simplification** (High Impact, Medium Effort)
            """)
            
            fig = self.plot_hypothesis_prioritization()
            st.plotly_chart(fig, use_container_width=True)
            
        elif page == "Q4: Multivariate Testing":
            st.header("Q4: Adobe Target Multivariate Test Design")
            st.write("""
            **Multivariate Test Setup:**
            - **Elements**: Progress indicator, offer code field, checkout button, form layout
            - **Variations**: 3-4 per element = 81 total combinations
            - **Traffic**: 20% to control, 80% distributed across test variations
            - **Duration**: 4-6 weeks for statistical significance
            """)
            
            fig = self.plot_multivariate_test_design()
            st.plotly_chart(fig, use_container_width=True)
            
        elif page == "Q6: Automated Reporting":
            st.header("Q6: Automated Experiment Reporting")
            st.write("""
            **Automation Strategy:**
            - **Daily**: Data collection and validation
            - **Weekly**: Performance reports and statistical analysis
            - **Monthly**: Executive summaries and ROI calculations
            - **Tools**: Adobe Analytics API + Python automation
            """)
            
            fig = self.plot_automated_reporting_dashboard()
            st.plotly_chart(fig, use_container_width=True)
            
        else:  # Full Dashboard
            st.header("Complete Case Study Dashboard")
            
            col1, col2 = st.columns(2)
            
            with col1:
                st.subheader("Conversion Trend Analysis")
                fig1 = self.plot_conversion_trend_analysis()
                st.plotly_chart(fig1, use_container_width=True)
                
            with col2:
                st.subheader("A/B Test Design")
                fig2 = self.plot_ab_test_design()
                st.plotly_chart(fig2, use_container_width=True)
            
            st.subheader("Hypothesis Prioritization")
            fig3 = self.plot_hypothesis_prioritization()
            st.plotly_chart(fig3, use_container_width=True)
            
            col3, col4 = st.columns(2)
            
            with col3:
                st.subheader("Multivariate Test Design")
                fig4 = self.plot_multivariate_test_design()
                st.plotly_chart(fig4, use_container_width=True)
                
            with col4:
                st.subheader("Automated Reporting")
                fig5 = self.plot_automated_reporting_dashboard()
                st.plotly_chart(fig5, use_container_width=True)

def main():
    """Main function to run the case study analysis"""
    case_study = AdobeTargetCaseStudy()
    
    print("🎯 Adobe Target Interview Case Study - Visualization Toolkit")
    print("=" * 60)
    print("\nAvailable visualizations:")
    print("1. Conversion Trend Analysis (Q1)")
    print("2. A/B Test Design (Q2)")
    print("3. Hypothesis Prioritization (Q3)")
    print("4. Multivariate Test Design (Q4)")
    print("5. Automated Reporting Dashboard (Q6)")
    print("6. Interactive Streamlit App")
    
    choice = input("\nEnter your choice (1-6) or 'all' to generate all: ")
    
    if choice == '1':
        fig = case_study.plot_conversion_trend_analysis()
        fig.show()
    elif choice == '2':
        fig = case_study.plot_ab_test_design()
        fig.show()
    elif choice == '3':
        fig = case_study.plot_hypothesis_prioritization()
        fig.show()
    elif choice == '4':
        fig = case_study.plot_multivariate_test_design()
        fig.show()
    elif choice == '5':
        fig = case_study.plot_automated_reporting_dashboard()
        fig.show()
    elif choice == '6':
        print("\nStarting Streamlit app...")
        print("Run: streamlit run case_study_visualizations.py")
    elif choice == 'all':
        print("\nGenerating all visualizations...")
        figs = [
            case_study.plot_conversion_trend_analysis(),
            case_study.plot_ab_test_design(),
            case_study.plot_hypothesis_prioritization(),
            case_study.plot_multivariate_test_design(),
            case_study.plot_automated_reporting_dashboard()
        ]
        for i, fig in enumerate(figs, 1):
            print(f"Showing visualization {i}...")
            fig.show()
    else:
        print("Invalid choice. Please run the script again.")

if __name__ == "__main__":
    main() 