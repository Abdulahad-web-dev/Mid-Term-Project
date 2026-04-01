"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Lock, Bell, Shield, Smartphone, Globe, Mail } from "lucide-react";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl space-y-12">
        <div>
          <h1 className="text-3xl font-bold mb-2">Account <span className="text-primary">Settings</span></h1>
          <p className="text-muted-foreground">Manage your personal information, security, and notification preferences.</p>
        </div>

        <section className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <User className="w-5 h-5 text-primary" /> Profile Information
          </h2>
          <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] space-y-6">
            <div className="flex items-center gap-6 mb-8 border-b border-white/10 pb-8">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-4xl font-bold text-white shadow-xl shadow-primary/20">
                A
              </div>
              <div className="space-y-3">
                <h3 className="font-bold">Profile Picture</h3>
                <div className="flex gap-3">
                  <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">Upload New</Button>
                  <Button size="sm" variant="outline" className="border-white/10 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-colors">Remove</Button>
                </div>
                <p className="text-xs text-muted-foreground">Supported formats: JPG, PNG, GIF. Max size 5MB.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Full Name</label>
                <Input defaultValue="Abdul Ahad Warraich" className="bg-white/5 border-white/10" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Email Address</label>
                <Input defaultValue="abdulahadwarraich.web@gmail.com" disabled className="bg-white/5 border-white/10 cursor-not-allowed opacity-50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Phone Number</label>
                <Input defaultValue="+92 300 1234567" className="bg-white/5 border-white/10" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">City</label>
                <Input defaultValue="Lahore, Pakistan" className="bg-white/5 border-white/10" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Bio</label>
              <textarea 
                className="w-full min-h-[100px] rounded-xl bg-white/5 border border-white/10 p-4 text-sm focus:outline-none focus:border-primary transition-all"
                placeholder="Tell us about yourself or your business..."
              ></textarea>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-white px-8">Save Changes</Button>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary" /> Security & Privacy
          </h2>
          <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] space-y-6">
            <div className="flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-white/[0.01]">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-bold">Two-Factor Authentication</p>
                  <p className="text-xs text-muted-foreground">Add an extra layer of security to your account.</p>
                </div>
              </div>
              <Button variant="outline" className="border-white/10 h-10">Enable</Button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-white/[0.01]">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-blue-500/10">
                  <Lock className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="font-bold">Change Password</p>
                  <p className="text-xs text-muted-foreground">It's a good idea to use a strong password that you don't use elsewhere.</p>
                </div>
              </div>
              <Button variant="outline" className="border-white/10 h-10">Update</Button>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" /> Notification Preferences
          </h2>
          <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] space-y-4">
            {[
              { title: "Ad Status Updates", desc: "Get notified when your ad is approved or rejected.", icon: Globe },
              { title: "New Messages", desc: "Receive alerts when a buyer sends you a message.", icon: Mail },
              { title: "Payment Confirmations", desc: "Get notified as soon as your payment is verified.", icon: Smartphone },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-4">
                  <item.icon className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
                <div className="w-12 h-6 rounded-full bg-primary/20 border border-primary/50 relative">
                  <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-primary shadow-sm" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
