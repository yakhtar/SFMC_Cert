#!/usr/bin/env python3
"""
Adobe Target Interview Case Study - Quick Demo
This script demonstrates how to use the visualization toolkit for interview preparation.
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from case_study_visualizations import AdobeTargetCaseStudy

def run_demo():
    """Run a quick demo of the visualization tools"""
    print("🎯 Adobe Target Interview Case Study - Quick Demo")
    print("=" * 60)
    
    # Initialize the case study
    case_study = AdobeTargetCaseStudy()
    
    print("\n📊 Generating key visualizations for interview preparation...")
    
    # Generate all key visualizations
    visualizations = {
        "Q1: Investigation Dashboard": case_study.plot_conversion_trend_analysis(),
        "Q2: A/B Test Design": case_study.plot_ab_test_design(),
        "Q3: Hypothesis Prioritization": case_study.plot_hypothesis_prioritization(),
        "Q4: Multivariate Test Design": case_study.plot_multivariate_test_design(),
        "Q6: Automated Reporting": case_study.plot_automated_reporting_dashboard()
    }
    
    print("\n✅ All visualizations generated successfully!")
    print("\n📋 Interview Preparation Summary:")
    print("- Q1: Use conversion trend analysis to show the 12% drop")
    print("- Q2: Use A/B test design to demonstrate sample size calculations")
    print("- Q3: Use hypothesis prioritization matrix for impact vs effort")
    print("- Q4: Use multivariate test design for Adobe Target setup")
    print("- Q6: Use automated reporting dashboard for weekly tracking")
    
    print("\n🚀 Next Steps:")
    print("1. Run 'streamlit run case_study_visualizations.py' for interactive app")
    print("2. Run 'python case_study_visualizations.py' for individual charts")
    print("3. Review the README.md for detailed interview guidance")
    
    # Show one example visualization
    print("\n📈 Example: Conversion Trend Analysis (Q1)")
    fig = case_study.plot_conversion_trend_analysis()
    fig.show()
    
    return visualizations

if __name__ == "__main__":
    run_demo() 