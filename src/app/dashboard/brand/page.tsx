import Dashboard from '@/Component/BrandDashboard/Dashboard'
import TabLayout from '@/Component/BrandDashboard'
import React from 'react'
import BrandDashboardHandler from '@/Component/BrandDashboard/Handler'

function DashboardPage() {
  return (
    <div>
      <TabLayout>
        <BrandDashboardHandler />
      </TabLayout>
    </div>
  )
}

export default DashboardPage