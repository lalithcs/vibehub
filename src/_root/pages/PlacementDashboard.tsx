// src/components/PlacementStatisticsDashboard.tsx
import React from 'react';
import PlacementStatisticsChart from '@/components/forms/PlacementStatisticsChart';

const totalStudentsData = [
  { year: "2020", value: 950 },
  { year: "2021", value: 1000 },
  { year: "2022", value: 1050 },
  { year: "2023", value: 1100 },
];

const placedStudentsData = [
  { year: "2020", value: 700 },
  { year: "2021", value: 750 },
  { year: "2022", value: 800 },
  { year: "2023", value: 850 },
];

const highestPackageData = [
  { year: "2020", value: 9000000 },
  { year: "2021", value: 9500000 },
  { year: "2022", value: 10000000 },
  { year: "2023", value: 10500000 },
];

const lowestPackageData = [
  { year: "2020", value: 2500000 },
  { year: "2021", value: 2700000 },
  { year: "2022", value: 3000000 },
  { year: "2023", value: 3200000 },
];

const averagePackageData = [
  { year: "2020", value: 4500000 },
  { year: "2021", value: 4700000 },
  { year: "2022", value: 5000000 },
  { year: "2023", value: 5200000 },
];

const companyVisitsData = [
  { year: "2020", value: 80 },
  { year: "2021", value: 90 },
  { year: "2022", value: 100 },
  { year: "2023", value: 110 },
];

const offersMadeData = [
  { year: "2020", value: 900 },
  { year: "2021", value: 950 },
  { year: "2022", value: 1000 },
  { year: "2023", value: 1050 },
];

const PlacementStatisticsDashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-center text-2xl font-bold my-6">Placement Dashboard</h1>
      <div className="grid xl:grid-cols-3 lg:grid-cols-1 gap-6 p-4">
        <PlacementStatisticsChart title="Total Students" data={totalStudentsData} />
        <PlacementStatisticsChart title="Placed Students" data={placedStudentsData} />
        <PlacementStatisticsChart title="Highest Package" data={highestPackageData} />
        <PlacementStatisticsChart title="Lowest Package" data={lowestPackageData} />
        <PlacementStatisticsChart title="Average Package" data={averagePackageData} />
        <PlacementStatisticsChart title="Company Visits" data={companyVisitsData} />
        <PlacementStatisticsChart title="Offers Made" data={offersMadeData} />
      </div>
    </div>
  );
};

export default PlacementStatisticsDashboard;
