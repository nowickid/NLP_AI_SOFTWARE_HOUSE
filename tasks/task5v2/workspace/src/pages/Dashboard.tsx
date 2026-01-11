import MainLayout from '@/components/layout/MainLayout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const Dashboard = () => {
  return (
    <MainLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <Card>
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
            <CardDescription>This is a placeholder dashboard page.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>The shadcn/ui components are working correctly.</p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
