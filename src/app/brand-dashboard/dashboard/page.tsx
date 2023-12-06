import Dashboard from '@/Component/BrandDashboard/Dashboard'
import TabLayout from '@/Component/BrandDashboard'
import React from 'react'

function DashboardPage() {
  return (
    <div>
        <TabLayout>
            <Dashboard />
        </TabLayout>
    </div>
  )
}

export default DashboardPage