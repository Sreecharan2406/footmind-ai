FootMind AI 

An AI-powered football analytics dashboard built for coaches who want real-time insights, tactical guidance, and structured match reports — all in one place.

🔗 Live Demo: footmind-ai.vercel.app

Overview
FootMind AI gives football coaches a smarter way to analyze performance. Enter your match data, chat with an AI coach for tactical advice, and generate clean match reports instantly. Built with Next.js and designed to be upgraded with real AI as the project grows.

Features
Performance Dashboard
Track passes, accuracy percentages, and turnovers in a clean, coach-friendly interface that updates in real time.
AI Coach (Chat Interface)
Ask questions about your match and get tactical suggestions based on your team's passing accuracy, turnover rate, and patterns of play.
Match Report Generator
Auto-generate structured reports that highlight your team's strengths, weaknesses, and key recommendations after each game.
Data Visualization
Accuracy trends and performance stats rendered as charts so you can spot patterns at a glance.
Coach Login System
Personalized dashboard with your name and profile loaded dynamically on sign-in.
Persistent Data
Reports are saved locally so nothing is lost between sessions — even after a page refresh.

Tech Stack
LayerTechnologyFrameworkNext.js 14 (App Router)UIReact + Tailwind CSSIconsLucide ReactChartsRechartsAICustom API routes (OpenAI-ready)DeploymentVercel

Getting Started
bash# Clone the repository
git clone https://github.com/Sreecharan2406/footmind-ai.git
cd footmind-ai

# Install dependencies
npm install

# Run the development server
npm run dev
Open http://localhost:3000 to view it in the browser.

Project Structure
footmind-ai/
├── app/          # Next.js App Router pages & API routes
├── components/   # Reusable UI components
├── hooks/        # Custom React hooks
├── lib/          # Utility functions
├── public/       # Static assets
└── styles/       # Global styles

Roadmap

 Real AI integration via OpenAI API
 Database backend with Supabase or Firebase
 Multi-user authentication
 Team & match management system
 Advanced analytics — xG, heatmaps, possession stats
 Save and compare multiple match reports


Author
Built by Sreecharan — GitHub


⚠️ Currently uses mock AI logic. Drop in your OpenAI API key in the API routes to go live with real responses.
