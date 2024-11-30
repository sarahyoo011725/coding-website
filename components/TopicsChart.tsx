'use client'

import { useAuth } from '@/app/auth/AuthContext';
import { Topic } from '@/app/types';
import { useState, useEffect } from 'react';
import Chart from 'react-google-charts'

const TopicsChart = () => {
  const { user } = useAuth();
  const [chartData, setChartData] = useState<(string | number)[][]>([
    ["Topic", "Total Used"],
  ]);

  const chart_options = {
    title: "Topics Studied",
  };
  
  useEffect(() => {
    const loadTopics = async() => {
      if (!user) return;
        const res = await (await fetch(`/api/topics?uid=${user.uid}`)).json();
        const topics = res.data as Topic[];
        const newChartData = [["Topic", "Total Used"], ...topics.map(topic => [topic.name, topic.count])];
        setChartData(newChartData);
    }
    loadTopics();
  }, [user]);

  return (
    <Chart
      chartType="PieChart"
      data={chartData}
      options={chart_options}
      width={"100%"}
      height={"400px"}
    />
  )
}

export default TopicsChart