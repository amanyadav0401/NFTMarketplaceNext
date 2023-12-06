'use client'

import { APIClient } from '@/utils/APIClient'
import { useAdminAnalyticsStore, useUserStore } from '@/utils/Zustand'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'

type Props = {}

const AdminLogin = (props: Props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { user, setUser } = useUserStore()
  const { setAdminAnalytics } = useAdminAnalyticsStore()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const data = await APIClient.post('auth/admin-login', {
        json: {
          username,
          password
        }
      })
      const dataJson: any = await data.json()
      if (dataJson.success) {
        localStorage.setItem('token', dataJson.token)
        router.push('/admin/dashboard')
        setAdminAnalytics()
        setUser(dataJson.token)
      }
    }
    catch (err: any) {
      const error = await err?.response?.json()
      toast.error(error?.message || 'Something went wrong')
    }
  }

  return (
    <div className="bg-fixed bg-cover admin-back">
      <div className="h-screen flex justify-center items-center">
        <div className="bg-black p-10 rounded-lg w-96">
          <h1 className="text-white text-2xl mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input value={username} onChange={(e) => setUsername(e.target.value)} autoComplete='new-password' type="text" placeholder="Username" className="w-full p-3 rounded-md bg-white placeholder-gray-500 focus:outline-none focus:ring focus:ring-indigo-200 transition" />
            </div>
            <div className="mb-4">
              <input value={password} onChange={(e) => setPassword(e.target.value)} autoComplete='new-password' type="password" placeholder="Password" className="w-full p-3 rounded-md bg-white placeholder-gray-500 focus:outline-none focus:ring focus:ring-indigo-200 transition" />
            </div>
            <button type="submit" className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200 transition">Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin